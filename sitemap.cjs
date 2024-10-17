const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

// Fetch environment variables
const API_KEY = process.env.VITE_TMDB_API_KEY;
const BASE_URL = process.env.VITE_BASE_URL;

// Fetch popular movies for dynamic URLs
async function fetchPopularMovies() {
  const response = await axios.get(`${BASE_URL}/movie/popular`, {
    params: { api_key: API_KEY },
  });
  return response.data.results;
}

async function generateSitemap() {
  const movies = await fetchPopularMovies();
  const sitemap = new SitemapStream({ hostname: 'https://hemmakväll.com' });

  // Write sitemap to a file
  const writeStream = createWriteStream(path.join(__dirname, 'public', 'sitemap.xml'));
  sitemap.pipe(writeStream);

  // Add static routes
  sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });
  sitemap.write({ url: '/search', changefreq: 'weekly', priority: 0.8 });
  sitemap.write({ url: '/favorites', changefreq: 'weekly', priority: 0.7 });

  // Add dynamic routes for movies
  movies.forEach((movie) => {
    sitemap.write({ url: `/movie/${movie.id}`, changefreq: 'weekly', priority: 0.9 });
  });

  // End the stream
  sitemap.end();

  // Wait for the sitemap to be fully generated
  await streamToPromise(sitemap);
  console.log('Sitemap generated and saved to public/sitemap.xml');
}

generateSitemap().catch((error) => {
  console.error('Error generating sitemap:', error);
});
