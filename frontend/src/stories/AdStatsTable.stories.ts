import type { Meta, StoryObj } from '@storybook/react';

import { AdStatsTable } from '@/components/AdStatsTable';
import { testAd } from '@/temp';

const meta = {
  title: 'Example/AdStatsTable',
  component: AdStatsTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: { data: testAd },
} satisfies Meta<typeof AdStatsTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
