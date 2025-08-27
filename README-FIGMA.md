# 🎨 Figma Integration

Automated design system synchronization between Figma and your React project.

## Quick Commands

```bash
# Sync everything from Figma
npm run figma:sync

# Get help
npm run figma:help

# Legacy icon script
npm run figma:icons
```

## What It Does

- 🔄 **Auto-syncs** design tokens (colors, typography, spacing)
- 🎯 **Generates** React components from Figma designs
- 🖼️ **Extracts** SVG icons as React components
- 🎨 **Creates** CSS custom properties and Tailwind configs
- 📝 **Generates** TypeScript types for design tokens

## Setup

1. **Get Figma Access Token**: [Figma Settings → Personal Access Tokens](https://www.figma.com/settings)
2. **Find File ID**: From your Figma file URL
3. **Configure**: Update `env/env.development`
4. **Organize**: Structure your Figma file with recommended naming
5. **Sync**: Run `npm run figma:sync`

## File Structure

```
src/
├── components/
│   ├── figma/           # Generated React components
│   └── icons/
│       └── figma/       # Generated icon components
└── styles/
    └── design-tokens/   # CSS variables, Tailwind config, TypeScript types
```

## Configuration

Edit `figma.config.js` to customize:
- Output directories
- Component generation settings
- Design token extraction rules
- Auto-sync behavior

## Documentation

📚 **Full Setup Guide**: [FIGMA_INTEGRATION_SETUP.md](./FIGMA_INTEGRATION_SETUP.md)

## Example Usage

```tsx
// Using generated CSS variables
<div style={{ backgroundColor: 'var(--color-primary)' }}>
  Hello World
</div>

// Using generated icon components
import { HomeIcon } from '../components/icons/figma';
<HomeIcon size={24} className="text-blue-500" />

// Using generated TypeScript types
import { figmaTokens } from '../styles/design-tokens/figma-tokens';
<div style={{ color: figmaTokens.colors.primary }}>
  Hello World
</div>
```

---

**Need help?** Check the troubleshooting section in the setup guide or run `npm run figma:help`
