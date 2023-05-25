import getCurrentUser from './getCurrentUser';

import prisma from '@/libs/prisma';

export default async function getLists() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const activeLists = await prisma.list.findMany({
      where: {
        userId: currentUser.id,
        status: 'active',
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    const safeLists = activeLists.map((list) => ({
      ...list,
      createdAt: list.createdAt.toISOString(),
      updatedAt: list.updatedAt.toISOString(),
    }));

    return safeLists;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
