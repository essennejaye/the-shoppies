// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import '@testing-library/jest-dom/extend-expect';
// import SearchedMovies from '..';
// import SavedMovies from '../../SavedMovies';

// const ActualSavedMovies = jest.requireActual('SavedMovies');
// // import AlertModal from '../../AlertModal';

// jest.mock('SavedMovies', () => 
//   <div data-testid='savedmovies'>
//     <ActualSavedMovies />
//   </div>
// )

// describe('SearchedMovies component', () => {
//   it('renders alert if input field is empty', () => {
//      render(<SearchedMovies />)
//     userEvent.click(screen.getByText('Submit Search'))
//     expect(screen.getByText('Please enter a search term!')).toBeInTheDocument()
//   });

// })