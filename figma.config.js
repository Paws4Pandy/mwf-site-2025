export default {
  // Figma API Configuration
  api: {
    // Your Figma Personal Access Token
    // Get this from: https://www.figma.com/developers/api#access-tokens
    accessToken: process.env.FIGMA_ACCESS_TOKEN,
    
    // Your Figma file ID (found in the URL when you open a Figma file)
    fileId: process.env.FIGMA_FILE_ID,
    
    // Team ID (if working with team files)
    teamId: process.env.FIGMA_TEAM_ID,
  },
  
  // Design System Configuration
  designSystem: {
    // Frame names that contain your design tokens
    tokens: {
      colors: 'Design Tokens/Colors',
      typography: 'Design Tokens/Typography',
      spacing: 'Design Tokens/Spacing',
      shadows: 'Design Tokens/Shadows',
      borders: 'Design Tokens/Borders',
    },
    
    // Component library frame names
    components: {
      icons: 'Icons',
      buttons: 'Buttons',
      inputs: 'Inputs',
      cards: 'Cards',
      navigation: 'Navigation',
    },
  },
  
  // Output Configuration
  output: {
    // Where to save generated components
    components: './src/components/figma',
    
    // Where to save design tokens
    tokens: './src/styles/design-tokens',
    
    // Where to save generated icons
    icons: './src/components/icons/figma',
    
    // CSS custom properties file
    cssVariables: './src/styles/figma-variables.css',
  },
  
  // Component Generation Settings
  components: {
    // Generate React components
    react: true,
    
    // Generate TypeScript types
    typescript: true,
    
    // Generate Storybook stories
    storybook: false,
    
    // Generate CSS modules
    cssModules: true,
    
    // Component naming convention
    naming: 'PascalCase',
  },
  
  // Icon Generation Settings
  icons: {
    // Icon formats to generate
    formats: ['tsx', 'svg'],
    
    // Icon size variants
    sizes: [16, 20, 24, 32, 48],
    
    // Icon color variants
    colors: ['currentColor', 'inherit', 'primary', 'secondary', 'accent'],
    
    // Generate icon index
    generateIndex: true,
  },
  
  // Design Token Settings
  tokens: {
    // Generate CSS custom properties
    cssVariables: true,
    
    // Generate Tailwind config
    tailwind: true,
    
    // Generate TypeScript types
    typescript: true,
    
    // Token naming convention
    naming: 'kebab-case',
  },
  
  // Selective Sync Configuration
  selective: {
    // Enable selective syncing (only sync specific items)
    enabled: true,
    
    // Specific node IDs to sync (leave empty to sync all)
    // Find these in Figma: Right-click component → Copy link → extract node ID
    specificNodes: [
      '389-5251', // Icons/Money/Bags/Version-4 - Your specific money bag
    ],
    
    // Specific component names to sync (partial match supported)
    componentNames: [],
    
    // Specific icon names to sync
    iconNames: [],
    
    // Frame names to include (exact match)
    includeFrames: [
      // Example: 'Mobile Icons', 'Desktop Components'
      // Add frame names to include
    ],
    
    // Pattern matching for component names (regex supported)
    patterns: {
      icons: ['/icon', 'icon-'], // Match anything with 'icon'
      components: ['^Button', '^Card'], // Button and Card variants
    },
  },
  
  // Sync Settings
  sync: {
    // Auto-sync on file changes
    autoSync: false,
    
    // Sync interval in minutes (if autoSync is true)
    interval: 5,
    
    // Watch specific frames for changes
    watchFrames: [],
    
    // Exclude specific frames from sync
    excludeFrames: [],
    
    // Clean up old generated files before sync
    cleanBeforeSync: true,
  },
};
