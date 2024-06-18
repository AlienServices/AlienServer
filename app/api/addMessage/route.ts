import { PrismaClient } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    const data = await req.json()
    const id = req.nextUrl.searchParams.get('id')
    console.log(data.messages, 'this is the important data')    
    try {
        const updateLikes = await prisma.messages.create({
            data: {
                message: data.messages,
                users: data.users,
                me: data.me,
                roomName: data.roomName,
                recipient: data.recipient,
                date: new Date
            },
        })
        return await NextResponse.json({ update: updateLikes });
    } catch (error) {
        console.log(error)
    }
}   