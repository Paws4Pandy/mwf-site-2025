#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const ICONS_DIR = path.join(__dirname, '../src/components/icons/icons');
const TEMPLATE_DIR = path.join(__dirname, '../src/components/icons/templates');

// Ensure directories exist
if (!fs.existsSync(ICONS_DIR)) {
  fs.mkdirSync(ICONS_DIR, { recursive: true });
}

if (!fs.existsSync(TEMPLATE_DIR)) {
  fs.mkdirSync(TEMPLATE_DIR, { recursive: true });
}

// Icon component template
const createIconComponent = (iconName, svgContent) => {
  const componentName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
  
  return `import React from 'react';
import { IconProps } from '../Icon';

export const ${componentName}Icon: React.FC<IconProps> = ({ 
  size = 24, 
  className, 
  color = "currentColor",
  strokeWidth = 2
}) => (
  ${svgContent}
);

export default ${componentName}Icon;
`;
};

// Process Figma React components
const processFigmaComponents = () => {
  console.log('🚀 Processing Figma React components...');
  
  // Look for Figma component files
  const figmaFiles = fs.readdirSync(ICONS_DIR)
    .filter(file => file.includes('figma') || file.includes('Figma'))
    .filter(file => file.endsWith('.tsx') || file.endsWith('.jsx'));
  
  if (figmaFiles.length === 0) {
    console.log('📁 No Figma component files found. Please export your Figma components first.');
    console.log('📋 Steps to export from Figma:');
    console.log('   1. Select your icon component in Figma');
    console.log('   2. Right-click → Copy/Paste → Copy as React');
    console.log('   3. Paste into a .tsx file in src/components/icons/icons/');
    console.log('   4. Run this script again');
    return;
  }
  
  figmaFiles.forEach(file => {
    const filePath = path.join(ICONS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract component name from filename
    const iconName = path.basename(file, path.extname(file))
      .replace(/[Ff]igma|[Ii]con/g, '')
      .toLowerCase();
    
    // Create optimized component
    const optimizedComponent = createIconComponent(iconName, content);
    const outputPath = path.join(ICONS_DIR, `${iconName}.tsx`);
    
    fs.writeFileSync(outputPath, optimizedComponent);
    console.log(`✅ Created: ${iconName}.tsx`);
  });
  
  console.log('\n🎉 Figma components processed successfully!');
  console.log('📝 You can now use them with: <Icon name="${figmaFiles[0].replace(/[Ff]igma|[Ii]con/g, '').toLowerCase()}" />');
};

// Create icon index file
const createIconIndex = () => {
  const iconFiles = fs.readdirSync(ICONS_DIR)
    .filter(file => file.endsWith('.tsx') && !file.includes('DefaultIcon'))
    .map(file => path.basename(file, '.tsx'));
  
  const indexContent = `// Auto-generated icon index
${iconFiles.map(name => `export { default as ${name.charAt(0).toUpperCase() + name.slice(1)}Icon } from './${name}';`).join('\n')}

export { default as DefaultIcon } from './DefaultIcon';
`;

  fs.writeFileSync(path.join(ICONS_DIR, 'index.ts'), indexContent);
  console.log('📚 Created icon index file');
};

// Main execution
try {
  processFigmaComponents();
  createIconIndex();
} catch (error) {
  console.error('❌ Error processing Figma components:', error.message);
  process.exit(1);
}


