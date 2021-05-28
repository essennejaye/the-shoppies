import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event'
import AlertModal from '..';

const handleClose = jest.fn()

describe('AlertModal component', () => {
  it('renders modal and children', () => {
    render(<AlertModal />);
  });
  
  it('matches snapshot DOM node structure', () => {
    const { asFragment } = render(<AlertModal />);
    expect(asFragment()).toMatchSnapshot();
  });
  
  // Act
  it('calls onClose handler', () => {
    render(
      <AlertModal onClose={handleClose}>
      </AlertModal>
    )
    //Arrange
    const closeBtnIcon = screen.getByLabelText(/close/i);
    const closeBtn = screen.getByText(/close/i)
    userEvent.click(closeBtnIcon);
    userEvent.click(closeBtn);
    // screen.debug();
    // Assert
    expect(handleClose).toHaveBeenCalledTimes(2);
  });
})