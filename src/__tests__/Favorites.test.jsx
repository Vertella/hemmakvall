// Favorites.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import Favorites from '../components/Favorites';
import { removeFavorite } from '../features/movies/favoritesSlice';

const mockStore = configureMockStore([]);

describe('Favorites Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      favorites: {
        favoritesList: [
          {
            id: 1,
            title: 'Inception',
            release_date: '2010-07-16',
            poster_path: '/inception.jpg',
          },
          {
            id: 2,
            title: 'The Matrix',
            release_date: '1999-03-31',
            poster_path: null, // Testing movie without poster
          },
        ],
      },
    });

    store.dispatch = jest.fn();
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <Router>
          <Favorites />
        </Router>
      </Provider>
    );

  test('renders favorites list', () => {
    renderComponent();

    // Check for movie titles
    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByText('The Matrix')).toBeInTheDocument();

    // Check for release years
    expect(screen.getByText('2010')).toBeInTheDocument();
    expect(screen.getByText('1999')).toBeInTheDocument();

    // Check for poster images
    expect(screen.getByAltText('Inception')).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/w200/inception.jpg'
    );
    expect(screen.getByAltText('The Matrix')).toHaveAttribute(
      'src',
      'https://via.placeholder.com/200x300?text=No+Image'
    );
  });

  test('navigates to movie detail page on click', () => {
    renderComponent();

    const movieLink = screen.getByText('Inception').closest('a');
    expect(movieLink).toHaveAttribute('href', '/movies/1');
  });

  test('dispatches removeFavorite action on button click', () => {
    renderComponent();

    const removeButtons = screen.getAllByLabelText('Remove from Favorites');
    expect(removeButtons).toHaveLength(2);

    // Click the first remove button
    fireEvent.click(removeButtons[0]);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(removeFavorite(1));
  });
});
