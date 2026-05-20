import { NextResponse } from 'next/server';
import { Router } from 'next/router';

export async function POST(req: Request) {
    const { login, password } = await req.json();
    console.log(login, password);

    if (
        login !== process.env.ADMIN_LOGIN ||
        password !== process.env.ADMIN_PASSWORD
    ) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const response = NextResponse.json({ ok: true });

    response.cookies.set('admin_token', 'logged_in', {
        httpOnly: true,
        path: '/',
    });

    return response;
}
