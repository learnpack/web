import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Check, CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type ContactFields = {
  first_name: string;
  last_name: string;
  email: string;
  client_comments: string;
  website: string;
};

type ContactField = keyof ContactFields;

const initialFields: ContactFields = {
  first_name: "",
  last_name: "",
  email: "",
  client_comments: "",
  website: "",
};

const copy = {
  en: {
    title: "Let’s make learning click.",
    description:
      "Tell us what your team is working on. We’ll help you find a practical way to turn what you know into training people remember.",
    eyebrow: "Talk with LearnPack",
    response: "A real person, on the other side",
    responseDetail: "Share a little context and our team will take it from there.",
    formTitle: "Start a conversation",
    formDescription: "A few details are all we need to get started.",
    firstName: "First name",
    lastName: "Last name",
    email: "Work email",
    comments: "What would you like to talk about?",
    commentsHint: "A project, a challenge, or just an early idea...",
    required: "Required",
    send: "Send your message",
    sending: "Sending your message…",
    privacy: "We’ll use your contact details to respond to your message.",
    genericError: "We couldn’t send your message just now. Please try again.",
    successTitle: "Thanks for reaching out.",
    successText: "Your message is with our team. We’ll be in touch soon.",
    sendAnother: "Send another message",
    charCount: (count: number) => `${count} / 1000`,
    emailInvalid: "Enter a valid email address.",
    submitError: "There was a problem with your message. Please check the details below.",
  },
  es: {
    title: "Hagamos que aprender conecte.",
    description:
      "Cuéntanos en qué está trabajando tu equipo. Te ayudaremos a convertir lo que saben en una formación que deje huella.",
    eyebrow: "Habla con LearnPack",
    response: "Una persona real, al otro lado",
    responseDetail: "Comparte un poco de contexto y nuestro equipo se encargará del resto.",
    formTitle: "Empecemos a conversar",
    formDescription: "Con unos pocos datos es suficiente para empezar.",
    firstName: "Nombre",
    lastName: "Apellido",
    email: "Correo de trabajo",
    comments: "¿Sobre qué te gustaría hablar?",
    commentsHint: "Un proyecto, un reto o simplemente una primera idea...",
    required: "Obligatorio",
    send: "Enviar mensaje",
    sending: "Enviando tu mensaje…",
    privacy: "Usaremos tus datos de contacto para responder a tu mensaje.",
    genericError: "No hemos podido enviar tu mensaje. Inténtalo de nuevo.",
    successTitle: "Gracias por escribirnos.",
    successText: "Nuestro equipo ya tiene tu mensaje. Nos pondremos en contacto pronto.",
    sendAnother: "Enviar otro mensaje",
    charCount: (count: number) => `${count} / 1000`,
    emailInvalid: "Escribe una dirección de correo válida.",
    submitError: "Ha habido un problema con tu mensaje. Revisa los datos indicados.",
  },
};

export default function Contact() {
  const { i18n } = useTranslation();
  const language = i18n.language?.toLowerCase().startsWith("es") ? "es" : "en";
  const t = copy[language];
  const [fields, setFields] = useState<ContactFields>(initialFields);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<ContactField, string>>>({});
  const [formError, setFormError] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const updateField = (field: ContactField, value: string) => {
    setFields((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => ({ ...current, [field]: undefined }));
    setFormError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setFormError("");
    setFieldErrors({});
    setServerMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          language,
          utm_url: window.location.href,
        }),
      });

      let result: { message?: string; errors?: Record<string, string> } = {};
      try {
        result = await response.json();
      } catch {
        // The endpoint may return an empty body; the HTTP status remains authoritative.
      }

      if (!response.ok) {
        const nextErrors: Partial<Record<ContactField, string>> = {};
        const knownFields: ContactField[] = [
          "first_name",
          "last_name",
          "email",
          "client_comments",
          "website",
        ];
        knownFields.forEach((field) => {
          const message = result.errors?.[field];
          if (message) nextErrors[field] = message;
        });
        setFieldErrors(nextErrors);
        setFormError(
          result.message ||
            (Object.keys(nextErrors).length ? t.submitError : t.genericError),
        );
        return;
      }

      setServerMessage(result.message || t.successText);
      setSent(true);
    } catch {
      setFormError(t.genericError);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFields(initialFields);
    setFieldErrors({});
    setFormError("");
    setServerMessage("");
    setSent(false);
  };

  const inputClass =
    "block w-full rounded-xl border border-white/10 bg-slate-950/55 px-4 py-3 text-[15px] text-slate-100 placeholder:text-slate-500 shadow-sm outline-none transition duration-200 hover:border-white/20 focus:border-sky-400/70 focus:ring-4 focus:ring-sky-400/10";

  return (
    <>
      <Helmet>
        <title>{language === "es" ? "Contacto - LearnPack" : "Contact Us - LearnPack"}</title>
        <meta
          name="description"
          content={
            language === "es"
              ? "Ponte en contacto con el equipo de LearnPack."
              : "Get in touch with the LearnPack team."
          }
        />
      </Helmet>

      <Header />
      <main className="page-background relative isolate min-h-[calc(100dvh-4rem)] overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:flex lg:items-center lg:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-48 -z-10 h-[34rem] w-[34rem] rounded-full bg-sky-500/[0.07] blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-56 -left-32 -z-10 h-[30rem] w-[30rem] rounded-full bg-blue-400/[0.06] blur-3xl"
        />

        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20">
          <section className="max-w-xl lg:pb-8">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-sky-300/15 bg-sky-300/[0.06] px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-sky-200">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-300 shadow-[0_0_12px_rgba(125,211,252,0.55)]" />
              {t.eyebrow}
            </div>
            <h1
              className="max-w-lg text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-slate-50 sm:text-5xl lg:text-[3.65rem]"
              data-testid="heading-contact"
            >
              {t.title}
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-slate-300/80 sm:text-lg sm:leading-8">
              {t.description}
            </p>

            <div className="mt-10 flex max-w-md items-start gap-4 border-t border-white/10 pt-6">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-sky-300/15 bg-sky-300/[0.07] text-sky-200">
                <Check className="h-4 w-4" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-100">{t.response}</p>
                <p className="mt-1.5 text-sm leading-6 text-slate-400">{t.responseDetail}</p>
              </div>
            </div>
          </section>

          <section
            aria-labelledby="contact-form-title"
            className="relative rounded-2xl border border-white/[0.09] bg-slate-900/75 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-8 lg:p-9"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/40 to-transparent"
            />
            {sent ? (
              <div
                className="flex min-h-[390px] flex-col items-start justify-center py-8 motion-safe:animate-[fadeInUp_400ms_ease-out]"
                role="status"
                aria-live="polite"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.08] text-emerald-200">
                  <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                </div>
                <h2 id="contact-form-title" className="text-2xl font-semibold tracking-tight text-slate-50">
                  {t.successTitle}
                </h2>
                <p className="mt-3 max-w-md text-sm leading-6 text-slate-300/80">
                  {serverMessage}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  className="mt-8 h-11 rounded-xl border-white/15 px-4 text-slate-100 transition-colors hover:border-sky-300/40 hover:bg-sky-300/[0.06]"
                >
                  {t.sendAnother}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-7">
                  <h2
                    id="contact-form-title"
                    className="text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl"
                  >
                    {t.formTitle}
                  </h2>
                  <p className="mt-2 text-sm text-slate-400">{t.formDescription}</p>
                </div>

                {formError && (
                  <div
                    className="mb-5 rounded-xl border border-rose-300/20 bg-rose-300/[0.07] px-4 py-3 text-sm leading-5 text-rose-100"
                    role="alert"
                  >
                    {formError}
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate={false}>
                  <div
                    aria-hidden="true"
                    className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
                  >
                    <label htmlFor="contact-website">Website</label>
                    <input
                      id="contact-website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={fields.website}
                      onChange={(event) => updateField("website", event.target.value)}
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-first-name"
                        className="mb-2 block text-sm font-medium text-slate-200"
                      >
                        {t.firstName} <span className="text-sky-300">*</span>
                      </label>
                      <input
                        id="contact-first-name"
                        name="first_name"
                        type="text"
                        autoComplete="given-name"
                        required
                        maxLength={150}
                        value={fields.first_name}
                        onChange={(event) => updateField("first_name", event.target.value)}
                      onInvalid={(event) => {
                        setFieldErrors((current) => ({
                          ...current,
                          first_name: event.currentTarget.validity.valueMissing
                            ? t.required
                            : event.currentTarget.validationMessage,
                        }));
                      }}
                        aria-invalid={Boolean(fieldErrors.first_name)}
                        aria-describedby={fieldErrors.first_name ? "first-name-error" : undefined}
                        className={`${inputClass} ${fieldErrors.first_name ? "border-rose-300/70 focus:border-rose-300 focus:ring-rose-300/10" : ""}`}
                      />
                      {fieldErrors.first_name && (
                        <p id="first-name-error" className="mt-1.5 text-sm text-rose-200" role="alert">
                          {fieldErrors.first_name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="contact-last-name"
                        className="mb-2 block text-sm font-medium text-slate-200"
                      >
                        {t.lastName} <span className="text-sky-300">*</span>
                      </label>
                      <input
                        id="contact-last-name"
                        name="last_name"
                        type="text"
                        autoComplete="family-name"
                        required
                        maxLength={150}
                        value={fields.last_name}
                        onChange={(event) => updateField("last_name", event.target.value)}
                      onInvalid={(event) => {
                        setFieldErrors((current) => ({
                          ...current,
                          last_name: event.currentTarget.validity.valueMissing
                            ? t.required
                            : event.currentTarget.validationMessage,
                        }));
                      }}
                        aria-invalid={Boolean(fieldErrors.last_name)}
                        aria-describedby={fieldErrors.last_name ? "last-name-error" : undefined}
                        className={`${inputClass} ${fieldErrors.last_name ? "border-rose-300/70 focus:border-rose-300 focus:ring-rose-300/10" : ""}`}
                      />
                      {fieldErrors.last_name && (
                        <p id="last-name-error" className="mt-1.5 text-sm text-rose-200" role="alert">
                          {fieldErrors.last_name}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-5">
                    <label
                      htmlFor="contact-email"
                      className="mb-2 block text-sm font-medium text-slate-200"
                    >
                      {t.email} <span className="text-sky-300">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      maxLength={150}
                      value={fields.email}
                      onChange={(event) => updateField("email", event.target.value)}
                      onInvalid={(event) => {
                        setFieldErrors((current) => ({
                          ...current,
                          email: event.currentTarget.validity.valueMissing
                            ? t.required
                            : event.currentTarget.validity.typeMismatch
                              ? t.emailInvalid
                              : event.currentTarget.validationMessage,
                        }));
                      }}
                      aria-invalid={Boolean(fieldErrors.email)}
                      aria-describedby={fieldErrors.email ? "email-error" : undefined}
                      className={`${inputClass} ${fieldErrors.email ? "border-rose-300/70 focus:border-rose-300 focus:ring-rose-300/10" : ""}`}
                    />
                    {fieldErrors.email && (
                      <p id="email-error" className="mt-1.5 text-sm text-rose-200" role="alert">
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>

                  <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <label
                        htmlFor="contact-comments"
                        className="block text-sm font-medium text-slate-200"
                      >
                        {t.comments} <span className="text-sky-300">*</span>
                      </label>
                      <span className="text-xs tabular-nums text-slate-500" aria-live="polite">
                        {t.charCount(fields.client_comments.length)}
                      </span>
                    </div>
                    <textarea
                      id="contact-comments"
                      name="client_comments"
                      required
                      maxLength={1000}
                      rows={4}
                      placeholder={t.commentsHint}
                      value={fields.client_comments}
                      onChange={(event) => updateField("client_comments", event.target.value)}
                      onInvalid={(event) => {
                        setFieldErrors((current) => ({
                          ...current,
                          client_comments: event.currentTarget.validity.valueMissing
                            ? t.required
                            : event.currentTarget.validationMessage,
                        }));
                      }}
                      aria-invalid={Boolean(fieldErrors.client_comments)}
                      aria-describedby={
                        fieldErrors.client_comments ? "comments-error" : undefined
                      }
                      className={`${inputClass} min-h-32 resize-y leading-6 ${fieldErrors.client_comments ? "border-rose-300/70 focus:border-rose-300 focus:ring-rose-300/10" : ""}`}
                    />
                    {fieldErrors.client_comments && (
                      <p id="comments-error" className="mt-1.5 text-sm text-rose-200" role="alert">
                        {fieldErrors.client_comments}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="group h-12 w-full rounded-xl bg-sky-400 px-5 font-semibold text-slate-950 shadow-[0_8px_24px_rgba(56,189,248,0.13)] transition duration-200 hover:-translate-y-0.5 hover:bg-sky-300 disabled:translate-y-0 disabled:opacity-70 sm:w-auto"
                    >
                      {submitting ? (
                        <>
                          <span
                            aria-hidden="true"
                            className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950"
                          />
                          {t.sending}
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                          {t.send}
                        </>
                      )}
                    </Button>
                    <p className="max-w-xs text-xs leading-5 text-slate-500">{t.privacy}</p>
                  </div>
                </form>
              </>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
