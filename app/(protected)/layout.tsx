import { ListItems } from '@types';
import getListItems from '@actions/getListItems';
import getLists from '@actions/getLists';
import getPendingItems from '@actions/getPendingItems';

import Shell from '@components/layout/Shell';

const InternalLayout = async ({ children }: { children: React.ReactNode }) => {
  const userLists = await getLists();
  let listItems: ListItems;
  let pendingItems = 0;

  if (userLists[0]) {
    listItems = (await getListItems({ listId: userLists[0].id })) as ListItems;
    pendingItems = await getPendingItems({ listId: userLists[0].id });
  } else {
    listItems = [];
  }

  return (
    <Shell
      activeList={userLists[0]}
      multipleActiveLists={userLists.length > 1}
      activeListItems={listItems}
      pendingListItems={pendingItems}
    >
      {children}
    </Shell>
  );
};

export default InternalLayout;
