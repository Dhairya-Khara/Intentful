import { render, screen } from '@testing-library/react';
import LandingPage from '../pages/LandingPage/LandingPage';

test('renders the landing page', () => {
  render(<LandingPage />);
});