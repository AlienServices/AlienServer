import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const data = await req.json();
    console.log(data, "this is the data");

    try {
        // Create the new comment
        const newComment = await prisma.comment.create({
            data: {
                comment: data.comment,
                username: data.userName,
                postId: data.postId,
                userId: data.userId,
                parentId: data.commentId || null,
                vote: data.vote,
            },
        });

        // Fetch the new comment along with its replies
        const commentWithReplies = await prisma.comment.findFirst({
            where: {
                id: newComment.id,
            },
            include: {
                replies: {
                    include: {
                        replies: true, // Include nested replies
                    },
                },
            },
        });

        return NextResponse.json({ comment: commentWithReplies });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}