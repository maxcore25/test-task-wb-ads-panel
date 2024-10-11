export const NoDataAlert = () => {
  return (
    <div className='flex flex-col items-center gap-1 text-center'>
      <h3 className='text-2xl font-bold tracking-tight'>
        No WB ads data fetched
      </h3>
      <p className='text-sm text-muted-foreground'>
        Enter ads id and date in the form to fetch WB ads data.
      </p>
    </div>
  );
};
