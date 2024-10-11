import { render, screen } from '@testing-library/react';
import { AdStatsForm } from '@/components/AdStatsForm';
import { vi } from 'vitest';

describe('AdStatsForm Component', () => {
  it('renders correctly', () => {
    const onSubmitMock = vi.fn();
    render(<AdStatsForm onSubmit={onSubmitMock} />);

    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(
      document.querySelector('button[aria-haspopup="dialog"]')
    ).toBeInTheDocument();
    expect(document.querySelector('button[type="submit"]')).toBeInTheDocument();

    const form = document.querySelector('form');
    expect(form).toBeInTheDocument();
  });
});
