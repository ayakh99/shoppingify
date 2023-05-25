import { NextResponse } from 'next/server';

import getCurrentUser from '@actions/getCurrentUser';
import prisma from '@/libs/prisma';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { title } = await request.json();

  const list = await prisma.list.create({
    data: {
      title,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(list);
}
