import { render, screen } from '@testing-library/react';
import App from './App';

test('renders doctor\'s react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Médicos/i);
  expect(linkElement).toBeInTheDocument();
});
