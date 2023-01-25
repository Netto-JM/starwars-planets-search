import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithContext } from './helpers/renderWithContext';

test('I am your test', () => {
  renderWithContext(<App />);
  const linkElement = screen.getByText(/Hello, App!/i);
  expect(linkElement).toBeInTheDocument();
});
