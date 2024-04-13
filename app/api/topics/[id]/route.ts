import connectMongoDB from "@/libs/mongodb"
import Topic from "@/models/topic"
import { NextResponse } from "next/server"

export async function PUT(request:any ,{params}:any) {
    const { id } = params
    try {
        const {title: title, description: description} = await request.json();
        await connectMongoDB()
        await Topic.findByIdAndUpdate(id, {title, description})
        return NextResponse.json('Topic updated')
    } catch (error) {
       console.log(error) 
       return NextResponse.json({message: 'There is an error'}, {status: 200})
    }
    
}

export async function GET(request:any, {params}:any) {
    const {id} = params
    try {
        await connectMongoDB()
        const topic = await Topic.findOne({_id: id})
        return NextResponse.json({topic}, {status: 200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "There is an error"}, {status: 500})
    }   
}