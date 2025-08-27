# Figma Integration Setup Guide

This guide will help you connect your React project to Figma for automated design token extraction, component generation, and design system synchronization.

## 🚀 Quick Start

1. **Get your Figma Access Token**
2. **Find your Figma File ID**
3. **Configure environment variables**
4. **Run the sync command**

## 📋 Prerequisites

- A Figma account
- A Figma design file with organized components and design tokens
- Node.js and npm installed

## 🔑 Step 1: Get Your Figma Access Token

1. Go to [Figma Account Settings](https://www.figma.com/settings)
2. Navigate to the **Personal Access Tokens** section
3. Click **Create new token**
4. Give it a descriptive name (e.g., "React Project Integration")
5. Copy the generated token (you won't see it again!)

## 📁 Step 2: Find Your Figma File ID

1. Open your Figma design file
2. Look at the URL in your browser
3. The file ID is the long string after `/file/` and before the next `/`

**Example URL:**
```
https://www.figma.com/file/abc123def456ghi789jkl/Design-System
                                    ↑
                              This is your file ID
```

## ⚙️ Step 3: Configure Environment Variables

1. Open `env/env.development`
2. Replace the placeholder values:

```bash
# Figma Integration Configuration
FIGMA_ACCESS_TOKEN=figd_your_actual_token_here
FIGMA_FILE_ID=your_actual_file_id_here
FIGMA_TEAM_ID=your_team_id_here  # Optional
```

## 🎨 Step 4: Organize Your Figma File

For the integration to work effectively, organize your Figma file with these naming conventions:

### Design Tokens
Create frames with these names:
- `Design Tokens/Colors` - For color swatches
- `Design Tokens/Typography` - For text styles
- `Design Tokens/Spacing` - For spacing values
- `Design Tokens/Shadows` - For shadow styles
- `Design Tokens/Borders` - For border styles

### Components
Create frames with these names:
- `Icons` - For icon components
- `Buttons` - For button components
- `Inputs` - For input components
- `Cards` - For card components
- `Navigation` - For navigation components

### Icon Naming
Name your icons with these prefixes:
- `icon-[Name]` (e.g., `icon-home`, `icon-arrow`)
- `ic_[Name]` (e.g., `ic_home`, `ic_arrow`)

## 🚀 Step 5: Run the Integration

### Sync Everything
```bash
npm run figma:sync
```

### Get Help
```bash
npm run figma:help
```

### Legacy Icon Script
```bash
npm run figma:icons
```

## 📁 Generated Files

The integration will create these files automatically:

### Design Tokens
- `src/styles/design-tokens/figma-variables.css` - CSS custom properties
- `src/styles/design-tokens/tailwind-figma.js` - Tailwind config extension
- `src/styles/design-tokens/figma-tokens.ts` - TypeScript types

### Components
- `src/components/figma/` - Generated React components
- `src/components/icons/figma/` - Generated icon components

## 🎯 Usage Examples

### Using Generated CSS Variables
```css
/* In your CSS */
.my-button {
  background-color: var(--color-primary);
  padding: var(--spacing-medium);
  font-size: var(--font-heading-size);
}
```

### Using Generated Icon Components
```tsx
import { HomeIcon, ArrowIcon } from '../components/icons/figma';

function MyComponent() {
  return (
    <div>
      <HomeIcon size={24} className="text-blue-500" />
      <ArrowIcon size={32} className="text-green-500" />
    </div>
  );
}
```

### Using Generated TypeScript Types
```tsx
import { figmaTokens } from '../styles/design-tokens/figma-tokens';

function MyComponent() {
  return (
    <div style={{ color: figmaTokens.colors.primary }}>
      Hello World
    </div>
  );
}
```

## 🔄 Continuous Integration

### Auto-sync on Design Changes
1. Set `autoSync: true` in `figma.config.js`
2. The integration will watch for changes every 5 minutes
3. Run `npm run figma:sync` manually when needed

### Manual Sync
Run `npm run figma:sync` whenever you:
- Update design tokens in Figma
- Add new components
- Modify existing components
- Change color schemes or typography

## 🛠️ Customization

### Modify Configuration
Edit `figma.config.js` to customize:
- Output directories
- Component generation settings
- Icon formats and sizes
- Design token extraction rules

### Add Custom Extractors
Extend the `FigmaIntegration` class in `scripts/figma-integration.js` to:
- Extract custom design tokens
- Generate specialized components
- Add new output formats

## 🐛 Troubleshooting

### Common Issues

**"Missing FIGMA_ACCESS_TOKEN"**
- Check your environment variables
- Ensure the token is valid and not expired
- Verify the file path in `env/env.development`

**"Figma API error: 403"**
- Your token doesn't have access to the file
- Check file permissions in Figma
- Verify the file ID is correct

**"No icon nodes found"**
- Ensure icons are named with `icon-` or `ic_` prefix
- Check that icons are in the correct frame
- Verify the frame name matches the configuration

**"No design tokens found"**
- Check frame naming conventions
- Ensure tokens are properly organized
- Verify the frame structure matches expectations

### Debug Mode
Set `VITE_DEBUG_MODE=true` in your environment to get more detailed logging.

## 📚 Additional Resources

- [Figma API Documentation](https://www.figma.com/developers/api)
- [Figma Design Tokens Guide](https://www.figma.com/community/file/888356646686934821/Design-Tokens)
- [React Component Best Practices](https://react.dev/learn/thinking-in-react)

## 🤝 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify your Figma file organization
3. Check the console output for error messages
4. Ensure all environment variables are set correctly

---

**Happy designing! 🎨✨**
