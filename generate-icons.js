import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Icon sizes for different densities
const sizes = {
  mdpi: 48,
  hdpi: 72,
  xhdpi: 96,
  xxhdpi: 144,
  xxxhdpi: 192
};

function generateIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background color (dark like our design)
  ctx.fillStyle = '#111827';
  ctx.fillRect(0, 0, size, size);

  // Foreground "B" text
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${size * 0.6}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('B', size / 2, size / 2);

  return canvas.toBuffer('image/png');
}

// Generate icons for all densities
Object.entries(sizes).forEach(([density, size]) => {
  const buffer = generateIcon(size);
  const dir = path.join(__dirname, '..', 'android', 'app', 'src', 'main', 'res', `mipmap-${density}`);
  const filePath = path.join(dir, 'ic_launcher.png');
  const roundFilePath = path.join(dir, 'ic_launcher_round.png');

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(filePath, buffer);
  fs.writeFileSync(roundFilePath, buffer); // Same as launcher for now
  console.log(`Generated ${density} icon (${size}x${size})`);
});

console.log('All icons generated successfully!');