import { ColumnDef } from '@tanstack/react-table';
import { AdStatsItem } from '@/types';
import { Button } from '../ui/button';
import { ArrowUpDown } from 'lucide-react';

export const adStatsTableColumns: ColumnDef<AdStatsItem>[] = [
  {
    accessorKey: 'nmId',
    header: 'NM ID',
  },
  {
    accessorKey: 'clicks',
    header: ({ column }) => {
      return (
        <div className='text-right'>
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Clicks
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className='text-right font-medium'>{row.getValue('clicks')}</div>
      );
    },
  },
  {
    accessorKey: 'ctr',
    header: ({ column }) => {
      return (
        <div className='text-right'>
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            CTR
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        </div>
      );
    },
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
    header: ({ column }) => {
      return (
        <div className='text-right'>
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            CPC
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        </div>
      );
    },
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
