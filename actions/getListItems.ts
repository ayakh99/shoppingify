import getCurrentUser from './getCurrentUser';

import prisma from '@/libs/prisma';

interface IParams {
  listId?: string;
}

export default async function getListItems(params: IParams) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const { listId } = params;

    const listItems = await prisma.itemInLists.aggregateRaw({
      pipeline: [
        { $match: { listId: { $oid: listId } } },
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
        { $project: { fromItems: 0, _id: 0 } },
        {
          $group: {
            _id: '$categoryId',
            items: {
              $push: { id: '$itemId', amount: '$amount', status: '$status', name: '$name' },
            },
          },
        },
        { $sort: { _id: 1 } },
        {
          $lookup: {
            from: 'Category',
            localField: '_id',
            foreignField: '_id',
            as: 'category',
            pipeline: [{ $project: { _id: 0, title: 1 } }],
          },
        },
        { $unwind: '$category' },
        { $project: { _id: 0 } },
      ],
    });

    return listItems;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
