import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState } from 'react';
import { AdStats, AdStatsItem } from '@/types';

const columns: ColumnDef<AdStatsItem>[] = [
  {
    accessorKey: 'nmId',
    header: 'NM ID',
  },
  {
    accessorKey: 'clicks',
    header: () => <div className='text-right'>Clicks</div>,
    cell: ({ row }) => {
      return (
        <div className='text-right font-medium'>{row.getValue('clicks')}</div>
      );
    },
  },
  {
    accessorKey: 'ctr',
    header: () => <div className='text-right'>CTR</div>,
    cell: ({ row }) => {
      const ctr = parseFloat(row.getValue('ctr'));
      const formatted = new Intl.NumberFormat('ru-RU', {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(ctr);
      return <div className='text-right font-medium'>{formatted}</div>;
    },
  },
  {
    accessorKey: 'cpc',
    header: () => <div className='text-right'>CPC</div>,
    cell: ({ row }) => {
      const cpc = parseFloat(row.getValue('cpc'));
      const formatted = new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(cpc);
      return <div className='text-right font-medium'>{formatted}</div>;
    },
  },
];

export function AdStatsTable({ data }: { data: AdStats }) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: data.list,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

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
        <div className='grid grid-cols-3 gap-4'>
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
