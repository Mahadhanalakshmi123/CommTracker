import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders navigation', () => {
    render(<App />);
    expect(screen.getByText('CommTracker')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
  });
});