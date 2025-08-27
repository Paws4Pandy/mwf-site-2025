#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../env/env.development') });

// Configuration
const config = {
  accessToken: process.env.FIGMA_ACCESS_TOKEN,
  fileId: process.env.FIGMA_FILE_ID,
  teamId: process.env.FIGMA_TEAM_ID,
  outputDir: path.join(__dirname, '../src/components/figma'),
  tokensDir: path.join(__dirname, '../src/styles/design-tokens'),
  iconsDir: path.join(__dirname, '../src/components/icons/figma'),
};

class FigmaIntegration {
  constructor() {
    this.ensureDirectories();
  }

  ensureDirectories() {
    [config.outputDir, config.tokensDir, config.iconsDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`📁 Created directory: ${dir}`);
      }
    });
  }

  async fetchFigmaFile() {
    if (!config.accessToken || !config.fileId) {
      throw new Error('Missing FIGMA_ACCESS_TOKEN or FIGMA_FILE_ID in environment variables');
    }

    const url = `https://api.figma.com/v1/files/${config.fileId}`;
    const response = await fetch(url, {
      headers: {
        'X-Figma-Token': config.accessToken,
      },
    });

    if (!response.ok) {
      throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  }

  async fetchFigmaImages(nodeIds) {
    if (!config.accessToken || !config.fileId) {
      throw new Error('Missing FIGMA_ACCESS_TOKEN or FIGMA_FILE_ID in environment variables');
    }

    const url = `https://api.figma.com/v1/images/${config.fileId}?ids=${nodeIds.join(',')}&format=svg`;
    const response = await fetch(url, {
      headers: {
        'X-Figma-Token': config.accessToken,
      },
    });

    if (!response.ok) {
      throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  }

  extractDesignTokens(document) {
    console.log('🎨 Extracting design tokens...');
    
    const tokens = {
      colors: {},
      typography: {},
      spacing: {},
      shadows: {},
      borders: {},
    };

    const extractFromNode = (node) => {
      if (node.type === 'RECTANGLE' && node.fills) {
        // Extract colors
        node.fills.forEach(fill => {
          if (fill.type === 'SOLID' && fill.color) {
            const colorName = node.name.toLowerCase().replace(/\s+/g, '-');
            tokens.colors[colorName] = {
              r: Math.round(fill.color.r * 255),
              g: Math.round(fill.color.g * 255),
              b: Math.round(fill.color.b * 255),
              a: fill.color.a || 1,
            };
          }
        });
      }

      if (node.type === 'TEXT' && node.style) {
        // Extract typography
        const textName = node.name.toLowerCase().replace(/\s+/g, '-');
        tokens.typography[textName] = {
          fontSize: node.style.fontSize,
          fontFamily: node.style.fontFamily,
          fontWeight: node.style.fontWeight,
          lineHeight: node.style.lineHeightPx,
          letterSpacing: node.style.letterSpacing,
        };
      }

      if (node.type === 'FRAME' || node.type === 'GROUP') {
        // Extract spacing and layout
        if (node.layoutMode === 'HORIZONTAL' || node.layoutMode === 'VERTICAL') {
          const spacingName = node.name.toLowerCase().replace(/\s+/g, '-');
          tokens.spacing[spacingName] = {
            itemSpacing: node.itemSpacing,
            paddingLeft: node.paddingLeft,
            paddingRight: node.paddingRight,
            paddingTop: node.paddingTop,
            paddingBottom: node.paddingBottom,
          };
        }
      }

      // Recursively process child nodes
      if (node.children) {
        node.children.forEach(extractFromNode);
      }
    };

    extractFromNode(document);
    return tokens;
  }

  generateCSSTokens(tokens) {
    console.log('🎨 Generating CSS custom properties...');
    
    let css = ':root {\n';
    
    // Colors
    Object.entries(tokens.colors).forEach(([name, color]) => {
      const rgba = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
      css += `  --color-${name}: ${rgba};\n`;
    });
    
    // Typography
    Object.entries(tokens.typography).forEach(([name, typography]) => {
      css += `  --font-${name}-size: ${typography.fontSize}px;\n`;
      css += `  --font-${name}-family: ${typography.fontFamily};\n`;
      css += `  --font-${name}-weight: ${typography.fontWeight};\n`;
      if (typography.lineHeight) {
        css += `  --font-${name}-line-height: ${typography.lineHeight}px;\n`;
      }
      if (typography.letterSpacing) {
        css += `  --font-${name}-letter-spacing: ${typography.letterSpacing}px;\n`;
      }
    });
    
    // Spacing
    Object.entries(tokens.spacing).forEach(([name, spacing]) => {
      if (spacing.itemSpacing) {
        css += `  --spacing-${name}: ${spacing.itemSpacing}px;\n`;
      }
      if (spacing.paddingLeft) {
        css += `  --padding-${name}-left: ${spacing.paddingLeft}px;\n`;
      }
      if (spacing.paddingRight) {
        css += `  --padding-${name}-right: ${spacing.paddingRight}px;\n`;
      }
      if (spacing.paddingTop) {
        css += `  --padding-${name}-top: ${spacing.paddingTop}px;\n`;
      }
      if (spacing.paddingBottom) {
        css += `  --padding-${name}-bottom: ${spacing.paddingBottom}px;\n`;
      }
    });
    
    css += '}\n';
    
    const cssPath = path.join(config.tokensDir, 'figma-variables.css');
    fs.writeFileSync(cssPath, css);
    console.log(`✅ Generated CSS variables: ${cssPath}`);
  }

  generateTailwindConfig(tokens) {
    console.log('🎨 Generating Tailwind config...');
    
    const tailwindConfig = {
      theme: {
        extend: {
          colors: {},
          fontSize: {},
          spacing: {},
          boxShadow: {},
          borderWidth: {},
        },
      },
    };
    
    // Colors
    Object.entries(tokens.colors).forEach(([name, color]) => {
      const hex = this.rgbToHex(color.r, color.g, color.b);
      tailwindConfig.theme.extend.colors[name] = hex;
    });
    
    // Typography
    Object.entries(tokens.typography).forEach(([name, typography]) => {
      tailwindConfig.theme.extend.fontSize[name] = [
        `${typography.fontSize}px`,
        {
          lineHeight: typography.lineHeight ? `${typography.lineHeight}px` : '1',
          fontWeight: typography.fontWeight || 'normal',
          fontFamily: typography.fontFamily,
        },
      ];
    });
    
    // Spacing
    Object.entries(tokens.spacing).forEach(([name, spacing]) => {
      if (spacing.itemSpacing) {
        tailwindConfig.theme.extend.spacing[name] = `${spacing.itemSpacing}px`;
      }
    });
    
    const configPath = path.join(config.tokensDir, 'tailwind-figma.js');
    fs.writeFileSync(configPath, `export default ${JSON.stringify(tailwindConfig, null, 2)};`);
    console.log(`✅ Generated Tailwind config: ${configPath}`);
  }

  generateTypeScriptTypes(tokens) {
    console.log('🎨 Generating TypeScript types...');
    
    let types = `// Auto-generated types from Figma design tokens
export interface FigmaTokens {
  colors: {
${Object.keys(tokens.colors).map(name => `    '${name}': string;`).join('\n')}
  };
  typography: {
${Object.keys(tokens.typography).map(name => `    '${name}': string;`).join('\n')}
  };
  spacing: {
${Object.keys(tokens.spacing).map(name => `    '${name}': string;`).join('\n')}
  };
}

export const figmaTokens: FigmaTokens = {
  colors: {
${Object.entries(tokens.colors).map(([name, color]) => {
  const hex = this.rgbToHex(color.r, color.g, color.b);
  return `    '${name}': '${hex}';`;
}).join('\n')}
  },
  typography: {
${Object.keys(tokens.typography).map(name => `    '${name}': '${name}';`).join('\n')}
  },
  spacing: {
${Object.keys(tokens.spacing).map(name => `    '${name}': '${name}';`).join('\n')}
  },
};
`;
    
    const typesPath = path.join(config.tokensDir, 'figma-tokens.ts');
    fs.writeFileSync(typesPath, types);
    console.log(`✅ Generated TypeScript types: ${typesPath}`);
  }

  rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }

  async extractIcons(document) {
    console.log('🎨 Extracting icons...');
    
    const iconNodes = [];
    
    const findIconNodes = (node) => {
      if (node.name.toLowerCase().includes('icon') || node.name.toLowerCase().includes('ic_')) {
        iconNodes.push(node);
      }
      
      if (node.children) {
        node.children.forEach(findIconNodes);
      }
    };
    
    findIconNodes(document);
    
    if (iconNodes.length === 0) {
      console.log('📝 No icon nodes found. Make sure your icons are named with "icon" or "ic_" prefix.');
      return;
    }
    
    console.log(`🎨 Found ${iconNodes.length} icon nodes`);
    
    // Fetch SVG images for icons
    const nodeIds = iconNodes.map(node => node.id);
    const images = await this.fetchFigmaImages(nodeIds);
    
    // Generate icon components
    iconNodes.forEach(node => {
      const iconName = node.name
        .replace(/[^a-zA-Z0-9]/g, '')
        .replace(/icon|ic/gi, '')
        .replace(/^[a-z]/, (match) => match.toUpperCase());
      
      if (images.images[node.id]) {
        const svgUrl = images.images[node.id];
        this.generateIconComponent(iconName, svgUrl, node);
      }
    });
  }

  async generateIconComponent(iconName, svgUrl, node) {
    // Fetch SVG content
    const response = await fetch(svgUrl);
    const svgContent = await response.text();
    
    // Create React component
    const component = `import React from 'react';

interface ${iconName}IconProps {
  size?: number;
  className?: string;
  color?: string;
}

export const ${iconName}Icon: React.FC<${iconName}IconProps> = ({ 
  size = 24, 
  className = '', 
  color = 'currentColor' 
}) => {
  return (
    <div 
      className={\`inline-block \${className}\`} 
      style={{ width: size, height: size }}
      dangerouslySetInnerHTML={{ __html: \`${svgContent.replace(/`/g, '\\`')}\` }}
    />
  );
};

export default ${iconName}Icon;
`;
    
    const componentPath = path.join(config.iconsDir, `${iconName}Icon.tsx`);
    fs.writeFileSync(componentPath, component);
    console.log(`✅ Generated icon component: ${componentPath}`);
  }

  async sync() {
    try {
      console.log('🚀 Starting Figma sync...');
      
      if (!config.accessToken || !config.fileId) {
        console.log('❌ Missing Figma configuration. Please set FIGMA_ACCESS_TOKEN and FIGMA_FILE_ID in your environment variables.');
        console.log('📋 Setup steps:');
        console.log('   1. Get your access token from: https://www.figma.com/developers/api#access-tokens');
        console.log('   2. Get your file ID from the Figma file URL');
        console.log('   3. Add them to your env/env.development file');
        return;
      }
      
      // Fetch Figma file
      const figmaFile = await this.fetchFigmaFile();
      console.log(`📁 Connected to Figma file: ${figmaFile.name}`);
      
      // Extract design tokens
      const tokens = this.extractDesignTokens(figmaFile.document);
      
      // Generate outputs
      this.generateCSSTokens(tokens);
      this.generateTailwindConfig(tokens);
      this.generateTypeScriptTypes(tokens);
      
      // Extract icons
      await this.extractIcons(figmaFile.document);
      
      console.log('🎉 Figma sync completed successfully!');
      console.log('📝 Next steps:');
      console.log('   1. Import the CSS variables in your main CSS file');
      console.log('   2. Use the generated icon components in your React components');
      console.log('   3. Run this script again when you update your Figma designs');
      
    } catch (error) {
      console.error('❌ Error during Figma sync:', error.message);
      process.exit(1);
    }
  }
}

// CLI interface
const command = process.argv[2];

if (!command || command === 'sync') {
  const figma = new FigmaIntegration();
  figma.sync();
} else if (command === 'help') {
  console.log('📚 Figma Integration Commands:');
  console.log('  npm run figma:sync    - Sync design tokens and components from Figma');
  console.log('  npm run figma:help    - Show this help message');
} else {
  console.log('❌ Unknown command. Use "npm run figma:help" for available commands.');
}
