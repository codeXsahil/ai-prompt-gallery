import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load env vars
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID
};

// Polyfill for fetch if needed (Node 18+ has native fetch)
// global.fetch = fetch; 

async function generateSitemap() {
    console.log("Starting sitemap generation...");

    if (!firebaseConfig.apiKey) {
        console.error("Error: Firebase config missing. Check .env file.");
        process.exit(1);
    }

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    try {
        const artworksRef = collection(db, "artworks");
        const snapshot = await getDocs(artworksRef);

        const baseUrl = "https://promptgallery.store";
        const currentDate = new Date().toISOString();

        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/privacy</loc>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${baseUrl}/terms</loc>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>`;

        snapshot.forEach((doc) => {
            const data = doc.data();
            // Only include approved or pending (if you want them indexed)
            // Assuming we want everything indexed for now based on user request "go hard"
            sitemap += `
  <url>
    <loc>${baseUrl}/#/artwork/${doc.id}</loc>
    <lastmod>${data.createdAt?.seconds ? new Date(data.createdAt.seconds * 1000).toISOString() : currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
        });

        sitemap += `
</urlset>`;

        const publicDir = path.join(__dirname, "../public");
        fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap);
        console.log(`Sitemap generated successfully at ${path.join(publicDir, "sitemap.xml")}`);
        console.log(`Total URLs: ${snapshot.size + 3}`);

    } catch (error) {
        console.error("Error generating sitemap:", error);
        process.exit(1);
    }
}

generateSitemap();
