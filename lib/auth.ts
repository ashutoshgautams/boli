import type { NextAuthOptions, Session, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';
import { getDb } from '@/lib/mongodb';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        const db = await getDb();
        const user = await db.collection('users').findOne({
          email: credentials.email.toLowerCase().trim(),
        });

        if (!user) {
          throw new Error('No account found with this email');
        }

        if (!user.password) {
          throw new Error('This account uses Google sign-in. Please use Google to log in.');
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error('Incorrect password');
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          phone: user.phone,
          image: user.image || null,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const db = await getDb();
        const existingUser = await db.collection('users').findOne({
          email: user.email?.toLowerCase(),
        });

        if (existingUser) {
          // Link Google to existing account if not already linked
          if (!existingUser.googleId) {
            await db.collection('users').updateOne(
              { _id: existingUser._id },
              {
                $set: {
                  googleId: account.providerAccountId,
                  image: user.image,
                  updatedAt: new Date(),
                },
              }
            );
          }
        } else {
          // Create new user from Google
          await db.collection('users').insertOne({
            email: user.email?.toLowerCase(),
            name: user.name,
            image: user.image,
            googleId: account.providerAccountId,
            phone: null,
            level: 'Beginner',
            plan: 'free',
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
      }
      return true;
    },

    async jwt({ token, user, trigger, session }: { token: JWT; user?: User; trigger?: string; session?: Session }) {
      if (user) {
        token.id = user.id;
        token.phone = (user as User & { phone?: string }).phone;
      }

      // Fetch fresh user data on every token refresh
      if (token.email) {
        const db = await getDb();
        const dbUser = await db.collection('users').findOne({
          email: token.email.toLowerCase(),
        });
        if (dbUser) {
          token.id = dbUser._id.toString();
          token.name = dbUser.name;
          token.phone = dbUser.phone;
          token.plan = dbUser.plan || 'free';
          token.level = dbUser.level || 'Beginner';
        }
      }

      if (trigger === 'update' && session) {
        token.name = (session as Session & { name?: string }).name || token.name;
      }

      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        (session.user as Session['user'] & { id: string }).id = token.id as string;
        (session.user as Session['user'] & { phone: string }).phone = token.phone as string;
        (session.user as Session['user'] & { plan: string }).plan = (token.plan as string) || 'free';
        (session.user as Session['user'] & { level: string }).level = (token.level as string) || 'Beginner';
      }
      return session;
    },
  },

  pages: {
    signIn: '/login',
    error: '/login',
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,
};
