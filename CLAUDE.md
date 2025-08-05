# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server on port 8080 (configured in vite.config.ts)
- `npm run build` - Build for production (Vercel deployment)
- `npm run build:dev` - Build for development mode
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Deployment

This project is configured for **Vercel deployment**. The build output is optimized for Vercel's static hosting.

- **Platform**: Vercel
- **Build Command**: `npm run build`
- **Output Directory**: `dist/`
- **Framework**: Vite (automatically detected by Vercel)

## Architecture Overview

This is a mortgage broker website built with React, TypeScript, Vite, and Tailwind CSS. It follows a single-page application architecture with client-side routing.

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Routing**: React Router DOM
- **State Management**: React Query (@tanstack/react-query)
- **Forms**: React Hook Form with Zod validation
- **Email Service**: TBD (for form confirmations)
- **AI Integration**: TBD (for mortgage chatbot)
- **Icons**: Lucide React

### Project Structure
- `/src/pages/` - Route components (Index, Meet, Calculator, etc.)
- `/src/components/` - Reusable UI components and page sections
- `/src/components/ui/` - shadcn/ui component library
- `/src/lib/` - Utility functions
- `/src/hooks/` - Custom React hooks
- `/src/assets/` - Static assets organized by type
  - `/src/assets/config/` - Centralized configuration files
    - `contact.ts` - Agent info, emails, phone numbers
    - `links.ts` - External URLs and navigation links
    - `cta.ts` - Call-to-action button configurations
    - `forms.ts` - Form settings, validation, email templates
    - `social.ts` - Social media links and handles
  - `/src/assets/images/` - Images, logos, photos
  - `/src/assets/videos/` - Video content
  - `/src/assets/calculators/` - Calculator data and configurations
  - `/src/assets/data/` - Interest rate tables and other data files
- `/public/` - Public assets (favicon, robots.txt, uploaded images)

### Routing Structure
- `/` - Home page with navigation cards
- `/meet` - About the mortgage agent
- `/getting-started` - First steps information
- `/resources` - Mortgage basics and educational content
- `/perks` - Giveaways and tools
- `/calculator` - Mortgage calculators
- `/contact` - Contact information
- `/claude-code` - Demo page for Claude Code integration
- `/*` - 404 Not Found page

### Design System

#### Brand Colors (defined in tailwind.config.ts)
**Primary Palette:**
- `pure-black`: #000000 (Primary text)
- `pure-white`: #ffffff (Background)
- `muted-red`: #8c3839 (Primary accent)
- `light-azure`: #cedeeb (Light backgrounds)
- `light-crimson`: #ffd3db (Soft accents)
- `brand-red`: #da7073 (CTA/highlights)
- `hunter-green`: #2b4743 (Secondary text)
- `gray-orange`: #dda83f (Warning/attention)

**Legacy Colors:** (deprecated, use new palette)
- `brx-*` colors maintained for backward compatibility

#### Typography System
**Primary Fonts:**
- **H1**: Anton (bold, impact headlines)
- **H2**: Abril Fatface (decorative headers)
- **H3-H6**: Hammersmith One (subheadings)
- **Body**: Open Sauce One (readable body text)
- **Subheadings**: Hammersmith One (via `.subheading` class)

**Legacy Fonts:** (deprecated)
- Playfair Display, Roboto, Montserrat maintained for compatibility

#### Key CSS Classes
- `.neon-text` - Glowing accent text with animation
- `.nav-card` - Styled navigation cards with hover effects
- `.bg-texture` - Subtle background texture pattern

### Component Patterns

#### Page Layout
All pages use the `PageBackground` wrapper component which provides:
- Consistent background styling
- Hunter green base color
- Texture overlay

#### Header Component
- Displays agent name and branding
- "Book a Call" CTA button
- BRX Mortgage logo
- Optional divider separator

#### Navigation Cards
Used on the home page for primary navigation, featuring:
- Consistent styling with `.nav-card` class
- Hover animations and effects
- Icon integration with Lucide React

### Configuration Notes

#### TypeScript
- Relaxed configuration with `noImplicitAny: false`
- Path aliases: `@/*` maps to `./src/*`
- Skip library checks enabled for faster builds

#### ESLint
- React hooks and React refresh plugins
- Unused variables warning disabled
- TypeScript recommended rules

#### Vite
- Development server runs on port 8080
- SWC plugin for fast React compilation
- Component tagging for development mode

## Future Development Roadmap

### Forms & Email Integration
- **Form Requirements**: Contact forms, mortgage application forms, consultation booking
- **Email Confirmations**: Automated email confirmations sent to clients upon form submission
- **Form Validation**: Use React Hook Form with Zod for robust client-side validation
- **Email Service Options**: Consider Resend, EmailJS, or Vercel's email integration

### AI Chatbot Integration
- **Purpose**: Answer mortgage-related questions, provide basic calculations, guide users
- **Integration Options**: 
  - OpenAI API for conversational AI
  - Anthropic Claude API for mortgage expertise
  - Custom trained model for domain-specific responses
- **Features**: 
  - Mortgage terminology explanations
  - Basic affordability calculations
  - Process guidance and next steps
  - Escalation to human agent when needed

### Asset Management
- **Images**: Professional headshots, property photos, infographics
- **Videos**: Educational content, testimonials, process walkthroughs
- **Calculators**: Affordability, payment schedules, amortization tables
- **Data Tables**: Current interest rates, qualification requirements, program details

## Configuration Management

All links, contact information, CTAs, and form settings are centralized in `/src/assets/config/`:

- **contact.ts**: agent details, business emails, phone numbers
- **links.ts**: external URLs, internal navigation, redirect destinations  
- **cta.ts**: call-to-action button text, URLs, and form triggers
- **forms.ts**: form configurations, validation rules, email templates
- **social.ts**: social media links with handles and display order

### Usage Examples
```typescript
import { contactInfo } from '@/assets/config/contact';
import { externalLinks } from '@/assets/config/links';  
import { ctaButtons } from '@/assets/config/cta';
import { socialLinks } from '@/assets/config/social';

// Use in components
<a href={externalLinks.bookACall}>{ctaButtons.bookACall.text}</a>
<p>{contactInfo.agent.email}</p>
```

### Email Integration
- **Form submissions**: `hello@mortgagewithford.ca`
- **Client confirmations**: Same email address (Gmail)
- **Office hours**: `andreina@mortgagewithford.ca`
- **Redirect**: After form submission → `/guides` (downloadable guides page)

### Development Notes
- Use existing components from shadcn/ui library before creating new ones
- Follow the established color scheme and typography
- Maintain consistent animations and transitions
- All new routes must be added above the catch-all "*" route in App.tsx
- Always import from config files rather than hardcoding links/emails
- Consider implementing lazy loading for images and videos
- Use environment variables for API keys and sensitive configuration