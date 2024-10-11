import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { axiosInstance } from '@/api';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AdStats, AdStatsFormData } from '@/types';

const formSchema = z.object({
  advert: z.number().min(1),
  date: z.date(),
});

type AdStatsFormProps = {
  onSubmit: (data: AdStats) => void;
};

export function AdStatsForm({ onSubmit }: AdStatsFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<AdStatsFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      advert: 19447497,
      date: new Date(),
    },
  });

  async function onSubmitForm(values: AdStatsFormData) {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post('/api/ads', {
        advert: values.advert,
        date: format(values.date, 'yyyy-MM-dd'),
      });
      onSubmit(response.data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitForm)}
        className='grid gap-4 md:flex md:items-end md:gap-4'
      >
        <FormField
          control={form.control}
          name='advert'
          render={({ field }) => (
            <FormItem className='w-full md:w-[240px]'>
              <FormLabel>Advert</FormLabel>
              <Select
                onValueChange={value => field.onChange(Number(value))}
                defaultValue={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select an advert' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='19447497'>19447497</SelectItem>
                  <SelectItem value='18854755'>18854755</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='date'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col md:w-[240px]'>
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={date =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <div className='text-red-500'>{error}</div>}
        <Button type='submit' disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
}
