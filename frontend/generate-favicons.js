const sharp = require('sharp');
const fs = require('fs');

// Read the SVG file
const svgBuffer = fs.readFileSync('favicon.svg');

// Generate favicon.png (32x32)
sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile('favicon.png')
    .then(() => console.log('Generated favicon.png'))
    .catch(err => console.error('Error generating favicon.png:', err));

// Generate apple-touch-icon.png (180x180)
sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile('apple-touch-icon.png')
    .then(() => console.log('Generated apple-touch-icon.png'))
    .catch(err => console.error('Error generating apple-touch-icon.png:', err)); 