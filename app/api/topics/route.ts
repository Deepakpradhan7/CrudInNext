import connectMongoDB from "@/libs/mongodb"
import Topic from "@/models/topic";
import { NextResponse } from "next/server"

export async function POST(request:any){
    const {title, description} = await request.json()
    try {
        await connectMongoDB();
        await Topic.create({title, description});
        return NextResponse.json({message: 'Topic created.'}, {status: 201})
    } catch (error) {
        console.log('There is an error', error)
        return NextResponse.json({message: 'There is an error'}, {status:500})
    }
}

export async function GET() {
    try{
        await connectMongoDB()
        const topics = await Topic.find()
        return NextResponse.json({topics}, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: 'There is an error'}, {status: 500})
    }
}

export async function DELETE(request:any) {
   
    try {
        const id = request.nextUrl.searchParams.get('id')
        await connectMongoDB();
        await Topic.findByIdAndDelete(id)
        return NextResponse.json({message: 'Topic Deleted'}, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: 'There is an error'}, {status: 500})
    }
}
