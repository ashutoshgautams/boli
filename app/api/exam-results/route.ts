import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('courseId') || 'business-english';

    const db = await getDb();
    const results = await db.collection('examResults').find({
      email: session.user.email,
      courseId,
    }).sort({ createdAt: -1 }).toArray();

    return NextResponse.json({ results });
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { courseId, score, totalQuestions, passed } = await req.json();

    const db = await getDb();
    await db.collection('examResults').insertOne({
      email: session.user.email,
      courseId,
      score,
      totalQuestions,
      passed,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
