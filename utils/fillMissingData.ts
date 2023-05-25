import { ChartData } from '@types';

const fillMissingData = (data: ChartData) => {
  const formattedData = months.map((month, index) => {
    const dataPointExists = data.filter((el) => el.month === index + 1)[0];
    if (dataPointExists) {
      return { month, items: dataPointExists.amount };
    }
    return { month, items: 0 };
  });

  return formattedData;
};

export default fillMissingData;

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
