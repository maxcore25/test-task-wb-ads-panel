import { useState } from 'react';
import { AdStatsForm } from './components/AdStatsForm';
import { AdStatsTable } from './components/AdStatsTable';
import { AdStats } from './types';

function App() {
  const [adStats, setAdStats] = useState<AdStats | null>(null);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Advertisement Statistics</h1>
      <AdStatsForm onSubmit={setAdStats} />
      {adStats && <AdStatsTable data={adStats} />}
    </div>
  );
}

export default App;
