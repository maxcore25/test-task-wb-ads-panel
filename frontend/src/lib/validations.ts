import { z } from 'zod';

export const AdStatsFormSchema = z.object({
  advert: z.union([z.literal(19447497), z.literal(18854755)]),
  date: z.date(),
});
