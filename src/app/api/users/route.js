import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

export async function GET(request) {
    const url = new URL(request.url);
    const queryParams = url.searchParams;
    const action = queryParams.get('action');
    if (action === 'getUsers') {
        return await getUsers();
    } else if (action === 'getUser') {
        return await getUser(queryParams);
    } else if (action === 'getBlockedUsers') {
        return await getBlockedUsers();
    } else if (action === 'getActiveUsers') {
        return await getActiveUsers();
    } else {
        const messageError = 'Bad request';
        const statusCode = 400;
        return new Response(JSON.stringify({ error: messageError }), { status: statusCode });
    }
}

export async function POST(request) {
    const { name, email, lastLoginTime, registerTime, status, password } = await request.json();
    if (!name || !email || !password) {
        return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }
    let statusCode = 500;
    try {
        const hashedPassword = await getHashedPassword(password);
        const result = await prisma.user.create({
            data: {
                name: name,
                email: email,
                last_login_time: lastLoginTime,
                register_time: registerTime,
                status: status,
                password: hashedPassword
            }
        });
        statusCode = 200;
        return new Response(JSON.stringify(result), { status: statusCode });
    } catch (error) {
        let messageError = "";
        if (error.code === 'P2002') {
            messageError = 'Email already exists';
            statusCode = 409;
        } else {
            messageError = "Server error. Please try again later.";
            statusCode = 500;
        }
        return new Response(JSON.stringify({ error: messageError }), { status: statusCode });
    }
}

export async function DELETE(request) {
    const { ids } = await request.json();
    let statusCode = 500;
    try {
        const result = await prisma.user.deleteMany({
            where: {
                id_user: {
                    in: ids
                }
            }
        });
        statusCode = 200;
        return new Response(JSON.stringify(result), { status: statusCode });
    } catch (error) {
        const messageError = "Server error. Please try again later.";
        statusCode = 500;
        return new Response(JSON.stringify({ error: messageError }), { status: statusCode });
    }
}

export async function PUT(request) {
    const { users } = await request.json();
    let statusCode = 500;
    try {
        const results = users.map((user) => {
            const newData = {
                ...(user.name && { name: user.name }),
                ...(user.email && { email: user.email }),
                ...(user.lastLoginTime && { last_login_time: user.lastLoginTime }),
                ...(user.registerTime && { register_time: user.registerTime }),
                ...(user.statusUser !== undefined && { status: user.statusUser }),
                ...(user.password ? { password: getHashedPassword(user.password) } : undefined),
            };
            if (user.password) {
                return getHashedPassword(user.password).then((hashedPassword) => {
                    newData.password = hashedPassword;
                    return prisma.user.update({
                        where: { id_user: user.idUser },
                        data: newData
                    });
                });
            }
            return prisma.user.update({
                where: { id_user: user.idUser },
                data: newData
            });
        });
        const result = await prisma.$transaction(results);
        statusCode = 200;
        return new Response(JSON.stringify(result), { status: statusCode });
    } catch (error) {
        let messageError = "";
        if(error.code === 'P2002') {
            messageError = 'Email already exists';
            statusCode = 409;
        } else {
            messageError = "Server error. Please try again later.";
            statusCode = 500;
        }
        return new Response(JSON.stringify({ error: messageError }), { status: 500 });
    }
}

const getUsers = async () => {
    let statusCode = 500;
    try {
        const rows = await prisma.user.findMany({
            select: { id_user: true, name: true, email: true, last_login_time: true, register_time: true, status: true }
        });
        statusCode = 200;
        return new Response(JSON.stringify(rows), { status: statusCode });
    } catch (error) {
        const messageError = "Server error. Please try again later.";
        statusCode = 500;
        return new Response(JSON.stringify({ error: messageError }), { status: statusCode });
    }
}

const getUser = async (queryParams) => {
    const id = parseInt(queryParams.get('id'));
    let statusCode = 500;
    try {
        const rows = [await prisma.user.findUnique({
            where: { id_user: id },
            select: { id_user: true, name: true, email: true, last_login_time: true, register_time: true, status: true }
        })];

        if(rows[0] === null) {
            rows.pop();
        }
        statusCode = 200;
        return new Response(JSON.stringify(rows), { status: statusCode });
    } catch (error) {
        const messageError = "Server error. Please try again later.";
        statusCode = 500;
        return new Response(JSON.stringify({ error: messageError }), { status: statusCode });
    }
}

const getBlockedUsers = async () => {
    let statusCode = 500;
    try {
        const rows = await prisma.user.findMany({
            where: { status: 0 },
            select: { id_user: true, name: true, email: true, last_login_time: true, register_time: true, status: true }
        });
        statusCode = 200;
        return new Response(JSON.stringify(rows), { status: statusCode });
    } catch (error) {
        const messageError = "Server error. Please try again later.";
        statusCode = 500;
        return new Response(JSON.stringify({ error: messageError }), { status: statusCode });
    }
}

const getActiveUsers = async () => {
    let statusCode = 500;
    try {
        const rows = await prisma.user.findMany({
            where: { status: 1 },
            select: { id_user: true, name: true, email: true, last_login_time: true, register_time: true, status: true }
        });
        statusCode = 200;
        return new Response(JSON.stringify(rows), { status: statusCode });
    } catch (error) {
        const messageError = "Server error. Please try again later.";
        statusCode = 500;
        return new Response(JSON.stringify({ error: messageError }), { status: statusCode });
    }
}

const getHashedPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}
