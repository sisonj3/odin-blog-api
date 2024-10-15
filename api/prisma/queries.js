const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Get all users
async function getUsers() {
    const users = await prisma.user.findMany();

    return users;
}

// Get specific user with id with their profile
async function getUserById(id) {
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
        include: {
            profile: true,
        },
    });

    return user;
}

// Create a new user
async function createUser(name, pass) {
    // Create user with user profile
    await prisma.user.create({
        data: {
            username: name,
            password: pass,
        }
    });

    // Get newly create user
    const user = await prisma.user.findUnique({
        where: { username: name }
    });

    // Create user profile
    await prisma.profile.create({
        data: {
            userId: user.id,
        }
    });
}

// Update user data
async function updateUser(id, name, pass) {
    await prisma.user.update({
        where: {
            id: id,
        },
        data: {
            username: name,
            password: pass,
        }
    });
}

// Delete user with profile
async function deleteUser(id) {
    await prisma.profile.delete({
        where: {
            userId: id,
        }
    });

    await prisma.user.delete({
        where: {
            id: id,
        }
    });
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}