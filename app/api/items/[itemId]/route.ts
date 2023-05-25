import { NextResponse } from 'next/server';

import getCurrentUser from '@actions/getCurrentUser';
import prisma from '@/libs/prisma';

interface IParams {
  itemId?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { itemId } = params;

  if (!itemId || typeof itemId !== 'string' || itemId === '') {
    throw new Error('Invalid item ID');
  }

  const item = await prisma.item.findUnique({
    where: {
      id: itemId,
    },
    include: {
      category: true,
    },
  });

  return NextResponse.json(item);
}

export async function PATCH(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { itemId } = params;

  if (!itemId || typeof itemId !== 'string') {
    throw new Error('Invalid item ID');
  }

  const { name, note, image, categoryId } = await request.json();

  const item = await prisma.item.update({
    where: {
      id: itemId,
    },
    data: {
      name,
      note,
      image,
      categoryId,
    },
    include: {
      category: true,
    },
  });

  return NextResponse.json(item);
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { itemId } = params;

  if (!itemId || typeof itemId !== 'string') {
    throw new Error('Invalid item ID');
  }

  const item = await prisma.item.delete({
    where: {
      id: itemId,
    },
  });

  return NextResponse.json(item);
}
