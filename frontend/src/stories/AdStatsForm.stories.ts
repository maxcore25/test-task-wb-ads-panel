import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { AdStatsForm } from '@/components/AdStatsForm';

const meta = {
  title: 'Example/AdStatsForm',
  component: AdStatsForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: { onSubmit: fn() },
} satisfies Meta<typeof AdStatsForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
