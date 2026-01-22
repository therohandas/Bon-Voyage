/**
 * Download Location Images Script
 * Downloads all images from URLs in locations.json and saves locally
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const locationsPath = path.join(__dirname, '../src/data/locations.json');
const outputDir = path.join(__dirname, '../public/images/locations');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Read locations
const locations = JSON.parse(fs.readFileSync(locationsPath, 'utf8'));

console.log(`Found ${locations.length} locations to process`);

// Helper to follow redirects and download
function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http;

        const request = (currentUrl, redirectCount = 0) => {
            if (redirectCount > 5) {
                reject(new Error('Too many redirects'));
                return;
            }

            protocol.get(currentUrl, (response) => {
                // Handle redirects
                if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                    let redirectUrl = response.headers.location;
                    if (!redirectUrl.startsWith('http')) {
                        const urlObj = new URL(currentUrl);
                        redirectUrl = `${urlObj.protocol}//${urlObj.host}${redirectUrl}`;
                    }
                    request(redirectUrl, redirectCount + 1);
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
                    resolve();
                });
                fileStream.on('error', reject);
            }).on('error', reject);
        };

        request(url);
    });
}

// Process all locations
async function downloadAll() {
    let success = 0;
    let failed = 0;
    const failedUrls = [];

    for (const loc of locations) {
        const slug = loc.slug;
        const imageUrl = loc.image;
        const filename = `${slug}.jpg`;
        const filepath = path.join(outputDir, filename);

        // Skip if already downloaded
        if (fs.existsSync(filepath)) {
            console.log(`✓ Skip (exists): ${slug}`);
            success++;
            continue;
        }

        try {
            console.log(`↓ Downloading: ${slug}...`);
            await downloadImage(imageUrl, filepath);
            console.log(`✓ Downloaded: ${slug}`);
            success++;
        } catch (error) {
            console.log(`✗ Failed: ${slug} - ${error.message}`);
            failedUrls.push({ slug, url: imageUrl, error: error.message });
            failed++;
        }

        // Small delay to avoid rate limiting
        await new Promise(r => setTimeout(r, 200));
    }

    console.log(`\n=== Download Complete ===`);
    console.log(`Success: ${success}`);
    console.log(`Failed: ${failed}`);

    if (failedUrls.length > 0) {
        console.log(`\nFailed URLs:`);
        failedUrls.forEach(f => console.log(`  - ${f.slug}: ${f.url}`));

        // Save failed URLs to file for manual handling
        fs.writeFileSync(
            path.join(__dirname, 'failed-downloads.json'),
            JSON.stringify(failedUrls, null, 2)
        );
    }
}

downloadAll();
