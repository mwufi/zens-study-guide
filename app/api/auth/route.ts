import { NextResponse } from 'next/server';
import { users } from '@/db/schema';
import { db } from '@/db';
import bcrypt from 'bcrypt';
import { eq, or, ilike } from 'drizzle-orm';

async function findUserByUsernameOrEmail(username: string, email: string) {
    try {
        const lowercaseUsername = username.toLowerCase();
        const lowercaseEmail = email.toLowerCase();
        console.log(lowercaseUsername, lowercaseEmail);
        const results = await db.select().from(users).where(
            or(
                ilike(users.username, lowercaseUsername),
                ilike(users.email, lowercaseEmail)
            )
        );
        return results[0];
    } catch (error) {
        return null;
    }
}

async function createUser(values: { username: string; email: string; passwordHash: string; settings: any }) {
    const newUser = await db.insert(users).values(values).returning();
    return newUser[0];
}

export async function POST(req: Request) {
    const body = await req.json();
    const { action, username, email, password } = body;

    if (action === 'login') {
        // Login logic
        const user = (await findUserByUsernameOrEmail(username, email));
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        const passwordMatch = await bcrypt.compare(password, user.passwordHash);
        if (!passwordMatch) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
        }
        return NextResponse.json({ message: 'Login successful', userId: user.id });
    } else if (action === 'signup') {
        // Signup logic
        const existingUsers = await findUserByUsernameOrEmail(username, email);
        if (existingUsers) {
            return NextResponse.json({ error: 'Username/email already exists' }, { status: 400 });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUser({
            username,
            email,
            passwordHash: hashedPassword,
            settings: { theme: 'light', displayCompact: false, fontSize: 'medium' }
        });
        return NextResponse.json({ message: 'User created successfully', userId: newUser.id });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}