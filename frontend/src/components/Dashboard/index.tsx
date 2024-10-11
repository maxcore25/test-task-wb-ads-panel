import { useState } from 'react';
import { Bell, Home, Package2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NoDataAlert } from '../NoDataAlert';
import { AdStatsForm } from '../AdStatsForm';
import { AdStatsTable } from '../AdStatsTable';
import { AdStats } from '@/types';
import { UpperHeader } from '../UpperHeader';

export function Dashboard() {
  const [adStats, setAdStats] = useState<AdStats | null>(null);

  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <div className='hidden border-r bg-muted/40 md:block'>
        <div className='flex h-full max-h-screen flex-col gap-2'>
          <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
            <a href='/' className='flex items-center gap-2 font-semibold'>
              <Package2 className='h-6 w-6' />
              <span className=''>WB Ads</span>
            </a>
            <Button variant='outline' size='icon' className='ml-auto h-8 w-8'>
              <Bell className='h-4 w-4' />
              <span className='sr-only'>Toggle notifications</span>
            </Button>
          </div>
          <div className='flex-1'>
            <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
              <a
                href='#'
                className='flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary'
              >
                <Home className='h-4 w-4' />
                Dashboard
              </a>
            </nav>
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
        <UpperHeader />
        <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
          <div className='flex items-center'>
            <h1 className='text-lg font-semibold md:text-2xl'>
              WB Advertisement Statistics
            </h1>
          </div>
          <div className='grid gap-16'>
            <AdStatsForm onSubmit={setAdStats} />
            {adStats ? <AdStatsTable data={adStats} /> : <NoDataAlert />}
          </div>
        </main>
      </div>
    </div>
  );
}
