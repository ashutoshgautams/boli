import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { name, email, phone, source, message, preferredTime } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
    }

    const db = await getDb();
    const booking = {
      name,
      email: email || session?.user?.email || '',
      phone,
      source: source || 'general', // speaking-club, interview-prep, 1on1, group
      message: message || '',
      preferredTime: preferredTime || '',
      userId: session?.user ? (session.user as { id?: string }).id : null,
      status: 'new', // new, contacted, converted, cancelled
      createdAt: new Date(),
    };

    await db.collection('bookings').insertOne(booking);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    // Simple admin check via query param (replace with proper auth in production)
    const { searchParams } = new URL(req.url);
    const key = searchParams.get('key');
    if (key !== process.env.ADMIN_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = await getDb();
    const bookings = await db
      .collection('bookings')
      .find({})
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Fetch bookings error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
