import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ListPage from './ListPage';
import axios from 'axios';

// Mock axios for API requests
jest.mock('axios');

describe('ListPage Component', () => {
  const mockStore = configureStore([]);
  const initialState = {
    movies: [],
  };
  const store = mockStore(initialState);

  beforeEach(() => {
    store.clearActions();
  });

  it('renders ListPage component', () => {
    render(
      <Provider store={store}>
        <ListPage />
      </Provider>
    );

    // Add your assertions here
    expect(screen.getByText('Upcoming Movies')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search for movies by title...')).toBeInTheDocument();
  });

  it('handles search input and filters movies', async () => {
    // Mock an API response
    const mockResponse = {
      data: {
        results: [{ id: 1, title: 'Movie 1' }, { id: 2, title: 'Movie 2' }],
      },
    };
    axios.request.mockResolvedValue(mockResponse);

    render(
      <Provider store={store}>
        <ListPage />
      </Provider>
    );

    // Type a search query
    fireEvent.change(screen.getByPlaceholderText('Search for movies by title...'), {
      target: { value: 'Movie 1' },
    });

    // Wait for the component to re-render with filtered movies
    await waitFor(() => {
      expect(screen.getByText('Movie 1')).toBeInTheDocument();
      expect(screen.queryByText('Movie 2')).not.toBeInTheDocument();
    });
  });

  it('loads more movies when scrolling', async () => {
    // Mock an API response
    const mockResponse = {
      data: {
        results: [{ id: 1, title: 'Movie 1' }, { id: 2, title: 'Movie 2' }],
      },
    };
    axios.request.mockResolvedValue(mockResponse);

    render(
      <Provider store={store}>
        <ListPage />
      </Provider>
    );

    // Scroll to trigger loading more movies
    fireEvent.scroll(window, { target: { scrollY: 2000 } });

    // Wait for the component to re-render with more movies
    await waitFor(() => {
      expect(screen.getByText('Movie 1')).toBeInTheDocument();
      expect(screen.getByText('Movie 2')).toBeInTheDocument();
    });
  });
});
