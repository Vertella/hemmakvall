const fs = require('fs');
const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');
const fetch = require('node-fetch'); // If you need to fetch data from an API

const generateSitemap = async () => {
  const hostname = 'https://vertella.github.io/hemmakvall/';

  // Example: Fetch a list of movies from your API
  // Replace this with your actual data fetching logic
  // For demonstration, we'll use a static list
  const movies = [
    { id: 1, title: 'Movie One' },
    { id: 2, title: 'Movie Two' },
    // Add more movies or fetch from your API
  ];

  const links = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/favorites', changefreq: 'weekly', priority: 0.8 },
    // Dynamic URLs
    ...movies.map(movie => ({
      url: `/movie/${movie.id}`,
      changefreq: 'weekly',
      priority: 0.7,
    })),
  ];

  const stream = new SitemapStream({ hostname });
  const xmlString = await streamToPromise(Readable.from(links).pipe(stream)).then(data => data.toString());

  fs.writeFileSync('public/sitemap.xml', xmlString);
  console.log('sitemap.xml generated successfully.');
};

generateSitemap().catch(err => {
  console.error('Error generating sitemap.xml:', err);
});
