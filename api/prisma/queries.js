const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Get all users
async function getUsers() {
    const users = await prisma.user.findMany();

    return users;
}

// Get specific user with id with their profile
async function getUserByUsername(name) {
    const user = await prisma.user.findUnique({
        where: {
            username: name,
        },
        include: {
            profile: true,
        }
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

// Read all posts
async function readPosts() {
    const posts = await prisma.post.findMany();

    return posts;
}

// Read post based on post id
async function readPostById(id) {
    const post = await prisma.post.findUnique({
        where: {
            id: id,
        },
    });

    return post;
}

// Create post
async function createPost(profileId, title, text) {
    await prisma.post.create({
        data: {
            title: title,
            text: text,
            authorId: profileId,
        }
    });
}

// Update post
async function updatePost(id, newTitle, newText) {
    await prisma.post.update({
        where: {
            id: id,
        },
        data: {
            title: newTitle,
            text: newText,
        },
    });
}

// Delete post
async function deletePost(id) {
    await prisma.post.delete({
        where: {
            id: id,
        },
    });
}

// Read all comments
async function readComments() {
    const comments = await prisma.comment.findMany();

    return comments;
}

// Read all comments by author
async function readCommentsFromAuthor(authorId) {
    const comments = await prisma.comment.findMany({
        where: {
            authorId: authorId,
        },
    });

    return comments;
}

// Read all comments from post
async function readCommentsFromPost(postId) {
    const comments = await prisma.comment.findMany({
        where: {
            postId: postId,
        },
    });

    return comments;
}

// Read comment by id
async function readCommentById(id) {
    const comment = await prisma.comment.findUnique({
        where: {
            id: id,
        },
    });

    return comment;
}

// Create comment
async function createComment(authorId, postId, text) {
    await prisma.comment.create({
        data: {
            text: text,
            authorId: authorId,
            postId: postId,
        }
    });
}

// Update comment
async function updateComment(id, text) {
    await prisma.comment.update({
        where: {
            id: id,
        },
        data: {
            text: text,
        },
    });
}

// Delete comment
async function deleteComment(id) {
    await prisma.comment.delete({
        where: {
            id: id,
        },
    });
}

// Read profile
async function readProfile(userId) {
    const profile = await prisma.profile.findUnique({
        where: {
            userId: userId,
        },
        include: {
            posts: true,
            comments: true,
        }
    });

    return profile
}

module.exports = {
    getUsers,
    getUserByUsername,
    createUser,
    updateUser,
    deleteUser,
    readPosts,
    readPostById,
    createPost,
    updatePost,
    deletePost,
    readComments,
    readCommentsFromAuthor,
    readCommentsFromPost,
    readCommentById,
    createComment,
    updateComment,
    deleteComment,
    readProfile,
}