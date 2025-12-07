const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const images = [
  // Logo
  { url: 'https://clubcaddycarts.com/wp-content/uploads/2025/03/icon-transparent.png', filename: 'logo.png', folder: '' },

  // Horizontal images (2)
  { url: 'https://clubcaddycarts.com/wp-content/uploads/2025/03/caddy-cart01.jpg', filename: 'caddy-cart01.jpg', folder: 'products' },
  { url: 'https://clubcaddycarts.com/wp-content/uploads/2025/03/caddy-cart03.jpg', filename: 'caddy-cart14.jpg', folder: 'products' },

  // Carousel images (get full size versions)
  { url: 'https://clubcaddycarts.com/wp-content/uploads/2025/03/caddy-cart02-1.jpg', filename: 'caddy-cart02.jpg', folder: 'products' },
  { url: 'https://clubcaddycarts.com/wp-content/uploads/2025/03/caddy-cart03-1.jpg', filename: 'caddy-cart03.jpg', folder: 'products' },
  { url: 'https://clubcaddycarts.com/wp-content/uploads/2025/03/caddy-cart04.jpg', filename: 'caddy-cart04.jpg', folder: 'products' },
  { url: 'https://clubcaddycarts.com/wp-content/uploads/2025/03/caddy-cart05.jpg', filename: 'caddy-cart05.jpg', folder: 'products' },
  { url: 'https://clubcaddycarts.com/wp-content/uploads/2025/03/caddy-cart06.jpg', filename: 'caddy-cart06.jpg', folder: 'products' },
  { url: 'https://clubcaddycarts.com/wp-content/uploads/2025/03/caddy-cart07.jpg', filename: 'caddy-cart07.jpg', folder: 'products' },
  { url: 'https://clubcaddycarts.com/wp-content/uploads/2025/03/caddy-cart08.jpg', filename: 'caddy-cart08.jpg', folder: 'products' },
  { url: 'https://clubcaddycarts.com/wp-content/uploads/2025/03/caddy-cart09.jpg', filename: 'caddy-cart09.jpg', folder: 'products' },
  { url: 'https://clubcaddycarts.com/wp-content/uploads/2025/03/caddy-cart10.jpg', filename: 'caddy-cart10.jpg', folder: 'products' },
  { url: 'https://clubcaddycarts.com/wp-content/uploads/2025/03/caddy-cart11.jpg', filename: 'caddy-cart11.jpg', folder: 'products' },
  { url: 'https://clubcaddycarts.com/wp-content/uploads/2025/03/caddy-cart12.jpg', filename: 'caddy-cart12.jpg', folder: 'products' },
  { url: 'https://clubcaddycarts.com/wp-content/uploads/2025/03/caddy-cart13.jpg', filename: 'caddy-cart13.jpg', folder: 'products' },

  // Premium badge
  { url: 'https://clubcaddycarts.com/wp-content/uploads/2025/03/premium-badge.png', filename: 'premium-badge.png', folder: '' },
];

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(filepath);
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✓ Downloaded: ${filepath}`);
          resolve();
        });
      } else {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function downloadAllImages() {
  console.log('Starting image download...\n');

  for (const image of images) {
    const folder = image.folder ? path.join('public', 'images', image.folder) : path.join('public', 'images');

    // Create folder if it doesn't exist
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    const filepath = path.join(folder, image.filename);

    try {
      await downloadImage(image.url, filepath);
    } catch (error) {
      console.error(`✗ Error downloading ${image.filename}:`, error.message);
    }
  }

  console.log('\n✓ All images downloaded successfully!');
}

downloadAllImages();
