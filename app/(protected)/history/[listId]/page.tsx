import { ListItems, SafeList } from '@types';
import getList from '@actions/getList';
import getListItems from '@actions/getListItems';

import List from '@components/layout/List';

const ListPage = async ({ params }: { params: { listId: string } }) => {
  const list = await getList(params);
  const listItems = await getListItems(params);

  return <List list={list as SafeList} listItems={listItems as ListItems} />;
};

export default ListPage;
