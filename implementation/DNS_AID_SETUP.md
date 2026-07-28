# DNS for AI Discovery (DNS-AID) Setup Guide

This guide walks you through publishing DNS-AID records and enabling DNSSEC for `gauntlet-group.com` so AI agents can discover your agent endpoints via DNS.

> **Why this can't be done from the codebase:** DNS-AID requires publishing `SVCB` DNS records and signing the zone with DNSSEC. Both are infrastructure-level changes made in your DNS provider's dashboard — they cannot be added as project files.

---

## Background

- **Skill reference:** https://isitagentready.com/.well-known/agent-skills/dns-aid/SKILL.md
- **Spec:** https://datatracker.ietf.org/doc/draft-mozleywilliams-dnsop-dnsaid/
- **SVCB/HTTPS records:** https://www.rfc-editor.org/rfc/rfc9460

The scanner validates DNS-AID via DNS-over-HTTPS (Cloudflare → Google fallback). It looks for `SVCB` or `HTTPS` records under the `_agents` namespace and checks that DNSSEC is enabled (the `AD` flag is set on responses).

---

## Step 1 — Add DNS-AID SVCB Records

Your domain (`gauntlet-group.com`) currently uses **Netlify DNS** (nameservers `dns1–4.p02.nsone.net`).

### Record 1: Index endpoint

| Field | Value |
| --- | --- |
| **Type** | `SVCB` |
| **Name / Host** | `_index._agents` |
| **Priority** | `1` |
| **Target** | `gauntlet-group.com.` |
| **Params** | `alpn="https" port=443 mandatory=alpn,port` |
| **TTL** | `3600` |

Equivalent zone file line:

```dns
_index._agents.gauntlet-group.com. 3600 IN SVCB 1 gauntlet-group.com. alpn="https" port=443 mandatory=alpn,port
```

### Record 2: A2A endpoint

| Field | Value |
| --- | --- |
| **Type** | `SVCB` |
| **Name / Host** | `_a2a._agents` |
| **Priority** | `1` |
| **Target** | `gauntlet-group.com.` |
| **Params** | `alpn="a2a" port=443 mandatory=alpn,port` |
| **TTL** | `3600` |

Equivalent zone file line:

```dns
_a2a._agents.gauntlet-group.com. 3600 IN SVCB 1 gauntlet-group.com. alpn="a2a" port=443 mandatory=alpn,port
```

### How to add in Netlify DNS

1. Log in to **Netlify** → open the site → **Domain settings** → **DNS settings**.
2. Click **Add new record**.
3. If the UI offers a record-type dropdown, look for **SVCB**.
   - If **SVCB is available**: enter the values above directly.
   - If **SVCB is NOT available** (Netlify's managed DNS UI historically only supports A, AAAA, CNAME, MX, TXT, CAA, NS, SRV): see **Fallback** below.
4. Repeat for the second record.
5. Save.

### Fallback if SVCB is not supported in the UI

If Netlify DNS does not expose a `SVCB` record type, you have two options:

**Option A — Switch to a DNS provider that supports SVCB.**
Providers known to support SVCB/HTTPS records include:
- **Cloudflare** (free plan supports SVCB/HTTPS; DNSSEC is one-click)
- **DNSimple**
- **NS1 / IBM NS1 Connect** (you are already on nsone.net nameservers — check whether you have direct NS1 account access, which may expose SVCB)

To switch to Cloudflare:
1. Create a free Cloudflare account and add `gauntlet-group.com`.
2. Cloudflare imports your existing records.
3. Add the two SVCB records above (Cloudflare supports SVCB/HTTPS in the dashboard).
4. Change your domain's nameservers at your registrar to the Cloudflare-assigned nameservers.
5. Enable DNSSEC (see Step 2) — Cloudflare handles key generation and publishes the DS record automatically.

**Option B — Use NS1 directly.**
Your nameservers are `dns*.p02.nsone.net`. If you have an NS1 Connect account, log in there and add the SVCB records — NS1 supports SVCB/HTTPS record types.

---

## Step 2 — Enable DNSSEC

DNSSEC signs your DNS zone so validating resolvers return authenticated data (the `AD` flag). Currently DNSSEC is **not** enabled on `gauntlet-group.com`.

### On Cloudflare (recommended — easiest)

1. Go to **Cloudflare dashboard** → select `gauntlet-group.com`.
2. **DNS** → **Settings** → **DNSSEC**.
3. Click **Enable DNSSEC**.
4. Cloudflare generates the DS record automatically. Copy the DS record.
5. Go to your **domain registrar** (where you purchased `gauntlet-group.com`) and add the DS record to the parent zone (`.com`).
   - Some registrars auto-detect Cloudflare's DS record; others require manual entry.
6. Wait for propagation (minutes to hours).

### On Netlify DNS

Netlify DNS does not currently offer DNSSEC signing in its managed DNS UI. If you stay on Netlify DNS, you would need to self-host a DNSSEC-signing primary and use Netlify/NS1 as secondary — this is significantly more complex than switching to Cloudflare.

### Verify DNSSEC is active

```bash
# Via DNS-over-HTTPS (no dig required)
curl -s "https://cloudflare-dns.com/dns-query?name=gauntlet-group.com&type=DNSKEY" \
  -H "Accept: application/dns-json" | python3 -m json.tool
```

You should see `"AD": true` and at least one `DNSKEY` record in the `Answer` section.

---

## Step 3 — Verify the SVCB Records

```bash
# Check the index record
curl -s "https://cloudflare-dns.com/dns-query?name=_index._agents.gauntlet-group.com&type=SVCB" \
  -H "Accept: application/dns-json" | python3 -m json.tool

# Check the a2a record
curl -s "https://cloudflare-dns.com/dns-query?name=_a2a._agents.gauntlet-group.com&type=SVCB" \
  -H "Accept: application/dns-json" | python3 -m json.tool
```

Each should return `"Status": 0` (NOERROR) with an `Answer` containing the SVCB record data.

---

## Step 4 — Re-run the Scanner

```bash
curl -s -X POST https://isitagentready.com/api/scan \
  -H "Content-Type: application/json" \
  -d '{"url": "https://gauntlet-group.com"}' | python3 -m json.tool
```

Check that `checks.discoverability.dnsAid.status` is `"pass"`.

---

## Summary of Required Changes

| # | Change | Where | Type |
| --- | --- | --- | --- |
| 1 | Add `_index._agents` SVCB record | DNS provider dashboard | Infrastructure |
| 2 | Add `_a2a._agents` SVCB record | DNS provider dashboard | Infrastructure |
| 3 | Enable DNSSEC signing | DNS provider dashboard + registrar | Infrastructure |

None of these can be done from the project codebase — all three are DNS-level changes made in your DNS provider's control panel.

---

## Current State (as of scan)

- Nameservers: `dns1–4.p02.nsone.net` (Netlify DNS / NS1)
- `_index._agents.gauntlet-group.com` SVCB: **not found** (NXDOMAIN)
- `_a2a._agents.gauntlet-group.com` SVCB: **not found** (NXDOMAIN)
- DNSSEC: **not enabled** (no DNSKEY records, `AD` flag false)
