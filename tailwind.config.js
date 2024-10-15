/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theaterBlack: '#1c1c1c', // Dark black for background
        theaterRed: '#e50914',   // Bright red for accents
        theaterGray: '#333333',  // Medium gray for secondary elements
        lightGray: '#f3f3f3',    // Light gray for text and icons
      },
    },
  },
  plugins: [],
}

