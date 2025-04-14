import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function convertLogo() {
  try {
    const svgPath = path.join(process.cwd(), 'public', 'logo', 'SVG', 'Asset 1.svg');
    const pngPath = path.join(process.cwd(), 'public', 'logo.png');

    // Convertir SVG a PNG
    await sharp(svgPath)
      .png()
      .toFile(pngPath);

    console.log('Logo convertido exitosamente a PNG');
  } catch (error) {
    console.error('Error al convertir el logo:', error);
  }
}

convertLogo(); 