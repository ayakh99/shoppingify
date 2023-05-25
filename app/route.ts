import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@libs/authOptions';

export const GET = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.redirect(new URL('/signup', req.url));
  } else {
    return NextResponse.redirect(new URL('/home', req.url));
  }
};
