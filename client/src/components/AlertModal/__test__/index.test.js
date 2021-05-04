import React from 'react';
import { render,cleanup} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AlertModal from '..';

afterEach(cleanup);

describe('AlertModal component', () => {
  // First test
  it('renders', () => {
    render(<AlertModal />);
  });
  // Second test
  it('matches snapshot DOM node structure', () => {
    const { asFragment} = render(<AlertModal />);
    expect(asFragment()).toMatchSnapshot();
  })
})