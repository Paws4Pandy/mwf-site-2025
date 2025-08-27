#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../env/env.development') });

const config = {
  accessToken: process.env.FIGMA_ACCESS_TOKEN,
  fileId: process.env.FIGMA_FILE_ID,
};

async function fetchFigmaFile() {
  const url = `https://api.figma.com/v1/files/${config.fileId}`;
  const response = await fetch(url, {
    headers: { 'X-Figma-Token': config.accessToken },
  });

  if (!response.ok) {
    throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

function exploreNodes(node, depth = 0, path = '') {
  const indent = '  '.repeat(depth);
  const currentPath = path ? `${path} > ${node.name}` : node.name;
  
  console.log(`${indent}📁 ${node.name} (${node.type}) [ID: ${node.id}]`);
  
  // Show if it's an icon or component
  if (node.name.toLowerCase().includes('icon')) {
    console.log(`${indent}   🎨 ICON DETECTED`);
  }
  if (node.type === 'COMPONENT' || node.type === 'COMPONENT_SET') {
    console.log(`${indent}   🔧 COMPONENT DETECTED`);
  }

  // Recursively explore children
  if (node.children && depth < 4) { // Limit depth to avoid too much output
    for (const child of node.children) {
      exploreNodes(child, depth + 1, currentPath);
    }
  } else if (node.children && depth >= 4) {
    console.log(`${indent}  ... (${node.children.length} more children - depth limit reached)`);
  }
}

async function exploreFigmaFile() {
  try {
    console.log('🔍 Exploring your Figma file structure...\n');
    
    const figmaFile = await fetchFigmaFile();
    console.log(`📄 File: ${figmaFile.name}\n`);
    
    console.log('📋 File Structure:');
    console.log('==================');
    
    // Explore each page
    for (const page of figmaFile.document.children) {
      console.log(`\n📄 PAGE: ${page.name}`);
      console.log('─'.repeat(50));
      
      for (const child of page.children) {
        exploreNodes(child);
      }
    }
    
    console.log('\n🎯 To target specific items:');
    console.log('1. Copy any ID from above to specificNodes in figma.config.js');
    console.log('2. Copy component/icon names to componentNames or iconNames');
    console.log('3. Use frame names in includeFrames');
    
  } catch (error) {
    console.error('❌ Failed to explore Figma file:', error.message);
  }
}

exploreFigmaFile();