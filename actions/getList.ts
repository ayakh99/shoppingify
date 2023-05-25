import getCurrentUser from './getCurrentUser';

import prisma from '@/libs/prisma';

interface IParams {
  listId?: string;
}

export default async function getList(params: IParams) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    const { listId } = params;

    const list = await prisma.list.findUnique({
      where: {
        id: listId,
      },
    });

    const safeList = {
      ...list,
      createdAt: list?.createdAt.toISOString(),
      updatedAt: list?.updatedAt.toISOString(),
    };

    return safeList;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
