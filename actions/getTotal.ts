import getCurrentUser from './getCurrentUser';

import prisma from '@/libs/prisma';

export default async function getTotal() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return 0;
    }

    const total = await prisma.itemInLists.aggregate({
      where: {
        userId: currentUser.id,
      },
      _sum: {
        amount: true,
      },
    });

    return total._sum.amount;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
