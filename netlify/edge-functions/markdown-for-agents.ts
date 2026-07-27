// Netlify Edge Function — Markdown for Agents
// Returns a markdown version of the site when Accept: text/markdown is requested.
// All other requests pass through to the normal React app.

const markdown = `# Gauntlet Group

> Automate the Busywork. Focus on Growth.

Alerts triaged. Passwords reset. Onboarding handled. Your team stops firefighting.

AI Automation for Growing Businesses | Microsoft 365 | Azure | n8n | Peterborough, UK | 48hr Pilot Turnaround

---

## What We Automate

Six proven workflows. One pilot to start.

### AI Alert Triage (Featured)
Alerts triaged and routed before your team sees them. ~3 sec end-to-end.

### IT Helpdesk Automation
Password resets handled without a single ticket. Zero IT involvement.

### Employee Onboarding
New starters ready on day one — accounts, access, welcome email. Accounts in seconds.

### AI Support Assistants
Instant answers from your own docs — 24/7, no extra headcount. Answers in seconds.

### Custom Workflows
If it involves copying data or waiting for a human — we automate it. Any tool, any process.

### WEEE & IT Asset Disposal
Secure, certified, zero-cost IT asset recycling and disposal. Zero-to-landfill.

---

## About Us

We build AI-powered IT automations for growing businesses. Real IT background, practical AI, your stack — not ours.

- **IT-First** — Built by people who run real IT environments.
- **Practical AI** — AI where it improves a workflow — not for hype.
- **Your Stack** — Microsoft 365, Azure, Teams, n8n, Slack, and more.
- **Start Small** — Pilot one workflow. Prove value. Then scale.

---

## Our Process

Low risk. Fast results. Prove value before scaling.

1. **Review** — 20 minutes. We find your highest-impact automation.
2. **Pilot** — One workflow built. Delivered in 48 hours to 2 weeks.
3. **Launch** — Deployed in your environment. Your credentials, your systems.
4. **Scale** — Monitor, refine, then automate the next process.

---

## Pain Points — Is Manual IT Slowing You Down?

We automate the repetitive, high-friction work that frustrates your team.

- **Alert overload** — Critical alerts buried in noise.
- **Manual resets** — IT stuck on repetitive access requests.
- **Fragmented onboarding** — New starter tasks scattered across systems.
- **Repeated questions** — Staff waiting for answers docs already have.
- **Disconnected systems** — Tools that don't talk — manual data entry.
- **Slow escalation** — No clear path from alert to right person.

> "If it's repetitive, rules-based, or involves copying data between systems — it can be automated."

---

## Why Gauntlet Group

Practical automation from people who understand real IT.

- **IT-First Thinking** — Built by people who run real IT environments.
- **Practical AI** — AI where it improves a workflow — not for hype.
- **Works With Your Stack** — Microsoft 365, Azure, Teams, n8n, Slack, and more.
- **Security-Conscious** — Your credentials. Least-privilege access. No secrets in workflows.
- **Start Small, Prove Value** — One pilot. Low risk. Fast results.
- **Sustainable IT** — Full lifecycle — from daily ops to responsible disposal.

---

## A Message from Gauntlet

> "We don't sell AI for the sake of it. We find the one workflow draining your team's time, automate it, and hand you the keys. Everything we build is yours to keep."

— Imran Ishaq, Founder, Gauntlet Group

---

## Book a Free Automation Review

20 minutes. No pitch — just one clear automation recommendation.

- **20 minutes** — Focused, not a sales pitch.
- **Same-week** — Booked within 3-5 days.
- **Actionable** — Leave with one recommendation.

Book directly: https://calendly.com/imran-ishaq-gauntlet-group/30min

---

## FAQ

**Do I need to replace my existing tools?**
No. We connect what you already have — Microsoft 365, Teams, Azure, Slack, and more. Nothing gets ripped out.

**Who holds our credentials?**
You do. Every automation uses your own Azure app registrations and API keys with least-privilege access. Nothing is stored in our systems.

**How fast can you deliver?**
Most pilots ship in 48 hours to 2 weeks. We start with one workflow, prove the value, then scale.

**What if I'm not sure what to automate?**
That's what the free review is for. We'll identify your highest-impact starting point — no commitment required.

**Do you only work with Peterborough businesses?**
No — we work remotely with businesses across the UK.

**What happens after the pilot?**
You own the workflow, documentation, and everything else. Retainer packages are available if you want ongoing support.

**How much does it cost?**
The initial review is free. After that, you get a clear fixed-price quote before any work begins. No surprises.

---

## Contact

- **Email:** imran.ishaq@gauntlet-group.com
- **Phone:** +44 7800 721443
- **Office:** Peterborough, UK
- **LinkedIn:** https://www.linkedin.com/company/gauntlet-group
- **Compliance:** ISO 27701 Certified

Ready to automate? We'll respond within one working day.
`;

export default async (request: Request, context: { next: () => Promise<Response> }) => {
  const accept = request.headers.get('Accept') || '';
  if (accept.includes('text/markdown')) {
    return new Response(markdown, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Vary': 'Accept',
      },
    });
  }
  return context.next();
};
