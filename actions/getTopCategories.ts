import getCurrentUser from './getCurrentUser';

import prisma from '@/libs/prisma';

export default async function getTopCategories() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const topCategories = await prisma.itemInLists.aggregateRaw({
      pipeline: [
        { $match: { userId: { $oid: currentUser.id } } },
        {
          $lookup: {
            from: 'Item',
            localField: 'itemId',
            foreignField: '_id',
            as: 'fromItems',
            pipeline: [{ $project: { _id: 0, name: 1, categoryId: 1 } }],
          },
        },
        {
          $replaceRoot: {
            newRoot: { $mergeObjects: [{ $arrayElemAt: ['$fromItems', 0] }, '$$ROOT'] },
          },
        },
        {
          $lookup: {
            from: 'Category',
            localField: 'categoryId',
            foreignField: '_id',
            as: 'fromCategories',
            pipeline: [{ $project: { _id: 0, title: 1 } }],
          },
        },
        {
          $replaceRoot: {
            newRoot: { $mergeObjects: [{ $arrayElemAt: ['$fromCategories', 0] }, '$$ROOT'] },
          },
        },
        {
          $project: { _id: 0, userId: 0, listId: 0, status: 0, fromCategories: 0, fromItems: 0 },
        },
        {
          $group: {
            _id: { id: '$categoryId', name: '$title' },
            totalOccurrences: { $sum: '$amount' },
          },
        },
        {
          $sort: { totalOccurrences: -1 },
        },
      ],
    });

    return topCategories;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
