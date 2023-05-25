import { NextResponse } from 'next/server';

import getCurrentUser from '@actions/getCurrentUser';
import prisma from '@/libs/prisma';

interface IParams {
  listId?: string;
}

export async function PATCH(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listId } = params;

  if (!listId || typeof listId !== 'string') {
    throw new Error('Invalid list ID');
  }

  const { title, itemsToUpdate, status } = await request.json();

  let data: any = {};

  if (title) {
    data.title = title;
  }
  if (status) {
    data.status = status;
  }

  const list = await prisma.list.update({
    where: {
      id: listId,
    },
    data,
  });

  if (!itemsToUpdate || Object.keys(itemsToUpdate).length === 0) {
    return NextResponse.json(list);
  }

  const transactions = Object.entries(itemsToUpdate).map(([itemId, amount]) =>
    prisma.itemInLists.update({
      where: {
        listId_itemId: {
          listId,
          itemId,
        },
      },
      data: {
        amount: amount as number,
      },
    })
  );

  const updatedItems = await prisma.$transaction(transactions);

  return NextResponse.json({
    list,
    updatedItems,
  });
}
