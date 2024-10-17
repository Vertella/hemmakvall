# Hemmakvälls Filmbibliotek

This application let's you browse, search and view movies. You can also save them to your favorites, that will be saved between reloads of the page. 

## Features
- Search for movies using the movie database API.
- View detailed information about each movie.
- Add or remove movies from your favorites list.
- Display popular movies upon page load before searching.
- Responsive design with Tailwind CSS.
- Redux state management for handling movie data and favorites.
- SEO Optimization implemented by adding metatags, sitemaps and robots.txt.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Redux**: State management library for JavaScript apps.
- **Redux Toolkit**: Official, recommended way to write Redux logic.
- **React Router**: Declarative routing for React.js.
- **Cypress**: End-to-end testing framework.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **React-Router-Dom**: For client-side routing.

## Cypress Tests
- Rendering Favorites List:
    Verifies that the component correctly displays the list of favorite movies.
    Checks that the movie titles are rendered properly.
    Asserts that the correct release years are displayed for each movie.
    Ensures that the appropriate poster images are shown, including a placeholder for movies without a poster.

- Navigation to Movie Detail Page:
    Confirms that clicking on a movie title navigates to the correct detail page.
    Checks the href attribute of the link to ensure it corresponds to the expected movie ID.

- Removing a Favorite Movie:
    Tests that the component dispatches the removeFavorite action when the corresponding button is clicked.
    Ensures that the correct movie ID is passed to the action, confirming that the correct movie is being removed from the favorites list.

## Installation

1. Clone the repository:

   git clone https://github.com/Vertella/hemmakvall.git
   cd your-repo-name

2. Install dependencies:
    npm install

3. To start the application, run:
    npm start
You can then view the application in your browser at http://localhost:5173.

## Running Tests
To run the tests, use:
    npm test

For end-to-end testing with Cypress, run:
npx cypress open
