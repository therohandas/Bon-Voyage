/**
 * Script to download all location images to local storage
 * Run with: node scripts/download-images.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const locationsPath = path.join(__dirname, '../src/data/locations.json');
const outputDir = path.join(__dirname, '../public/images/locations');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Read locations
const locations = JSON.parse(fs.readFileSync(locationsPath, 'utf8'));

console.log(`Found ${locations.length} locations`);

// Function to download an image
function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        // Skip if file already exists
        if (fs.existsSync(filepath)) {
            console.log(`  ⏭️  Skipped (exists): ${path.basename(filepath)}`);
            resolve(true);
            return;
        }

        const protocol = url.startsWith('https') ? https : http;

        const request = protocol.get(url, {
            timeout: 15000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        }, (response) => {
            // Handle redirects
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                downloadImage(response.headers.location, filepath)
                    .then(resolve)
                    .catch(reject);
                return;
            }

            if (response.statusCode !== 200) {
                reject(new Error(`HTTP ${response.statusCode}`));
                return;
            }

            const fileStream = fs.createWriteStream(filepath);
            response.pipe(fileStream);

            fileStream.on('finish', () => {
                fileStream.close();
                console.log(`  ✅ Downloaded: ${path.basename(filepath)}`);
                resolve(true);
            });

            fileStream.on('error', (err) => {
                fs.unlink(filepath, () => { }); // Delete partial file
                reject(err);
            });
        });

        request.on('error', reject);
        request.on('timeout', () => {
            request.destroy();
            reject(new Error('Timeout'));
        });
    });
}

// Process locations sequentially to avoid overwhelming servers
async function downloadAll() {
    let success = 0;
    let skipped = 0;
    let failed = 0;
    const failures = [];

    for (let i = 0; i < locations.length; i++) {
        const loc = locations[i];
        const filename = `${loc.slug}.jpg`;
        const filepath = path.join(outputDir, filename);

        console.log(`[${i + 1}/${locations.length}] ${loc.name?.en || loc.slug}`);

        if (!loc.image) {
            console.log(`  ⚠️  No image URL`);
            failed++;
            failures.push({ slug: loc.slug, reason: 'No URL' });
            continue;
        }

        try {
            const existed = fs.existsSync(filepath);
            await downloadImage(loc.image, filepath);
            if (existed) skipped++;
            else success++;
        } catch (err) {
            console.log(`  ❌ Failed: ${err.message}`);
            failed++;
            failures.push({ slug: loc.slug, reason: err.message, url: loc.image });
        }

        // Small delay to be polite to servers
        await new Promise(r => setTimeout(r, 200));
    }

    console.log('\n========== Summary ==========');
    console.log(`✅ Downloaded: ${success}`);
    console.log(`⏭️  Skipped (existed): ${skipped}`);
    console.log(`❌ Failed: ${failed}`);

    if (failures.length > 0) {
        console.log('\nFailed downloads:');
        failures.forEach(f => console.log(`  - ${f.slug}: ${f.reason}`));
    }
}

downloadAll().catch(console.error);
