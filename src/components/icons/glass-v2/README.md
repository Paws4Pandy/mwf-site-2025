# Glass Icons V2 Collection

A comprehensive collection of glass morphism icons built with React and SVG, featuring advanced gradient effects, blur filters, and glass morphism styling.

## Features

- **Glass Morphism Effects**: Semi-transparent backgrounds with backdrop blur
- **Multiple Gradient Layers**: Complex gradient combinations for depth
- **Unique ID Generation**: Prevents gradient conflicts between multiple instances
- **Responsive Sizing**: All icons scale properly at different sizes
- **Hover Effects**: Built-in hover animations and transitions
- **TypeScript Support**: Fully typed components with proper interfaces

## Icon Collection

### Basic Icons
- `GlassIconV2` - Base glass icon component with customizable content
- `GlassWalletIconV2` - Wallet-themed glass icon with gradient effects

### Complex Icon
- `ComplexGlassIcon` - Large composite icon with multiple elements (272x242 viewBox)

### Individual Icons
- `GeometricGlassIcon` - Complex geometric shape with multiple gradients
- `CircularGlassIcon` - Circular glass with glow effects
- `VerticalBarIcon` - Vertical bar with gradient styling
- `SquarePlusIcon` - Square with plus symbol
- `ThreeDotsIcon` - Three dots in glass circle
- `DiamondIcon` - Diamond shape with plus symbol
- `HexagonIcon` - Hexagonal glass shape
- `StarIcon` - Star shape with gradient effects

## Usage

### Basic Usage
```tsx
import { GlassWalletIconV2 } from '@/components/icons/glass-v2';

function MyComponent() {
  return (
    <GlassWalletIconV2 
      size={50} 
      className="hover:scale-110 transition-transform duration-300" 
    />
  );
}
```

### Using Individual Icons
```tsx
import { 
  GeometricGlassIcon,
  CircularGlassIcon,
  StarIcon 
} from '@/components/icons/glass-v2';

function IconGrid() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <GeometricGlassIcon size={60} />
      <CircularGlassIcon size={60} />
      <StarIcon size={60} />
    </div>
  );
}
```

### Complex Icon
```tsx
import { ComplexGlassIcon } from '@/components/icons/glass-v2';

function HeroSection() {
  return (
    <ComplexGlassIcon 
      size={300} 
      className="hover:scale-105 transition-transform duration-300" 
    />
  );
}
```

## Props

All icons accept the following props:

- `size?: number` - Icon size in pixels (default: 50)
- `className?: string` - Additional CSS classes

## Technical Details

### Gradient System
Each icon uses unique gradient IDs to prevent conflicts:
- Generated using `React.useMemo()` for performance
- Includes multiple gradient types: glass, glow, and color gradients
- Supports complex gradient combinations

### Glass Morphism Implementation
- Semi-transparent backgrounds with `rgba(255, 255, 255, 0.2)` to `rgba(255, 255, 255, 0.5)`
- Backdrop blur effects using CSS filters
- Box shadows for depth and lighting effects

### Blur Filters
- Multiple blur levels for different effects
- Gaussian blur with configurable standard deviation
- Applied to background elements for glow effects

## CSS Structure Reference

This collection is based on the complex CSS structure provided, which includes:
- Multiple gradient layers
- Precise positioning and sizing
- Complex blur effects
- Glass morphism styling
- Inset shadows and highlights

## Browser Support

- Modern browsers with SVG support
- CSS backdrop-filter support (with fallbacks)
- React 16.8+ (for hooks)

## Performance

- Optimized with `React.useMemo()` for gradient ID generation
- Efficient SVG rendering
- Minimal DOM impact
- Scalable vector graphics

## Examples

See the main page (`src/pages/Index.tsx`) for a complete demonstration of all icons in action, including:
- Individual icon grid
- Complex icon display
- Hover effects and animations
- Responsive layout
