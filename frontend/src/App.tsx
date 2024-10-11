import { Dashboard } from './components/Dashboard';

function App() {
  return (
    // <div className='container mx-auto p-4'>
    //   <h1 className='mb-4 text-2xl font-bold'>Advertisement Statistics</h1>
    //   <div className='grid gap-8'>
    //     <AdStatsForm onSubmit={setAdStats} />
    //     {adStats && <AdStatsTable data={adStats} />}
    //   </div>
    // </div>
    <Dashboard />
  );
}

export default App;
