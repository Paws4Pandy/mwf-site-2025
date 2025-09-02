// Image Optimization Script
// This script documents the images that need WebP conversion for optimal performance

const imagesToOptimize = [
  {
    file: '/i-dont-sell-mortgages.png',
    currentSize: '390.4 KiB',
    targetFormat: 'WebP',
    potentialSavings: '334.3 KiB',
    priority: 'critical - LCP element',
    dimensions: '576x80'
  },
  {
    file: '/room-main.jpg',
    currentSize: '669.6 KiB', 
    targetFormat: 'WebP',
    potentialSavings: '315.1 KiB',
    priority: 'high - hero background',
    dimensions: 'responsive'
  },
  {
    file: '/canada.png',
    currentSize: '173.9 KiB',
    targetFormat: 'WebP',
    potentialSavings: '121.1 KiB',
    priority: 'medium - footer logo',
    dimensions: '64x32'
  },
  {
    file: '/i-guard.png',
    currentSize: '74.5 KiB',
    targetFormat: 'WebP', 
    potentialSavings: '49.5 KiB',
    priority: 'high - hero element',
    dimensions: '768x120'
  },
  {
    file: '/andreina/andreina-mwf-lean.jpg',
    currentSize: '93.6 KiB',
    targetFormat: 'WebP',
    potentialSavings: '46.5 KiB',
    priority: 'high - hero photo',
    dimensions: '224x224'
  }
];

console.log('Images requiring WebP optimization:');
console.table(imagesToOptimize);

const totalCurrentSize = 1402.0; // KiB
const totalSavings = 866.4; // KiB
const percentSavings = ((totalSavings / totalCurrentSize) * 100).toFixed(1);

console.log(`\nTotal potential savings: ${totalSavings} KiB (${percentSavings}%)`);
console.log('Recommended action: Convert these images to WebP format using an image optimization tool.');

module.exports = { imagesToOptimize };