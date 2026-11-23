import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const recipient = 'mokina.viktoria.photo@gmail.com';
const limits = { names: 160, email: 254, date: 10, phone: 50, location: 200, message: 5000, instagram: 100 };
const unavailable = 'Your message could not be sent. Please try again later or contact me on Instagram.';

export async function POST(request: Request) {
    const origin = request.headers.get('origin');
    if (origin && origin !== new URL(request.url).origin) {
        return NextResponse.json({ error: 'This request is not allowed.' }, { status: 403 });
    }

    if (Number(request.headers.get('content-length')) > 24000) {
        return NextResponse.json({ error: 'Your message is too long.' }, { status: 413 });
    }

    let body: unknown;
    try {
        const raw = await request.text();
        if (Buffer.byteLength(raw, 'utf8') > 24000) {
            return NextResponse.json({ error: 'Your message is too long.' }, { status: 413 });
        }
        body = JSON.parse(raw);
    } catch {
        return NextResponse.json({ error: 'Please check your form and try again.' }, { status: 400 });
    }

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
        return NextResponse.json({ error: 'Please check your form and try again.' }, { status: 400 });
    }

    const submitted = body as Record<string, unknown>;
    if (submitted.website) {
        return NextResponse.json({ error: 'This request is not allowed.' }, { status: 400 });
    }

    const values = {} as Record<keyof typeof limits, string>;
    const errors: Partial<Record<keyof typeof limits, string>> = {};
    for (const field of Object.keys(limits) as (keyof typeof limits)[]) {
        const value = submitted[field] ?? '';
        if (typeof value !== 'string' || value.length > limits[field]) {
            errors[field] = 'Please enter a valid value within the field limit.';
            values[field] = '';
        } else {
            values[field] = value.trim();
        }
    }

    if (!values.names || /[\r\n]/.test(values.names)) errors.names = 'Please enter your name(s).';
    if (!/^[^\s@<>]+@[^\s@<>]+$/.test(values.email)) errors.email = 'Please enter a valid email address.';
    if (values.date) {
        const parsed = new Date(values.date + 'T00:00:00Z');
        const today = new Intl.DateTimeFormat('en-CA', {
            timeZone: 'Europe/Dublin', year: 'numeric', month: '2-digit', day: '2-digit',
        }).formatToParts(new Date());
        const part = (type: string) => today.find((item) => item.type === type)?.value;
        const minimum = `${part('year')}-${part('month')}-${part('day')}`;
        if (!/^\d{4}-\d{2}-\d{2}$/.test(values.date) || Number.isNaN(parsed.getTime()) ||
            parsed.toISOString().slice(0, 10) !== values.date || values.date < minimum) {
            errors.date = 'Please choose today or a future date.';
        }
    }

    if (Object.keys(errors).length) {
        return NextResponse.json({ error: 'Please check the highlighted fields.', errors }, { status: 400 });
    }

    const user = process.env.SMTP_USER || recipient;
    const password = process.env.SMTP_APP_PASSWORD?.replace(/\s/g, '');
    if (!password) {
        return NextResponse.json({ error: unavailable }, { status: 503 });
    }

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: { user, pass: password },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 20000,
        disableFileAccess: true,
        disableUrlAccess: true,
    });

    try {
        const result = await transport.sendMail({
            from: { name: 'Viktoria Mokina Photography', address: user },
            to: recipient,
            replyTo: { name: values.names, address: values.email },
            subject: `New photography enquiry — ${values.names}`,
            text: [
                'New enquiry from your website',
                '',
                `Name(s): ${values.names}`,
                `Email: ${values.email}`,
                `Date: ${values.date || 'Not specified'}`,
                `Phone: ${values.phone || 'Not specified'}`,
                `Location: ${values.location || 'Not specified'}`,
                `Instagram: ${values.instagram || 'Not specified'}`,
                '',
                'Message:',
                values.message || 'Not specified',
            ].join('\n'),
        });
        if (!result.accepted.length) {
            return NextResponse.json({ error: unavailable }, { status: 502 });
        }
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: unavailable }, { status: 502 });
    } finally {
        transport.close();
    }
}
