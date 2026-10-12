import { Router } from "express";
import { z } from "zod";

const contactSchema = z.object({
  first_name: z.string().trim().min(1).max(150),
  last_name: z.string().trim().min(1).max(150),
  email: z.string().trim().email().max(150),
  client_comments: z.string().trim().min(1).max(1000),
  language: z.enum(["en", "es"]).default("en"),
  website: z.string().max(500).optional().default(""),
  utm_url: z.string().url().max(2000).refine(
    (value) => ["http:", "https:"].includes(new URL(value).protocol),
  ).optional(),
});

const messages = {
  en: {
    success: "Your message has been received. Our team will be in touch.",
    invalid: "Please check the form fields and try again.",
    required: "This field is required and must be within the allowed length.",
    email: "Please enter a valid email address.",
    limited: "Too many messages. Please wait 15 minutes before trying again.",
    unavailable: "We couldn't send your message right now. Please try again later.",
  },
  es: {
    success: "Hemos recibido tu mensaje. Nuestro equipo se pondrá en contacto contigo.",
    invalid: "Revisa los campos del formulario e inténtalo de nuevo.",
    required: "Este campo es obligatorio y debe respetar la longitud permitida.",
    email: "Escribe una dirección de correo válida.",
    limited: "Demasiados mensajes. Espera 15 minutos antes de intentarlo de nuevo.",
    unavailable: "No hemos podido enviar tu mensaje. Inténtalo de nuevo más tarde.",
  },
};

// Injectable transport lets tests verify delivery without creating real CRM leads.
export function createContactRouter(
  transport: typeof fetch = fetch,
  // Auth may target a sandbox with no LearnPack academy. Contact leads go live.
  apiBase = "https://breathecode.herokuapp.com",
) {
  const router = Router();
  const attempts = new Map<string, { count: number; expires: number }>();
  const windowMs = 15 * 60 * 1000;

  router.post("/", async (req, res) => {
    res.setHeader("Cache-Control", "no-store");
    const language = req.body?.language === "es" ? "es" : "en";
    const text = messages[language];

    if (!req.is("application/json") || req.get("Sec-Fetch-Site") === "cross-site") {
      return res.status(403).json({ message: text.invalid });
    }

    const now = Date.now();
    attempts.forEach((value, key) => {
      if (value.expires <= now) attempts.delete(key);
    });
    const key = req.ip || req.socket.remoteAddress || "unknown";
    const current = attempts.get(key) || { count: 0, expires: now + windowMs };
    if (current.count >= 5) {
      res.setHeader("Retry-After", Math.ceil((current.expires - now) / 1000));
      return res.status(429).json({ message: text.limited });
    }
    if (attempts.size >= 10000 && !attempts.has(key)) {
      return res.status(503).json({ message: text.unavailable });
    }
    current.count += 1;
    attempts.set(key, current);

    // Discard automated submissions without forwarding anything to BreatheCode.
    if (typeof req.body?.website === "string" && req.body.website.trim()) {
      return res.status(200).json({ message: text.success });
    }

    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
      const errors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const field = String(issue.path[0]);
        errors[field] = field === "email" ? text.email : text.required;
      }
      return res.status(400).json({ message: text.invalid, errors });
    }

    const { website: _website, ...fields } = parsed.data;
    try {
      const response = await transport(`${apiBase.replace(/\/+$/, "")}/v1/marketing/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...fields,
          // Routing cannot be changed by browser-supplied fields.
          location: "learnpack",
          tags: "contact-us",
        }),
        signal: AbortSignal.timeout(12000),
      });

      // Never return the upstream body: it may contain private CRM information.
      if (response.status !== 201) {
        console.warn(`[Contact] BreatheCode rejected submission (HTTP ${response.status})`);
        return res.status(502).json({ message: text.unavailable });
      }
      const lead = await response.json();
      if (!Number.isInteger(lead?.id) || lead.id <= 0) {
        console.warn("[Contact] BreatheCode did not confirm a saved lead");
        return res.status(502).json({ message: text.unavailable });
      }
      return res.status(201).json({ message: text.success });
    } catch {
      console.warn("[Contact] BreatheCode request failed or timed out");
      return res.status(502).json({ message: text.unavailable });
    }
  });

  return router;
}
