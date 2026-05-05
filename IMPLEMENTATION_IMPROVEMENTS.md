# Implementation Plan: Frontend Improvements

This document outlines the strategy for elevating the Gauntlet Group website into a state-of-the-art, premium tech platform.

## 1. Architecture & Foundation
**Goal:** Clean up the codebase to support complex features and improve maintainability.

- [x] **Component Modularization**: Break down the 900-line `App.tsx` into logical components:
    - `src/components/layout/Navbar.tsx`
    - `src/components/sections/Hero.tsx`
    - `src/components/sections/About.tsx`
    - `src/components/sections/Services.tsx`
    - `src/components/sections/Contact.tsx`
    - `src/components/ui/Modal.tsx`
    - `src/components/ui/Button.tsx`
- [x] **Design Tokens**: Centralize colors and spacing in `tailwind.config.js` to ensure consistency (e.g., specific `gold-premium` and `cyan-tech` HSL values).

## 2. Design System & Typography
**Goal:** Establish a premium visual language.

- [x] **Typography Upgrade**: 
    - Install and integrate a premium font like **Outfit** or **Geist**.
    - Implement a consistent type scale across all headings and body text.
- [x] **Mesh Gradient Backgrounds**: Replace simple CSS gradients with complex mesh gradient overlays in the Hero and Section backgrounds.
- [x] **Glassmorphism Refinement**: Update card styles with consistent `backdrop-blur` and subtle borders.

## 3. Motion & Interactivity
**Goal:** Create a fluid, "alive" user experience using `framer-motion`.

- [x] **Framer Motion Setup**: Install `framer-motion` and replace CSS keyframes.
- [x] **Staggered Entrances**: Implement `whileInView` animations for all section content.
- [x] **Magnetic Buttons**: Add magnetic pull effects to primary CTAs.
- [x] **Smart Cursor Follower**: Enhance the cursor follower to react to interactive elements (scaling up on buttons, changing color on sections).
- [x] **Scroll-Linked Parallax**: Add subtle parallax shifts to background assets and hero text.

## 4. Advanced UX Components
**Goal:** Improve storytelling and content engagement.

- [x] **Bento Grid Layout**: Redesign the "Why Choose Us" section into a modern Bento-style grid.
- [x] **Process Timeline**: Create an interactive "E-Waste Journey" or "Consultation Flow" visualization.
- [x] **Live Impact Widget**: Add a terminal-style component showing simulated/real environmental impact stats.
- [x] **Progressive Disclosure Modals**: Update Service modals with better content structure (tabs or accordions).

## 5. Polish & Accessibility
**Goal:** Ensure the site is professional and inclusive.

- [x] **Real-time Form Validation**: Add instant feedback to the contact form fields.
- [x] **Reduced Motion Support**: Ensure animations honor the user's OS preference.
- [x] **Performance Optimization**: Convert all images to WebP/AVIF and implement lazy loading.
- [x] **Accessibility Audit**: Ensure proper contrast and keyboard navigation (ARIA labels).

---

## Progress Checklist

| Task Category | Status | Notes |
| :--- | :--- | :--- |
| **Architecture** | [x] | Refactored and modularized |
| **Typography** | [x] | Outfit & Inter integrated |
| **Framer Motion** | [x] | Animations implemented |
| **Bento Layout** | [x] | Implemented dynamic grid |
| **Process Timeline** | [x] | Animated journey section |
| **Polish/A11y** | [x] | Validation & accessibility complete |

---

## Implementation Order (Recommended)
1. **Refactor** (To make development easier).
2. **Typography & Colors** (Immediate visual impact).
3. **Framer Motion** (The "feel" of the site).
4. **New Layout Components** (Bento/Timeline).
5. **Final Polish**.
