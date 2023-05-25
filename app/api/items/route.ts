import { NextResponse } from 'next/server';

import getCurrentUser from '@actions/getCurrentUser';
import prisma from '@/libs/prisma';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { name, note, image, categoryId } = await request.json();

  const item = await prisma.item.create({
    data: {
      name,
      note,
      image,
      categoryId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(item);
}
