import getItems from '@actions/getItems';
import Home from '@components/layout/Home';

export default async function HomePage() {
  const items = await getItems();

  return <Home userItems={items} />;
}
