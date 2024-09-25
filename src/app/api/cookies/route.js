import { serialize } from 'cookie';
import { cookies } from 'next/headers';

export async function POST(request) {
    const { name, value, time } = await request.json();

    const cookie = serialize(name, value, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: time,
        path: '/'
    });

    const headers = new Headers({
        'Set-Cookie': cookie,
        'Content-Type': 'application/json',
    });

    return new Response(JSON.stringify({status: true}), { headers });
}

export async function GET(request) {
    const url = new URL(request.url);
    const queryParams = url.searchParams;
    const name = queryParams.get('name');
    const cookiesList = cookies();
    const value = cookiesList.get(name)?.value;
    let statusCode = 404;
    if (value) {
        statusCode = 200;
        return new Response(JSON.stringify(value), { status: statusCode });
    } else {
        statusCode = 404;
        return new Response(JSON.stringify({ error: "Cookie not found" }), { status: statusCode });
    }
}

export async function DELETE(request) {
    const { name } = await request.json();

    const cookie = serialize( name, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0,
        path: '/'
    });
    const headers = new Headers({
        'Set-Cookie': cookie,
        'Content-Type': 'application/json',
    });

    return new Response(JSON.stringify({status: true}), { headers });
}