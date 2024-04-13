'use client'
import { useRouter } from "next/navigation";
import {  Fragment } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { z } from 'zod'
import { FormDataSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";

type Inputs = z.infer<typeof FormDataSchema>

export default function AddTopic(){

    const {register, handleSubmit, formState: {errors}, watch} = useForm<z.infer<typeof FormDataSchema>>({
        resolver: zodResolver(FormDataSchema)
    })
    
    const router = useRouter()

    const onSubmit = async (data: any)=>{
    try{
       const res = await fetch('https://next-crudex.vercel.app/api/topics',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body : JSON.stringify((data))
        });
        if (res.ok){  
            router.push('/')
            router.refresh()
            toast.success('Topic Added')

        } else{
            throw new Error ("Failed to create Topic")
        }
    } catch (error){
        console.log(error)
    }
 }
    
    return(
         <>
          <form onSubmit={handleSubmit(onSubmit)} action="" className="flex flex-col gap-3">
             <input {...register('title')} type="text" placeholder="Topic Title" className="w-full rounded-md border border-gray-600 px-8 py-2" />
             {errors.title?.message && (
                 <span className="text-red-500">{errors.title.message}</span>
             )}
             <input  {...register('description')} type="text"  placeholder="Topic Description" className="w-full rounded-md border border-gray-600 px-8 py-2" />
             {errors.description?.message && (
                 <span className="text-red-500">{errors?.description?.message}</span>
             )}
             <button type="submit" className="bg-green-600 rounded-sm py-2 px-3 w-fit text-white font-bold">Add Topic</button>
         </form> 

        
     </>
    )
}