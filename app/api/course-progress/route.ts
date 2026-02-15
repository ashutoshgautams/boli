import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ completedLessons: [] });
    }
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('courseId') || 'business-english';
    const db = await getDb();
    const progress = await db.collection('courseProgress').findOne({
      email: session.user.email,
      courseId,
    });
    return NextResponse.json({ completedLessons: progress?.completedLessons || [] });
  } catch {
    return NextResponse.json({ completedLessons: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Not logged in' }, { status: 401 });
    }
    const { courseId, lessonId } = await req.json();
    if (!courseId || !lessonId) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }
    const db = await getDb();
    await db.collection('courseProgress').updateOne(
      { email: session.user.email, courseId },
      { $addToSet: { completedLessons: lessonId }, $set: { updatedAt: new Date() } },
      { upsert: true }
    );
    return NextResponse.json({ saved: true });
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
