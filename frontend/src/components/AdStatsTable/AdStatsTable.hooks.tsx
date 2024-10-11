import {
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import { AdStats } from '@/types';
import { useState } from 'react';
import { adStatsTableColumns as columns } from './columns';

type UseAdStatsTableProps = { data: AdStats };

export const useAdStatsTable = ({ data }: UseAdStatsTableProps) => {
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

  return { table, columns };
};
