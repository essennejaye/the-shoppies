import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import SearchedMovies from '..';
import { MockedProvider } from '@apollo/client/testing';

beforeAll(() => jest.spyOn(window, 'fetch'))

// const mocks = [];
describe('SearchedMovies component', () => {
  it('renders without error', () => {
    render(
      <MockedProvider>
        <SearchedMovies />
      </MockedProvider>
    );
    expect(screen.getByPlaceholderText('Search for a movie or tv show by name')).toBeInTheDocument();
  });

  it("matches snapshot DOM node structure", () => {
    const { asFragment } = render(
      <MockedProvider>
        <SearchedMovies />
      </MockedProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders modal error alert for empty input field', () => {
    const searchInput = '';
    render(
      <MockedProvider>
        <SearchedMovies searchInput={searchInput} />
      </MockedProvider>
    );
    userEvent.click(screen.getByRole('button', { name: /submit search/i }))
    expect(screen.getByText('Please enter a search term!')).toBeInTheDocument()
    screen.debug();
  });

  // it('renders modal error alert for invalid input field', async () => {
  //   const searchInput = 'kgjihor';
  //   render(
  //     <MockedProvider>
  //       <SearchedMovies searchInput={searchInput} />
  //     </MockedProvider>
  //   )
  //   window.fetch.mockResolvedValueOnce({
  //     ok: true,
  //     json: async () => ({ success: true }),
  //   });

  //   userEvent.click(screen.getByRole('button', { name: /submit search/i }))
  //   expect(window.fetch).toHaveBeenLastCalledWith(
  //     '/'
      
  //   )
  //   // expect(screen.getByText('Please enter a search term!')).toBeInTheDocument()
  // });
})


