import { render, screen } from '@testing-library/react';
import { AdStatsTable } from '@/components/AdStatsTable';
import { testAd } from '@/temp';

describe('AdStatsTable Component', () => {
  it('should render correctly', () => {
    render(<AdStatsTable data={testAd} />);

    expect(screen.getByRole('table')).toBeInTheDocument();
  });
});
