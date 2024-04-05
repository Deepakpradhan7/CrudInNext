'use client'
import { useRouter } from "next/navigation";
import {  Fragment } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { z } from 'zod'
import { FormDataSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";



const NewSchema = z.object({
    name: z
    .string()
    .nonempty('This field is required')
    .min(2, {message:'Should be 3 character'}),
    email_id: z
    .string()
    .nonempty('This is required')
    .email({
        message: 'Invalid id'
    }),
    mobile: z
    .string()
    .nonempty('Required')
    .refine((value) => {
        return /^\d{10}$/.test(value);
    }, {
        message: "Invalid mobile number.",
    }),
})

type Inputs = z.infer<typeof NewSchema>

export default function AddTopic(){

    const {register, handleSubmit, formState: {errors}, watch} = useForm<z.infer <typeof NewSchema>>({
        resolver: zodResolver(NewSchema)
    })
    const router = useRouter()

    const onSubmit = async (data: any)=>{
    try{
       const res = await fetch('http://localhost:3000/api/topics',{
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
         <Fragment>
         {/* <form onSubmit={handleSubmit(onSubmit)} action="" className="flex flex-col gap-3">
             <input {...register('title')} type="text" placeholder="Topic Title" className="w-full rounded-md border border-gray-600 px-8 py-2" />
             {errors.title?.message && (
                 <span className="text-red-500">{errors.title.message}</span>
             )}
             <input  {...register('description')} type="text"  placeholder="Topic Description" className="w-full rounded-md border border-gray-600 px-8 py-2" />
             {errors.description?.message && (
                 <span className="text-red-500">{errors?.description?.message}</span>
             )}
             <button type="submit" className="bg-green-600 rounded-sm py-2 px-3 w-fit text-white font-bold">Add Topic</button>
         </form> */}

         <form onSubmit={handleSubmit(onSubmit)}  className="flex flex-col gap-3">
             <input {...register('name')} type="text" placeholder="Name" className="w-full rounded-md border border-gray-600 px-8 py-2" />
             {errors.name?.message && (
                 <span className="text-red-500">{errors.name.message}</span>
             )}
             <input  {...register('email_id')} type="text"  placeholder="Email" className="w-full rounded-md border border-gray-600 px-8 py-2" />
             {errors.email_id?.message && (
                 <span className="text-red-500">{errors?.email_id?.message}</span>
             )}
              <input  {...register('mobile')} type="tel"  placeholder="Mobile number" className="w-full rounded-md border border-gray-600 px-8 py-2" />
             {errors.mobile?.message && (
                 <span className="text-red-500">{errors?.mobile?.message}</span>
             )}
             <button type="submit" className="bg-green-600 rounded-sm py-2 px-3 w-fit text-white font-bold">Add Topic</button>
         </form>
     </Fragment>
    )
}