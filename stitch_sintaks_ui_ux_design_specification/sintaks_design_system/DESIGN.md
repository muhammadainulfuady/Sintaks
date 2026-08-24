---
name: Sintaks Design System
colors:
  surface: '#fcf8ff'
  surface-dim: '#dcd8e4'
  surface-bright: '#fcf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f2fe'
  surface-container: '#f0ecf8'
  surface-container-high: '#eae6f3'
  surface-container-highest: '#e4e1ed'
  on-surface: '#1b1b23'
  on-surface-variant: '#464554'
  inverse-surface: '#302f39'
  inverse-on-surface: '#f3effb'
  outline: '#777586'
  outline-variant: '#c7c4d7'
  surface-tint: '#5148d7'
  primary: '#2a14b4'
  on-primary: '#ffffff'
  primary-container: '#4338ca'
  on-primary-container: '#c1beff'
  inverse-primary: '#c3c0ff'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#4b00a7'
  on-tertiary: '#ffffff'
  tertiary-container: '#6616d7'
  on-tertiary-container: '#d1b9ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e3dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#100069'
  on-primary-fixed-variant: '#372abf'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#eaddff'
  tertiary-fixed-dim: '#d2bbff'
  on-tertiary-fixed: '#25005a'
  on-tertiary-fixed-variant: '#5a00c6'
  background: '#fcf8ff'
  on-background: '#1b1b23'
  surface-variant: '#e4e1ed'
typography:
  display-lg:
    fontFamily: manrope
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: hankenGrotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: hankenGrotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: hankenGrotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.01em
  code-sm:
    fontFamily: jetbrainsMono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  sidebar-width: 240px
  max-content-width: 1200px
---

## Brand & Style
The design system for this platform is built on the philosophy of "Empathetic Clarity." As an Indonesian programming learning platform for beginners, the UI must dismantle the intimidation often associated with code. The brand personality is educational yet encouraging, acting as a supportive mentor rather than a rigid instructor.

The visual style is **Premium Modern**, characterized by a sophisticated interplay between generous whitespace and high-contrast Slate surfaces. By utilizing a "light-first" approach with deep Slate accents, we create a focused, distraction-free environment that prioritizes legibility and cognitive ease. The aesthetic avoids unnecessary ornamentation, relying on precise typography and a disciplined 4px grid to convey professional reliability.

## Colors
The color palette is anchored by a deep Indigo primary, signaling intelligence and stability. We employ a high-contrast Slate for secondary elements and surfaces to create the "Premium" feel requested, ensuring that the interface feels grounded.

- **Primary (Indigo):** Used for primary actions, progress indicators, and brand-critical touchpoints.
- **Secondary (Slate):** Dominates the structural elements (Sidebars, headers) to provide a sophisticated, calm backdrop for learning.
- **Tertiary (Violet):** Specifically reserved for Gamification and XP-related elements to separate "Learning" from "Achievement."
- **Semantic Palette:** Used sparingly for feedback, ensuring that error states and success messages are unmistakable against the neutral background.
- **Surface Strategy:** We use `#F8FAFC` for the canvas and white for interactive cards to create a subtle but clear hierarchy of depth.

## Typography
The typography system pairs **Manrope** for headlines and UI elements with **Hanken Grotesk** for body text. Manrope provides a modern, geometric structure that feels technical yet friendly. Hanken Grotesk is chosen for its exceptional legibility in long-form educational content.

- **Headlines:** Use tight letter-spacing on larger displays to maintain a cohesive, "designed" look.
- **Body Text:** Uses a slightly increased line-height (1.6) for the `body-lg` role to prevent learner fatigue during long reading sessions.
- **Code:** JetBrains Mono is utilized for all technical snippets, featuring ligatures that help beginners understand multi-character operators (like `=>` or `===`).

## Layout & Spacing
This design system utilizes a strict **4px baseline grid**. All margins, paddings, and component heights must be multiples of 4.

- **App Layout:** A fixed 240px left-hand sidebar contains primary navigation. On tablet/mobile, this collapses into a drawer.
- **Content Area:** Uses a fluid grid with a maximum container width of 1200px to ensure line lengths for educational text remain optimal (60-80 characters).
- **Rhythm:** Use `16px (md)` for internal card padding and `24px (lg)` for spacing between major sections.
- **Code Alignment:** Code blocks should maintain a 16px internal gutter to ensure code doesn't feel cramped against the container edge.

## Elevation & Depth
Depth in this design system is achieved through **Tonal Layering** rather than heavy shadows. We use a flat, sophisticated look that feels modern and lightweight.

- **Level 0 (Background):** `#F8FAFC` - The base canvas.
- **Level 1 (Cards/Surface):** White `#FFFFFF` with a 1px border of `#E2E8F0`. Use a very soft shadow (0px 2px 4px rgba(15, 23, 42, 0.05)) to lift it slightly.
- **Level 2 (Hover/Active States):** Increased shadow depth (0px 10px 15px -3px rgba(15, 23, 42, 0.08)) and a primary-colored subtle border.
- **NOVA Panel (AI):** Uses a subtle Indigo-tinted background (`#EEF2FF`) to distinguish it as an intelligent layer sitting above the standard content.

## Shapes
The shape language is friendly and approachable. We use high-radius values to soften the "technical" nature of the platform.

- **Cards & Major Containers:** Use the `rounded-xl` (16px) setting to create a friendly, modern container feel.
- **Buttons & Inputs:** Use the `rounded-md` (8px) setting. This provides enough roundness to feel modern without becoming a full pill, maintaining a professional UI balance.
- **Progress Bars:** Should always be fully rounded (pill-shaped) to represent a continuous journey.

## Components

### Buttons
- **Primary:** Background Indigo (#4338CA), white text. Transition to (#3730A3) on hover.
- **Secondary/Ghost:** No background, Slate text (#64748B). On hover, a subtle Slate tint (#F1F5F9).
- **Icons:** Use Lucide React icons with a 2px stroke width to match the typography's weight.

### Cards (LearningPath, Module)
- Cards use the `rounded-xl` radius.
- **LearningPath Card:** Feature a large icon/illustration and a primary progress bar at the bottom.
- **Lesson Card:** Subtle hover effect where the border color shifts from Slate to Indigo.

### NOVA Panel (AI Tutor)
- The AI interface is styled as a "floating" or "docked" panel.
- Use a glassmorphism effect (backdrop-blur) if overlaid on code, or a solid `#EEF2FF` background.
- Messages from NOVA are left-aligned with a subtle Indigo border-left.

### Code Blocks
- The code area must use a dark theme (Slate-900) even in this light-mode design system. This reduces eye strain when reading syntax.
- Ensure the container uses `rounded-lg` and has a "Copy" button in the top-right corner that appears on hover.

### Form Elements
- Inputs use a white background with a 1px border (#E2E8F0).
- **Focus State:** The border should transition to Indigo (#4338CA) with a 3px soft Indigo outer glow (box-shadow).
- Labels are positioned above the input using the `label-md` typography style.

### Quiz & Feedback
- **Question Cards:** Use a larger font size for the question stem.
- **Correct Feedback:** Soft green background (#DCFCE7) with dark green text.
- **Incorrect Feedback:** Soft red background (#FEE2E2) with dark red text.