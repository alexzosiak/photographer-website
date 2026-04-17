import { NextResponse } from 'next/server';

export const middleware = (req: any) => {
    const token = req.cookies.get('admin_token');

    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');
    const isLoginPage = req.nextUrl.pathname === '/admin/login';

    if (isAdminRoute && !isLoginPage && !token) {
        return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    return NextResponse.next();
};

export const config = {
    matcher: ['/admin/:path*'],
};


