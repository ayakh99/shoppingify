import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

import getCurrentUser from '@actions/getCurrentUser';
import prisma from '@/libs/prisma';

interface IParams {
  userId?: string;
}

export async function PATCH(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { userId } = params;

  if (!userId || typeof userId !== 'string' || userId !== currentUser.id) {
    throw new Error('Invalid user ID');
  }

  const { name, email, currentpassword, newpassword, image } = await request.json();

  let data: any = {};
  if (name) {
    data.name = name;
  }
  if (email) {
    data.email = email;
  }
  if (newpassword) {
    const passwordMatch = await bcrypt.compare(currentpassword, currentUser.hashedPassword || '');
    if (!passwordMatch) {
      return NextResponse.json({ error: true });
    }
    data.hashedPassword = await bcrypt.hash(newpassword, 12);
  }
  if (image || image === '') {
    data.image = image;
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data,
  });

  return NextResponse.json(updatedUser);
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { userId } = params;

  if (!userId || typeof userId !== 'string' || userId !== currentUser.id) {
    throw new Error('Invalid user ID');
  }

  const deletedUser = await prisma.user.delete({
    where: {
      id: currentUser.id,
    },
  });

  return NextResponse.json(deletedUser);
}
