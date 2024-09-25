import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
    const url = new URL(request.url);
    const queryParams = url.searchParams;
    const action = queryParams.get('action');
    if (action === 'authUser') {
        return await authUser(queryParams);
    } else {
        const messageError = 'Bad request';
        const statusCode = 400;
        return new Response(JSON.stringify({ error: messageError }), { status: statusCode });
    }

}

const authUser = async (queryParams) => {
    const inputEmail = queryParams.get('email');
    const inputPassword = queryParams.get('password');
    let messageError = "";
    let statusCode = 500;
    if (!inputEmail || !inputPassword) {
        messageError = 'You must enter an email and a password';
        statusCode = 400;
        return new Response(JSON.stringify({ error: messageError }), { status: statusCode });
    }
    try {
        const rows = await getUser(inputEmail);
        console.log(rows);
        if (rows.length === 0) {
            messageError = 'Incorrect email or password';
            statusCode = 401;
            return new Response(JSON.stringify({ error: messageError }), { status: statusCode });
        } else if (rows[0].status === 0) {
            messageError = 'Sorry, your account is blocked';
            statusCode = 403;
            return new Response(JSON.stringify({ error: messageError }), { status: statusCode });
        } else {
            const isCorrect = await authenticate(inputPassword, rows[0].password);
            if (isCorrect) {
                statusCode = 200;
                return new Response(JSON.stringify(rows[0].id_user), { status: statusCode });
            } else {
                messageError = 'Incorrect email or password';
                statusCode = 401;
                return new Response(JSON.stringify({ error: messageError }), { status: statusCode });
            }
        }
    } catch (error) {
        console.log(error);
        messageError = "Server error. Please try again later.";
        statusCode = 500;
        return new Response(JSON.stringify({ error: messageError }), { status: statusCode });
    }
}

const getUser = async (email) => {
    try {
        const rows = [await prisma.user.findUnique({
            where: {
                email: email,
            },
        })];
        if(rows[0] === null) {
            return [];
        }
        return rows;
    } catch (error) {
        throw new Error("Server error. Please try again later.");
    }
}

const authenticate = async (inputPassword, hash) => {
    try {
        return await bcrypt.compare(inputPassword, hash);
    } catch (error) {
        throw new Error(error);
    }
}