import getCurrentUser from './getCurrentUser';

import prisma from '@/libs/prisma';

export default async function getHistory() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const allLists = await prisma.list.aggregateRaw({
      pipeline: [
        { $match: { userId: { $oid: currentUser.id } } },
        {
          $group: {
            _id: {
              month: { $month: '$createdAt' },
              year: { $year: '$createdAt' },
            },
            lists: { $push: '$$ROOT' },
          },
        },
        { $project: { _id: 0 } },
      ],
    });

    return allLists;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
