import { NextResponse } from 'next/server';

import getCurrentUser from '@actions/getCurrentUser';
import prisma from '@/libs/prisma';

export async function GET() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const userCategories = await prisma.category.findMany({
    where: {
      userId: currentUser.id,
    },
  });

  return NextResponse.json(userCategories);
}

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { title } = await request.json();

  const category = await prisma.category.create({
    data: {
      title,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(category);
}
