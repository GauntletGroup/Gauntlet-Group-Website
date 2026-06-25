# Implementation Plan - n8n Webhook Integration for 'Get Assessment' Form

We want to integrate the "Get Assessment" form on the Gauntlet Group website with an **n8n workflow webhook**. When a user submits the assessment form, their answers will be saved in Supabase and forwarded to n8n for further automated processing.

---

## User Review Required

### 1. Environment Variable Naming (Vite restriction)
Vite projects only expose environment variables to the frontend bundle if they are prefixed with `VITE_`.
* We will define the webhook URL env variable as:
  `VITE_N8N_WEBHOOK_URL` (or `VITE_N8N_WEBOOK_URL` to handle the typo).
* **Action Required:** When configuring this in your Bolt.new environment settings or local `.env` file, please add it as:
  ```env
  VITE_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/your-uuid
  ```

### 2. CORS Handling
Because the request will be sent directly from the browser (via the client-side React app running on Bolt.new), standard requests to external webhooks can be blocked by browser CORS security if the n8n server is not configured to return CORS headers.
* **Our Solution:** We will implement the fetch call with `mode: 'no-cors'` as a fallback or default configuration. In `no-cors` mode:
  1. The browser successfully transmits the POST payload to n8n, triggering your workflow.
  2. The browser is blocked from reading the n8n response body/status, but the webhook still triggers successfully.
  3. If your n8n instance *does* support CORS, we can keep the standard mode. We will write resilient fetch logic that defaults to a standard POST but can handle opaque responses.

---

## Proposed Changes

### 1. Project Configuration

#### [MODIFY] [.env](file:///c:/Temp/Coding/Gauntlet-Group-Website-main/.env)
Add the placeholder for the n8n webhook URL.
```env
VITE_N8N_WEBHOOK_URL=https://your-n8n-instance-webhook-url
```

---

### 2. Core Layout & Pages

#### [MODIFY] [App.tsx](file:///c:/Temp/Coding/Gauntlet-Group-Website-main/src/App.tsx)
* Update the `formData` state interface to support:
  * `firstName` and `lastName` (replacing `name`).
  * `companySize` (under 10, 10-49, 50-249, 250+).
  * `industry` (Tech, Finance, Healthcare, Retail, Education, Manufacturing, Other).
  * `gdprConsent` (boolean checkbox).
* Update `validateField` logic to validate these new fields and handle the GDPR checkbox.
* Modify the `handleInputChange` handler to correctly capture checkbox state (`e.target.checked`) and select dropdown selections.
* Update `handleSubmit`:
  * Map `firstName` and `lastName` to a combined `name` field for the Supabase `contact_inquiries` table insert.
  * Append `companySize`, `industry`, and `gdprConsent` into the `message` field inserted into Supabase to prevent breaking the existing DB schema.
  * Send a POST request to the n8n webhook with the structured JSON payload containing all individual fields.

---

### 3. Components

#### [MODIFY] [Contact.tsx](file:///c:/Temp/Coding/Gauntlet-Group-Website-main/src/components/sections/Contact.tsx)
* Update Prop types to allow `HTMLSelectElement` in handlers.
* Redesign the form layout:
  * Replace the single **Full Name** field with side-by-side **First Name** and **Last Name** fields.
  * Keep the **Email Address** and **Company Name** fields.
  * Replace the **Contact Number** field with side-by-side dropdown selectors for **Company Size** and **Industry**.
  * Keep the **Message** text area.
  * Add a styled, interactive **GDPR Consent Checkbox** below the message area.
* Apply consistent premium style states (borders, validation, hover states) to the new dropdowns and checkbox.

---

## Verification Plan

### Automated Verification
* Run a local Vite development compilation/build to ensure TypeScript typings compile correctly without errors.

### Manual Verification
1. Open the website form in the browser.
2. Complete the form fields:
   * First Name: `Test`
   * Last Name: `User`
   * Email: `test@gauntlet-group.com`
   * Company Name: `Test Org`
   * Company Size: `10 - 49 employees`
   * Industry: `Technology & IT`
   * Message: `This is a test assessment request.`
   * GDPR Checkbox: `Checked`
3. Click "Send Inquiry" (Get Assessment).
4. **Verify Supabase**: Check the `contact_inquiries` table to confirm that the combined name and formatted message payload were successfully saved.
5. **Verify n8n Webhook**: Open the n8n execution history to confirm that a POST request was received at the webhook URL with the structured JSON payload.
