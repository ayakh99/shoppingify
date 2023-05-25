import getCurrentUser from './getCurrentUser';

import prisma from '@/libs/prisma';

export default async function getItems() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const groupedItems = await prisma.category.findMany({
      where: {
        userId: currentUser.id,
      },
      include: {
        items: {
          include: {
            category: true,
          },
        },
      },
    });

    return groupedItems;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
