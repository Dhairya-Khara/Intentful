import Dashboard from '../pages/Dashboard/Dashboard'
import { render, screen } from '@testing-library/react';

test('renders the logout button', () => {
  render(<Dashboard />);
  
  expect(screen.getByRole("heading")).toHaveTextContent(/Intentful/);
});