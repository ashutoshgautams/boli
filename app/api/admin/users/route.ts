import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get('key');
    
    if (key !== process.env.ADMIN_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = await getDb();
    const users = await db
      .collection('users')
      .find({})
      .project({ password: 0 }) // Exclude password
      .sort({ createdAt: -1 })
      .limit(200)
      .toArray();

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Fetch users error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
