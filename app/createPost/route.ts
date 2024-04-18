import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    const data = await req.json()
    console.log(data, 'this is the data I need')
    
    try {
        const test = await prisma.posts.create({
            data: {
                description: data.content,
                title: data.title,
                email: data.email
            }
        })
        return NextResponse.json({ hello: test });
    } catch (error) {
        console.log(error)
    }
    // console.log(req, "testing info")

}   