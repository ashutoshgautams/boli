import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getDb } from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    const { email, password, phone, name } = await req.json();

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const db = await getDb();

    // Check existing user
    const existingUser = await db.collection('users').findOne({
      email: email.toLowerCase().trim(),
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    // Check phone uniqueness (if provided)
    if (phone) {
      const cleanPhone = phone.replace(/\D/g, '');
      if (cleanPhone.length >= 10) {
        const existingPhone = await db.collection('users').findOne({
          phone: cleanPhone,
        });
        if (existingPhone) {
          return NextResponse.json(
            { error: 'This phone number is already registered' },
            { status: 409 }
          );
        }
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const result = await db.collection('users').insertOne({
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      phone: phone ? phone.replace(/\D/g, '') : null,
      name: name || email.split('@')[0],
      image: null,
      googleId: null,
      level: 'Beginner',
      plan: 'free',
      vocabElo: 800,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        user: {
          id: result.insertedId.toString(),
          email: email.toLowerCase().trim(),
          name: name || email.split('@')[0],
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
