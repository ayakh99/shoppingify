import getCurrentUser from './getCurrentUser';

import prisma from '@/libs/prisma';

export default async function getCategories() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const userCategories = await prisma.category.findMany({
      where: {
        userId: currentUser.id,
      },
    });

    return userCategories;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
