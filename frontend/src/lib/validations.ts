import { z } from 'zod';

export const formSchema = z.object({
  advert: z.number().min(1),
  date: z.date(),
});
