'use client';

import { Box, useMantineTheme } from '@mantine/core';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { ChartData } from '@types';

interface MonthlySummaryProps {
  chartData: ChartData;
}

const MonthlySummary: React.FC<MonthlySummaryProps> = ({ chartData }) => {
  const theme = useMantineTheme();

  return (
    <Box>
      <ResponsiveContainer width="100%" height={310}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="items" stroke={theme.colors.orange[4]} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default MonthlySummary;
