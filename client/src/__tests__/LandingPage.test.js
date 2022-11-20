import {cleanup, fireEvent, render} from '@testing-library/react';
import LandingPage from '../pages/Dashboard/Dashboard';

test('renders learn react link', () => {
    render(<LandingPage />);
    const linkElement = screen.getHeading(/Intentful/i);
    expect(linkElement).toEqual("Intentful");
  });