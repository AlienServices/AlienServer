import { PrismaClient } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    const data = await req.json()
    // const id = req.nextUrl.searchParams.get('id')
    console.log(data.status, 'this is the important data')
    try {
        const updateLikes = await prisma.message.update({
            where: {
                id: data.id
            },
            data: {
                conversationId: data.conversationId,
                userId: data.userId,
                content: data.content,
                status: data.status,
                createdAt: data.createdAt,
            },
        })
        return await NextResponse.json({ update: updateLikes });
    } catch (error) {
        console.log(error)
    }
}

// ...(data.messages && { message: data.messages }), 