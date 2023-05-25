import { NextResponse } from 'next/server';

import getCurrentUser from '@actions/getCurrentUser';
import prisma from '@/libs/prisma';

interface IParams {
  listId?: string;
  itemId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listId, itemId } = params;

  if (!listId || typeof listId !== 'string' || !itemId || typeof itemId !== 'string') {
    throw new Error('Invalid request');
  }

  const listItem = await prisma.itemInLists.create({
    data: {
      listId,
      itemId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listItem);
}

export async function PATCH(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listId, itemId } = params;

  if (!listId || typeof listId !== 'string' || !itemId || typeof itemId !== 'string') {
    throw new Error('Invalid request');
  }

  const { status } = await request.json();

  const updatedListItem = await prisma.itemInLists.update({
    where: {
      listId_itemId: {
        listId,
        itemId,
      },
    },
    data: {
      status,
    },
  });

  return NextResponse.json(updatedListItem);
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listId, itemId } = params;

  if (!listId || typeof listId !== 'string' || !itemId || typeof itemId !== 'string') {
    throw new Error('Invalid request');
  }

  const listItem = await prisma.itemInLists.delete({
    where: {
      listId_itemId: {
        listId,
        itemId,
      },
    },
  });

  return NextResponse.json(listItem);
}
