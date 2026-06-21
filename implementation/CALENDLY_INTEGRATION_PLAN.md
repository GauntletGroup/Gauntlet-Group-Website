# Calendly Integration Plan - Gauntlet Group Website

This document provides a comprehensive implementation plan for integrating Calendly scheduling directly into the Gauntlet Group website. The plan is tailored to the existing Vite + React + TypeScript + Tailwind CSS structure, ensuring safe script loading, visual branding alignment, performance optimization, and mobile-friendly usability.

---

## 1. Recommended Embed Approach
We recommend the **Advanced Programmatic JS Embed** (via Calendly's JavaScript API) over a raw `<iframe>` embed.

### Rationale
* **Dynamic Prefill & Tracking:** Using the programmatic API (`window.Calendly`) allows us to dynamically pass user information (e.g., name, email, custom answers) and UTM marketing parameters as a JavaScript object rather than manually parsing and appending URL string query parameters.
* **Loading State & UX:** We can listen to script load events and show a beautiful skeleton loader before initializing the widget, eliminating layout shifts (CLS) and raw iframe flickers.
* **Custom Callbacks:** Programmatic embedding allows us to attach event listeners to Calendly postMessage events (e.g., when an event is scheduled). This is crucial for tracking conversions (Google Analytics, Supabase logging) or triggering post-booking routing without relying on redirection.
* **Modal Flexbility:** The JS SDK natively handles launching popups (`Calendly.showPopupWidget`) without us needing to manage custom CSS z-index modal layers for the scheduling widget.

---

## 2. Branding Alignment & Customization

The Calendly widget will be styled to match the Gauntlet Group theme:
* **Background Color:** `#0B1120` (`0b1120` inside widget params) matches the deep dark card background.
* **Text Color:** `#FFFFFF` (`ffffff` inside widget params) matches standard body copy.
* **Primary Color:** `#F59E0B` (`f59e0b` inside widget params) matches the premium amber/gold accent color.
* **Landing Page Details:** We will hide the profile picture and event type description (`hide_landing_page_details=true`) to keep the interface compact, since our site's copy already explains the consultation.
* **GDPR Banner:** Can be hidden (`hide_gdpr_banner=true`) provided our host site's cookie policy governs the page load.

### Key Customization Limitations (Important)
> [WARNING]
> **No Custom CSS Overrides:** The Calendly widget is served inside a cross-origin iframe. The browser's Same-Origin Policy prevents our custom styles, fonts (e.g., `Outfit`, `Inter`), borders, and button radiuses from applying inside the widget. The scheduling calendar and time selectors will use Calendly's default fonts and button styles. We can only change the background, text, and primary link/button colors.

---

## 3. Data Capture & Prefill Strategy

1. **Invitee Questions:** All invitee questions (e.g., Company, Phone, Areas of Interest) must be configured in the **Calendly Admin Panel** under the event type settings. They will automatically render within the embed.
2. **Dynamic Prefill:** The integration will support passing user data programmatically. If the user has already input their details elsewhere (e.g., a newsletter sign-up, or a pre-step intake form), the parent component will accept a `prefill` prop:
   ```typescript
   export interface CalendlyPrefill {
     name?: string;
     email?: string;
     customAnswers?: {
       [key: string]: string; // a1, a2, etc. mapping to custom questions
     };
   }
   ```
3. **UTM & Analytics Forwarding:** If users land on the site via marketing campaigns, UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`) will be extracted from the URL and forwarded to the widget config so bookings are attributed correctly.

---

## 4. Performance & Reliability Optimization

To keep the Lighthouse score at 90+ and ensure seamless rendering:
* **Intersection Observer / Lazy Loading:** The Calendly script and CSS files will not load during the initial page paint. A React hook will trigger loading only when the "Book a Call" section enters the viewport, or when a user clicks a popup trigger CTA.
* **Layout Shift Prevention (CLS):** The inline container will be assigned a fixed height (`min-h-[700px]` on desktop, `min-h-[1000px]` on mobile) corresponding to the height of the Calendly widget. A premium shimmering skeleton loader will display until the script is ready.
* **SSR Safety:** Checking `typeof window !== 'undefined'` is integrated into the loader to ensure that if the site ever migrates to Next.js or SSR frameworks, it will not break the build.
* **Ref-based Re-initialization:** When React components re-render or when hot reloading is active, the DOM element reference is used to ensure the widget is cleanly re-injected.

---

## 5. Security, Cookies & GDPR Privacy

* **Cookie Policy:** Calendly sets performance, functional, and tracking cookies inside its iframe. 
* **Consent Management:** If the host website has a cookie banner, the Calendly script loading and iframe rendering should be deferred until the user consents to "Functional/Targeting Cookies". If consent is denied or not yet given, the widget container will show a clean card: *"Please accept cookies to view the booking calendar."*
* **Data Flow:** Invitee name, email, and responses are submitted directly to Calendly's ISO 27001-certified servers. No sensitive form data is stored locally unless we explicitly hook into webhooks/conversions.

---

## 6. Proposed Code Changes & Component Architecture

### New Files to Create

#### 1. [NEW] `src/hooks/useCalendlyScript.ts`
A custom hook that injects the Calendly widget JS and CSS files dynamically.
* Checks if the script is already present to prevent duplicate loads.
* Returns a boolean state `loaded` representing whether the script is ready to use.

#### 2. [NEW] `src/components/sections/BookCall.tsx`
The primary inline booking section component.
* Renders a layout matching the site's dark glass design.
* Integrates a skeleton loader.
* Mounts an element with a fixed height and calls `window.Calendly.initInlineWidget` once the script is loaded.
* Standardized height to prevent CLS.

#### 3. [NEW] `src/types/calendly.d.ts`
TypeScript type declarations for the `window.Calendly` global object to prevent compile errors.

### Files to Modify

#### 4. [MODIFY] [App.tsx](file:///c:/Temp/Coding/Gauntlet-Group-Website-main/src/App.tsx)
* Import and render the new `<BookCall />` section.
* Add state to trigger the Calendly popup modal from CTA buttons.
* Wire up a global handler for programmatic modal launch.

#### 5. [MODIFY] [Navbar.tsx](file:///c:/Temp/Coding/Gauntlet-Group-Website-main/src/components/layout/Navbar.tsx)
* Add a navigation item for "Book a Call" (linking to `#book-call`).
* Style the navigation item to transition smoothly to the new section.

#### 6. [MODIFY] [Hero.tsx](file:///c:/Temp/Coding/Gauntlet-Group-Website-main/src/components/sections/Hero.tsx)
* Update the primary CTA ("Get a Free Assessment") or add a secondary button to trigger either a scroll to `#book-call` or launch the popup widget.

#### 7. [MODIFY] [Contact.tsx](file:///c:/Temp/Coding/Gauntlet-Group-Website-main/src/components/sections/Contact.tsx)
* Update the "Ready to Get Started?" card to link directly to the Calendly booking flow instead of scrolling to the traditional contact form.

---

## 7. Step-by-Step Implementation Tasks

### Phase 1: Environment and Types Setup
- [ ] Add `VITE_CALENDLY_URL` to the local environment variables.
- [ ] Create `src/types/calendly.d.ts` defining `Calendly` namespace and options interface.

### Phase 2: Script Loading Hook
- [ ] Create `src/hooks/useCalendlyScript.ts` loading `widget.js` and `widget.css`.
- [ ] Ensure safe cleanup and check for existing script tags.

### Phase 3: Inline Component Development
- [ ] Create `src/components/sections/BookCall.tsx` with a container, a loading skeleton, and the initialization script.
- [ ] Configure branding colors (`background_color: '0b1120'`, `text_color: 'ffffff'`, `primary_color: 'f59e0b'`).
- [ ] Handle component unmount cleanups and route change states.

### Phase 4: Popup / Modal Integration
- [ ] Implement a trigger helper `openCalendlyPopup` using `window.Calendly.showPopupWidget` in `src/hooks/useCalendlyScript.ts`.
- [ ] Add state management to `App.tsx` for tracking when/where popup is triggered.

### Phase 5: Navigation & Page Integration
- [ ] Add the `<BookCall />` component to the section stack in `App.tsx`.
- [ ] Update `Navbar.tsx` to list and scroll to `#book-call`.
- [ ] Wire up Hero CTA and Contact Section CTA cards to trigger the booking popup or scroll to the inline embed.

---

## 8. Environment Config

* **Environment Variable:** `VITE_CALENDLY_URL`
* **Default Value (for Dev/Local):** `https://calendly.com/acme/30min` (or a mock link for sandbox testing).
* **Bolt.new Configuration:** The variable should be added in the Bolt.new environment settings panel for production deployment.

---

## 9. QA Checklist

### Cross-Browser Testing
- [ ] **Chrome (Desktop/Mobile):** Validate responsive scaling and time selector click areas.
- [ ] **Safari (Mac/iOS):** Confirm that iframe cookies/cross-site tracking protection (ITP) doesn't block loading of the calendar dates.
- [ ] **Firefox:** Ensure scrollbars inside the iframe render cleanly.

### Usability & Performance
- [ ] **Layout Shifts (CLS):** Run Lighthouse audit before and after loading the script to verify layout stability.
- [ ] **Adblockers:** Verify that standard adblockers (e.g. uBlock Origin) do not block Calendly unless explicit tracking options are enabled. Provide fallback link if blocked.
- [ ] **Cookie Banner Compliance:** Confirm that cookies are not set prior to user acceptance if host site consent is active.
- [ ] **Timezone Detection:** Verify the widget auto-detects the user's browser timezone correctly.

### Fallback System
- [ ] If `useCalendlyScript` fails or script takes > 5 seconds to load, render a user-friendly card: *"Trouble loading the calendar? [Book directly on Calendly](link) or contact us via email."*

---

## 10. Rollout & Staging Plan
1. **Local verification:** Verify inside Vite using the placeholder URL.
2. **Staging deployment (Bolt.new):** Deploy to preview branch, check mobile responsiveness, and run a test booking.
3. **Production swap:** Replace the placeholder `VITE_CALENDLY_URL` with the client's official Calendly event type link.

---

## 11. Future Upgrades

* **Prefill System:** Integrate a 2-field pre-step intake form that gathers the name and email of the user, validates it, and immediately forwards it to Calendly to reduce friction.
* **Conversion Tracking (Webhooks):** Set up a Calendly integration using their Developer Webhooks (e.g. `invitee.created`) to log successful bookings inside the Supabase database.
* **UTM Campaigns:** Use `window.location.search` in the React script hook to pass custom UTM codes into Calendly for precise marketing ROI tracking.
