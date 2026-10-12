---
name: Contact lead routing
description: User-required CRM destination and the reason contact submissions must not inherit the authentication sandbox.
---

Contact submissions should create BreatheCode FormEntry leads with location `learnpack` and tag `contact-us`, rather than use an email provider.

**Why:** The user explicitly requested this routing. The authentication configuration targets a test API, while the live API's location alias resolves to the LearnPack academy; the test API has no LearnPack alias.

**How to apply:** Keep contact lead delivery independent of authentication sandbox settings. Do not switch contact submissions to a test API or email service without the user's request.
