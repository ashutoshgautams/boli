import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ elo: 800, isGuest: true });
    }
    const db = await getDb();
    const user = await db.collection('users').findOne({ email: session.user.email });
    return NextResponse.json({ elo: user?.vocabElo ?? 800, isGuest: false });
  } catch {
    return NextResponse.json({ elo: 800, isGuest: true });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ saved: false, message: 'Not logged in' });
    }
    const { eloChange } = await req.json();
    if (typeof eloChange !== 'number') {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }
    const db = await getDb();
    const user = await db.collection('users').findOne({ email: session.user.email });
    const currentElo = user?.vocabElo ?? 800;
    const newElo = Math.max(0, currentElo + eloChange);
    await db.collection('users').updateOne(
      { email: session.user.email },
      { $set: { vocabElo: newElo, updatedAt: new Date() } }
    );
    return NextResponse.json({ saved: true, newElo });
  } catch {
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}
