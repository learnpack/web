# LearnPack Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from Notion and Linear for productivity tools, with modern SaaS landing page aesthetics. This approach suits LearnPack's developer-focused utility nature while maintaining visual appeal for conversion.

## Core Design Elements

### A. Color Palette
**Dark Theme Primary (Blue-Based)**:
- Background: 222 47% 11% (deep blue-charcoal)
- Surface: 220 13% 14% (card blue)
- Secondary: 220 13% 25% (muted blue-gray)
- Primary brand: 207 100% 50% (bright blue - #1F6FEB)
- Accent: 200 80% 60% (lighter blue)
- Text primary: 210 40% 98% (near white)
- Text secondary: 215 20% 65% (muted gray)

**Blue Glow Effects** (for backgrounds):
- Radial gradients with hsl(207 100% 50% / 0.05-0.08)
- Blur: 100-120px for soft ambient glow
- Position: Top-right hero, mid-page left/right, bottom area

### B. Typography (Unified CSS Classes)
**Google Fonts via CDN**:
- Primary: Inter (headings, UI) - weights 400, 500, 600, 700
- Secondary: JetBrains Mono (code snippets, package names) - weight 400

**Typography Utility Classes (defined in index.css)**:
- `.heading-hero`: 2.5rem → 3rem → 3.5rem responsive, bold, tight tracking
- `.heading-section`: 1.875rem → 2.25rem → 2.5rem responsive, bold
- `.heading-sub`: 1.25rem → 1.5rem responsive, semibold
- `.body-lg`: 1.125rem → 1.25rem responsive, relaxed line-height
- `.body-md`: 1rem, normal line-height
- `.label-sm`: 0.75rem, uppercase, tracking-wide, primary color
- `.label-md`: 0.875rem, muted foreground

### C. Layout System
**Section Spacing Classes (defined in index.css)**:
- `.section-hero`: py-24 → py-28 → py-32 responsive (hero sections)
- `.section-standard`: py-20 → py-28 → py-32 responsive (regular sections)
- `.section-tight`: py-12 → py-16 responsive (compact sections)

**Container**:
- Max-width: 7xl (1280px) via `.content-container`
- Component spacing: gap-8, gap-12
- Card padding: p-6 to p-8

### D. Shared Components

**PageBackground** (`@/components/ui/page-background`):
- Unified star-field background with blue-toned twinkle effect
- Includes 4 positioned blue glow overlays
- Default 50 stars, configurable via `starCount` prop
- Use on all feature pages for consistent visual continuity

**StarBackground** (`@/components/ui/star-background`):
- Standalone star animation component
- Uses `starTwinkleUnified` keyframe from index.css
- Blue-toned stars with varying sizes and animation delays

**ScrollFade** (`@/components/ui/scroll-fade`):
- Fade-in-up animation wrapper using Framer Motion
- Triggers once when element enters viewport
- Configurable delay for staggered effects

**UnifiedFAQ** (`@/components/ui/unified-faq`):
- Consistent FAQ accordion component
- Props: title, subtitle, lastUpdated, items[]
- Includes star background and scroll animations
- Rounded container with glassmorphism styling

### E. Component Library

**Navigation**: Sticky header with logo, minimal nav links, and CTA button
**Hero Section**: 2-column layout with text left, visual right. Blue gradient backdrop.
**Feature Cards**: Glass-morphism effect with subtle borders and hover states
**Statistics Display**: Large numbers with animated counters and contextual descriptions
**Process Steps**: Numbered circles with connecting lines and descriptive content
**Toast Notifications**: Slide-in from top-right with success/error states

**Critical Constraint**: Maximum 6 sections total - Hero, Value Props, How It Works, Proof, Use Cases, Final CTA. Each section must drive conversion.

## Images
**Hero Background**: Abstract geometric pattern or subtle code-inspired texture overlay behind the package creation form. Not a large hero image, but a textured background.
**Feature Icons**: Use Heroicons via CDN for consistency - code, lightning bolt, shield icons for the three main value propositions.
**Process Illustrations**: Simple line drawings or icons representing the three-step workflow.

## Key Design Principles
1. **Developer-First Aesthetics**: Clean, terminal-inspired design with subtle technical elements
2. **Conversion-Focused Layout**: Each section builds urgency and value proposition
3. **Performance-Optimized**: Minimal animations, optimized images, efficient CSS
4. **Accessibility**: High contrast ratios, proper ARIA labels, keyboard navigation
5. **Cohesive Branding**: Consistent purple theme throughout with strategic accent usage