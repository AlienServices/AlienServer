import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const postId = req.nextUrl.searchParams.get('postId');
    const userId = req.nextUrl.searchParams.get('userId'); 
    try {        
        const userVote = await prisma.vote.findFirst({
            where: {
                postId: postId ? postId : undefined,
                userId: userId ? userId : undefined,
            },
        });

        if (!userVote) {            
            return NextResponse.json({ error: 'Vote not found' }, { status: 404 });
        }        
        return NextResponse.json({ userVote });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}