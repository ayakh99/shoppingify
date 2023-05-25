import { ChartData, TopStats } from '@types';
import getTopCategories from '@actions/getTopCategories';
import getTopItems from '@actions/getTopItems';
import getTotal from '@actions/getTotal';

import getMonthlyStats from '@actions/getMonthlyStats';
import fillMissingData from '@utils/fillMissingData';

import Statistics from '@components/layout/Statistics';

const StatisticsPage = async () => {
  const items = (await getTopItems()) as TopStats;
  const categories = (await getTopCategories()) as TopStats;
  const total = (await getTotal()) as number;

  const chartData = (await getMonthlyStats()) as ChartData;
  const formattedData = fillMissingData(chartData);

  return (
    <Statistics items={items} categories={categories} total={total} chartData={formattedData} />
  );
};

export default StatisticsPage;
