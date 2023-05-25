import getCurrentUser from './getCurrentUser';

import prisma from '@/libs/prisma';

export default async function getTopItems() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const topItems = await prisma.itemInLists.aggregateRaw({
      pipeline: [
        { $match: { userId: { $oid: currentUser.id } } },
        {
          $lookup: {
            from: 'Item',
            localField: 'itemId',
            foreignField: '_id',
            as: 'fromItems',
            pipeline: [{ $project: { _id: 0, name: 1 } }],
          },
        },
        {
          $replaceRoot: {
            newRoot: { $mergeObjects: [{ $arrayElemAt: ['$fromItems', 0] }, '$$ROOT'] },
          },
        },
        {
          $project: { _id: 0, userId: 0, listId: 0, status: 0, fromItems: 0 },
        },
        {
          $group: {
            _id: { id: '$itemId', name: '$name' },
            totalOccurrences: { $sum: '$amount' },
          },
        },
        {
          $sort: { totalOccurrences: -1 },
        },
      ],
    });

    return topItems;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
