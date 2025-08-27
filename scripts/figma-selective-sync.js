#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../env/env.development') });

// Load Figma configuration
const figmaConfig = await import('../figma.config.js').then(m => m.default);

// Configuration with fallback to environment variables
const config = {
  accessToken: figmaConfig.api?.accessToken || process.env.FIGMA_ACCESS_TOKEN,
  fileId: figmaConfig.api?.fileId || process.env.FIGMA_FILE_ID,
  teamId: figmaConfig.api?.teamId || process.env.FIGMA_TEAM_ID,
  outputDir: path.join(__dirname, '../src/components/figma'),
  tokensDir: path.join(__dirname, '../src/styles/design-tokens'),
  iconsDir: path.join(__dirname, '../src/components/icons/figma'),
  selective: figmaConfig.selective || {},
};

class SelectiveFigmaSync {
  constructor() {
    this.ensureDirectories();
    this.selectedNodes = [];
    this.selectedComponents = [];
    this.selectedIcons = [];
  }

  ensureDirectories() {
    [config.outputDir, config.tokensDir, config.iconsDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`📁 Created directory: ${dir}`);
      }
    });
  }

  shouldSyncNode(node, parentName = '') {
    if (!config.selective.enabled) {
      return true; // Sync everything if selective mode is disabled
    }

    const fullName = parentName ? `${parentName}/${node.name}` : node.name;
    
    // Check specific node IDs (exact match)
    if (config.selective.specificNodes?.length > 0) {
      if (config.selective.specificNodes.includes(node.id)) {
        console.log(`  ✓ Matched by node ID: ${node.id} (${node.name})`);
        return true;
      }
    }

    // Check component names (partial match in full path)
    if (config.selective.componentNames?.length > 0) {
      if (config.selective.componentNames.some(name => 
        fullName.toLowerCase().includes(name.toLowerCase())
      )) {
        console.log(`  ✓ Matched by component name: ${fullName}`);
        return true;
      }
    }

    // Check icon names (partial match in full path)
    if (config.selective.iconNames?.length > 0) {
      if (config.selective.iconNames.some(name => 
        fullName.toLowerCase().includes(name.toLowerCase())
      )) {
        console.log(`  ✓ Matched by icon name: ${fullName}`);
        return true;
      }
    }

    // Check frame names (exact match)
    if (config.selective.includeFrames?.length > 0) {
      if (config.selective.includeFrames.includes(node.name)) {
        console.log(`  ✓ Matched by frame name: ${node.name}`);
        return true;
      }
    }

    // Check patterns
    if (config.selective.patterns?.icons?.length > 0) {
      for (const pattern of config.selective.patterns.icons) {
        const regex = new RegExp(pattern, 'i');
        if (regex.test(fullName)) {
          console.log(`  ✓ Matched by icon pattern: ${pattern} -> ${fullName}`);
          return true;
        }
      }
    }

    if (config.selective.patterns?.components?.length > 0) {
      for (const pattern of config.selective.patterns.components) {
        const regex = new RegExp(pattern, 'i');
        if (regex.test(fullName)) {
          console.log(`  ✓ Matched by component pattern: ${pattern} -> ${fullName}`);
          return true;
        }
      }
    }

    // If we have any selective criteria and none matched, don't sync
    const hasSelectiveCriteria = 
      config.selective.specificNodes?.length > 0 ||
      config.selective.componentNames?.length > 0 ||
      config.selective.iconNames?.length > 0 ||
      config.selective.includeFrames?.length > 0 ||
      config.selective.patterns?.icons?.length > 0 ||
      config.selective.patterns?.components?.length > 0;

    return !hasSelectiveCriteria; // Only sync if no criteria specified
  }

  async fetchFigmaFile() {
    if (!config.accessToken || !config.fileId) {
      throw new Error('Missing FIGMA_ACCESS_TOKEN or FIGMA_FILE_ID in environment variables');
    }

    console.log('🔗 Connecting to Figma...');
    const url = `https://api.figma.com/v1/files/${config.fileId}`;
    const response = await fetch(url, {
      headers: {
        'X-Figma-Token': config.accessToken,
      },
    });

    if (!response.ok) {
      throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`✅ Connected to Figma file: ${data.name}`);
    return data;
  }

  async fetchFigmaImages(nodeIds) {
    if (nodeIds.length === 0) {
      console.log('⚠️  No nodes selected for image export');
      return { images: {} };
    }

    console.log(`📥 Fetching images for ${nodeIds.length} nodes...`);
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

  extractComponents(node, parentName = '') {
    const components = [];
    const fullName = parentName ? `${parentName}/${node.name}` : node.name;

    // Always check children first (traverse the tree)
    if (node.children) {
      for (const child of node.children) {
        components.push(...this.extractComponents(child, fullName));
      }
    }

    // Check if this node should be synced
    if (this.shouldSyncNode(node, parentName)) {
      // Check if this is a component
      if (node.type === 'COMPONENT' || node.type === 'COMPONENT_SET') {
        components.push({
          id: node.id,
          name: node.name,
          fullName: fullName,
          type: node.type,
          description: node.description || '',
        });
      }

      // Check if this looks like an icon (any node that could be exported as SVG)
      if (node.type === 'INSTANCE' || 
          node.type === 'COMPONENT' ||
          node.type === 'FRAME' ||
          node.type === 'GROUP' ||
          node.name.toLowerCase().includes('icon')) {
        this.selectedIcons.push({
          id: node.id,
          name: node.name,
          fullName: fullName,
        });
      }
    }

    return components;
  }

  generateReactComponent(component) {
    const componentName = this.toPascalCase(component.name);
    const content = `import React from 'react';

export interface ${componentName}Props {
  className?: string;
  children?: React.ReactNode;
}

export const ${componentName}: React.FC<${componentName}Props> = ({ className, children, ...props }) => {
  return (
    <div className={\`figma-${this.toKebabCase(component.name)} \${className || ''}\`} {...props}>
      {children || '${component.name} Component'}
    </div>
  );
};

export default ${componentName};
`;

    const filePath = path.join(config.outputDir, `${componentName}.tsx`);
    fs.writeFileSync(filePath, content);
    return filePath;
  }

  async generateIconComponent(icon, svgUrl) {
    const iconName = this.toPascalCase(icon.name) + 'Icon';
    
    try {
      // Fetch SVG content
      const svgResponse = await fetch(svgUrl);
      const svgContent = await svgResponse.text();
      
      // Extract SVG path data (simplified extraction)
      const pathMatch = svgContent.match(/<path[^>]*d="([^"]+)"/);
      const pathData = pathMatch ? pathMatch[1] : '';

      const content = `import React from 'react';

export interface ${iconName}Props {
  size?: number;
  className?: string;
  color?: string;
}

export const ${iconName}: React.FC<${iconName}Props> = ({ 
  size = 24, 
  className = '', 
  color = 'currentColor',
  ...props 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="${pathData}"
        fill={color}
      />
    </svg>
  );
};

export default ${iconName};
`;

      const filePath = path.join(config.iconsDir, `${iconName}.tsx`);
      fs.writeFileSync(filePath, content);
      return filePath;
    } catch (error) {
      console.error(`❌ Failed to generate icon ${icon.name}: ${error.message}`);
      return null;
    }
  }

  toPascalCase(str) {
    return str
      .replace(/[^a-zA-Z0-9]+/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
  }

  toKebabCase(str) {
    return str
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .toLowerCase();
  }

  async sync() {
    try {
      console.log('🚀 Starting selective Figma sync...');
      
      // Show selective sync configuration
      if (config.selective.enabled) {
        console.log('\n📋 Selective sync configuration:');
        if (config.selective.specificNodes?.length > 0) {
          console.log(`  • Specific nodes: ${config.selective.specificNodes.join(', ')}`);
        }
        if (config.selective.componentNames?.length > 0) {
          console.log(`  • Component names: ${config.selective.componentNames.join(', ')}`);
        }
        if (config.selective.iconNames?.length > 0) {
          console.log(`  • Icon names: ${config.selective.iconNames.join(', ')}`);
        }
        if (config.selective.includeFrames?.length > 0) {
          console.log(`  • Include frames: ${config.selective.includeFrames.join(', ')}`);
        }
        console.log('');
      } else {
        console.log('ℹ️  Selective sync is disabled - syncing all components');
      }

      // Fetch Figma file
      const figmaFile = await this.fetchFigmaFile();
      
      // Clean up old files if configured
      if (config.sync?.cleanBeforeSync) {
        console.log('🧹 Cleaning up old generated files...');
        [config.outputDir, config.iconsDir].forEach(dir => {
          if (fs.existsSync(dir)) {
            fs.readdirSync(dir).forEach(file => {
              if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                fs.unlinkSync(path.join(dir, file));
              }
            });
          }
        });
      }

      // Extract components based on selection criteria
      console.log('\n🔍 Scanning for components to sync...');
      this.selectedComponents = this.extractComponents(figmaFile.document);
      
      console.log(`\n📊 Summary:`);
      console.log(`  • Selected ${this.selectedComponents.length} components`);
      console.log(`  • Selected ${this.selectedIcons.length} icons`);

      if (this.selectedComponents.length === 0 && this.selectedIcons.length === 0) {
        console.log('\n⚠️  No components matched your selection criteria!');
        console.log('💡 Tip: Update figma.config.js with specific component names or patterns');
        return;
      }

      // Generate React components
      if (this.selectedComponents.length > 0) {
        console.log('\n🔨 Generating React components...');
        for (const component of this.selectedComponents) {
          const filePath = this.generateReactComponent(component);
          console.log(`  ✅ Generated: ${path.basename(filePath)}`);
        }
      }

      // Generate icon components
      if (this.selectedIcons.length > 0) {
        console.log('\n🎨 Generating icon components...');
        const iconIds = this.selectedIcons.map(icon => icon.id);
        const images = await this.fetchFigmaImages(iconIds);
        
        for (const icon of this.selectedIcons) {
          const svgUrl = images.images?.[icon.id];
          if (svgUrl) {
            const filePath = await this.generateIconComponent(icon, svgUrl);
            if (filePath) {
              console.log(`  ✅ Generated: ${path.basename(filePath)}`);
            }
          }
        }
      }

      // Generate index files
      this.generateIndexFiles();

      console.log('\n🎉 Selective Figma sync completed successfully!');
      console.log('\n📝 Next steps:');
      console.log('   1. Review the generated components');
      console.log('   2. Update figma.config.js to refine your selection');
      console.log('   3. Run npm run figma:selective to sync again');

    } catch (error) {
      console.error('❌ Sync failed:', error.message);
      process.exit(1);
    }
  }

  generateIndexFiles() {
    // Generate components index
    if (this.selectedComponents.length > 0) {
      const componentExports = this.selectedComponents
        .map(c => {
          const name = this.toPascalCase(c.name);
          return `export { ${name} } from './${name}';`;
        })
        .join('\n');
      
      fs.writeFileSync(
        path.join(config.outputDir, 'index.ts'),
        `// Auto-generated component exports\n${componentExports}\n`
      );
    }

    // Generate icons index
    if (this.selectedIcons.length > 0) {
      const iconExports = this.selectedIcons
        .map(i => {
          const name = this.toPascalCase(i.name) + 'Icon';
          return `export { ${name} } from './${name}';`;
        })
        .join('\n');
      
      fs.writeFileSync(
        path.join(config.iconsDir, 'index.ts'),
        `// Auto-generated icon exports\n${iconExports}\n`
      );
    }
  }
}

// Run the sync
const syncer = new SelectiveFigmaSync();
syncer.sync();