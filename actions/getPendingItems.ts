import getCurrentUser from './getCurrentUser';

import prisma from '@/libs/prisma';

interface IParams {
  listId?: string;
}

export default async function getPendingItems(params: IParams) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return 0;
    }

    const { listId } = params;

    const pendingItems = await prisma.itemInLists.count({
      where: {
        listId,
        status: 'pending',
      },
    });

    return pendingItems;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
