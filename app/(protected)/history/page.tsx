import getHistory from '@actions/getHistory';
import { ListsByDate } from '@types';

import History from '@components/layout/History';

const HistoryPage = async () => {
  const listsByDate = await getHistory();

  return <History listsByDate={listsByDate as ListsByDate} />;
};

export default HistoryPage;
