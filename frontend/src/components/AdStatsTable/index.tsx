import { flexRender } from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AdStats } from '@/types';
import { useAdStatsTable } from './AdStatsTable.hooks';

export function AdStatsTable({ data }: { data: AdStats }) {
  const { table, columns } = useAdStatsTable({ data });

  return (
    <div className='space-y-4'>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='rounded-md bg-muted p-4'>
        <h2 className='mb-2 text-lg font-semibold'>Summary</h2>
        <div className='grid gap-4 md:grid-cols-3'>
          <div>
            <p className='text-sm text-muted-foreground'>Total Clicks</p>
            <p className='text-2xl font-bold'>{data.summary.clicks}</p>
          </div>
          <div>
            <p className='text-sm text-muted-foreground'>Average CTR</p>
            <p className='text-2xl font-bold'>
              {new Intl.NumberFormat('ru-RU', {
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(data.summary.ctr)}
            </p>
          </div>
          <div>
            <p className='text-sm text-muted-foreground'>Average CPC</p>
            <p className='text-2xl font-bold'>
              {new Intl.NumberFormat('ru-RU', {
                style: 'currency',
                currency: 'RUB',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(data.summary.cpc)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
