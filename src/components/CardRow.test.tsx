import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import * as Context from '../context/ATMAppContext';
import CardRow from './CardRow';

// Helper to mock context
function mockATMApp(cardType: string) {
  vi.spyOn(Context, 'useATMApp').mockReturnValue({
    state: { cardType }
  });
}

test('highlights the correct card by border and boxShadow', () => {
  mockATMApp('Visa');
  render(<CardRow />);
  const visaCard = screen.getByTitle(/visa/i);
  const masterCard = screen.getByTitle(/mastercard/i);
  expect(visaCard).toHaveStyle('width: 36px');
  expect(visaCard).toHaveStyle('box-shadow: 0 0 12px #38bdf8');
  expect(masterCard).toHaveStyle('border: 2px solid transparent');
  expect(masterCard).toHaveStyle('box-shadow: none');
});

test('all cards have accessible images with alt text', () => {
  mockATMApp('visa');
  render(<CardRow />);
  expect(screen.getByAltText(/visa/i)).toBeInTheDocument();
  expect(screen.getByAltText(/mastercard/i)).toBeInTheDocument();
});
