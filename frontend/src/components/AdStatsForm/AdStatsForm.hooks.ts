import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { axiosInstance } from '@/api';
import { format } from 'date-fns';
import { AdStats, AdStatsFormValues } from '@/types';
import { AdStatsFormSchema } from '@/lib/validations';

type UseAdStatsFormProps = {
  onSubmit: (data: AdStats) => void;
};

export const useAdStatsForm = ({ onSubmit }: UseAdStatsFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<AdStatsFormValues>({
    resolver: zodResolver(AdStatsFormSchema),
    defaultValues: {
      advert: 19447497,
      date: new Date(),
    },
  });

  async function onSubmitForm(data: AdStatsFormValues) {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post<AdStats>('/api/ads', {
        advert: data.advert,
        date: format(data.date, 'yyyy-MM-dd'),
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

  return {
    form,
    isLoading,
    error,
    onSubmitForm,
  };
};
