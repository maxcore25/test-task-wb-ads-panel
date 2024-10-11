import { z } from 'zod';
import { AdStatsFormSchema } from '@/lib/validations';

export type AdStatsItem = {
  nmId: number;
  clicks: number;
  ctr: number;
  cpc: number;
};

export type AdStats = {
  summary: {
    clicks: number;
    ctr: number;
    cpc: number;
  };
  list: AdStatsItem[];
};

export type AdStatsFormValues = z.infer<typeof AdStatsFormSchema>;
