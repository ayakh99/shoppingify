import getCurrentUser from './getCurrentUser';

import prisma from '@/libs/prisma';

export default async function getMonthlyStats() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const currentYear = new Date().getFullYear();

    const stats = await prisma.itemInLists.aggregateRaw({
      pipeline: [
        { $match: { userId: { $oid: currentUser.id } } },
        {
          $lookup: {
            from: 'List',
            localField: 'listId',
            foreignField: '_id',
            as: 'fromLists',
            pipeline: [{ $project: { _id: 0, createdAt: 1 } }],
          },
        },
        {
          $replaceRoot: {
            newRoot: { $mergeObjects: [{ $arrayElemAt: ['$fromLists', 0] }, '$$ROOT'] },
          },
        },
        {
          $unset: ['_id', 'userId', 'listId', 'itemId', 'status', 'fromLists'],
        },
        {
          $project: {
            month: { $month: '$createdAt' },
            year: { $year: '$createdAt' },
            amount: 1,
          },
        },
        {
          $match: { year: { $gte: currentYear } },
        },
        {
          $group: {
            _id: '$month',
            amount: { $sum: '$amount' },
          },
        },
        {
          $project: {
            _id: 0,
            month: '$_id',
            amount: 1,
          },
        },
      ],
    });

    return stats;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
