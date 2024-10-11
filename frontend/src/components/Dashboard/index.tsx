import { useState } from 'react';
import { NoDataAlert } from '../NoDataAlert';
import { AdStatsForm } from '../AdStatsForm';
import { AdStatsTable } from '../AdStatsTable';
import { AdStats } from '@/types';
import { UpperHeader } from '../UpperHeader';
import { NavBar } from '../NavBar';

export function Dashboard() {
  const [adStats, setAdStats] = useState<AdStats | null>(null);

  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <NavBar />
      <div className='flex flex-col'>
        <UpperHeader />
        <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
          <div className='flex items-center'>
            <h1 className='text-lg font-semibold md:text-2xl'>
              WB Advertisement Statistics
            </h1>
          </div>
          <div className='grid gap-16 md:gap-32'>
            <AdStatsForm onSubmit={setAdStats} />
            {adStats ? <AdStatsTable data={adStats} /> : <NoDataAlert />}
          </div>
        </main>
      </div>
    </div>
  );
}
