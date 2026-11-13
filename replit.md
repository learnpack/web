# LearnPack replit.md

## Overview

LearnPack is an educational technology platform designed to help users create interactive learning packages rapidly. It supports the transformation of ideas into structured learning experiences, exportable to formats like SCORM, ePub, and iFrame. This full-stack web application leverages AI for content generation, targeting educators, trainers, and organizations aiming to streamline content creation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React with TypeScript (Vite).
- **Styling**: Tailwind CSS, custom design system, dark theme default.
- **UI Components**: Radix UI primitives with shadcn/ui.
- **Routing**: Wouter for client-side routing, Supabase-inspired multi-level navigation.
- **State Management**: TanStack Query for server state.
- **Forms**: React Hook Form with Zod validation.
- **SEO**: `react-helmet-async` for dynamic meta tags, localized SEO, and JSON-LD schema.
- **Internationalization**: `react-i18next` for English and Spanish, dynamic loading, and namespace management.
- **Redirects**: YAML-based configuration for automatic URL redirects with query parameter preservation.

### Backend
- **Runtime**: Node.js with Express.js.
- **Language**: TypeScript with ES modules.
- **API**: RESTful API, `/api` prefix.
- **Database ORM**: Drizzle ORM for type-safe operations, Drizzle Kit for migrations.
- **Authentication**: BreathCode API-based for admin access, token storage in localStorage (to be migrated to HttpOnly cookies).
- **Session Management**: Express sessions with PostgreSQL store.

### Design System
- **Color Palette**: Dark theme with charcoal background and purple accents.
- **Typography**: Inter (UI), JetBrains Mono (code).
- **Components**: Glass-morphism effects, consistent spacing.
- **Layout**: Container-based responsive design (7xl max-width).

### Feature Specifications
- **Navigation**: Multi-level header with dropdowns (Product, About), direct links.
  - **Product Dropdown**: 2-column layout with Features (left) and Use Cases (right), Platform Overview at top, "LearnPack vs Competition" at bottom with prominent divider (border-t-2 border-border, my-3 spacing) for visual separation
  - **About Dropdown**: Simplified single-column list with Blog/Insights, Contact, and Company (direct link to /our-mission)
  - **Hover Bridges**: Invisible divs between buttons and dropdowns prevent gap issues during mouse movement
  - **Accessibility**: Full keyboard navigation (Tab + Enter/Space), touch support for mobile
- **Hero Section**: 2-column layout on desktop, single-column stack on mobile.
  - **Left Column**: H1 (text-3xl md:text-4xl lg:text-5xl, leading-snug), subtitle, and course creation form - left-aligned on desktop, centered on mobile
  - **Right Column**: YouTube demo video embed (https://youtu.be/dBjKIashs4Y) with 16:9 aspect ratio, rounded corners, and blue glow shadow effect
  - **Responsive Behavior**: Desktop shows side-by-side layout; mobile stacks video below content
  - **Animated Background**: Vite-inspired animated background with glowing orbs, connection lines, and particles
- **Pricing System**: Full BreathCode API integration for dynamic pricing, tiered plans, coupon support, and bilingual configuration.
- **Authentication & Redirect Flow**: Configurable platform URLs for login/signup, creator flows, and plan checkout redirects with Base64 encoding.
- **Admin System**: Protected routes, `AuthContext`, `ProtectedRoute`, and `Login` components for admin access control with "webmaster" capability.

### Feature Pages
- **End-to-End Automation** (`/features/automation`): Complete feature page with 10 sections optimized for SEO and LLM positioning.
  - **Sections**: Hero, Definition Box, Problems (5 cards), Features (6 cards), How It Works (3 steps), Feature Table (6 items), Use Cases (4 cards), Metrics (4 stats), Testimonial, Final CTA
  - **i18n**: Full EN/ES translations via `automation` namespace
  - **SEO**: Meta tags, Open Graph, JSON-LD SoftwareApplication schema
  - **Design**: Cosmic theme with animated stars, glassmorphism cards, consistent py-20 md:py-24 lg:py-28 spacing

## External Dependencies

- **UI and Styling**: Radix UI, Tailwind CSS, Lucide React, Google Fonts.
- **Development Tools**: Drizzle Kit, TanStack Query, React Hook Form, Wouter.
- **Database**: PostgreSQL, Neon Database.
- **API Integration**: BreathCode API (for pricing and authentication).
- **Internationalization**: `react-i18next`, `i18next-http-backend`.
- **Build Tools**: Vite, esbuild, PostCSS.
- **Session Store**: `connect-pg-simple`.