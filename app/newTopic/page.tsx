'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { Form, useForm } from 'react-hook-form'
import { z } from 'zod'

const FormSchema= z.object({
    name: z
    .string()
    .nonempty('Required')
    .min(2, {message:"should be at least 2 character"}),
    email:z 
    .string()
    .nonempty('Required')
    .email({
        message: 'invalid id'
    }),
    mobile: z
    .string()
    .nonempty('Required')
    .refine((value) => {
        return /^\d{10}$/.test(value);
    }, {
        message: "Invalid mobile number.",
    }),
    graduated: z.enum(["Yes", "No"])
})

const NewTopic = () => {
    const {handleSubmit,register, formState:{errors}} = useForm<z.infer <typeof FormSchema>>({
        resolver: zodResolver(FormSchema)
    })
    const onSubmit =()=>{
        
    }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
        <input className='border border-gray-600 px-4 py-2 rounded-md w-full' type='text' placeholder='name' {...register('name')}/>
        {
            errors.name?.message && 
            <span className='text-sm text-red-500'>{errors.name?.message}</span>
        }
                <input className='border border-gray-600 px-4 py-2 rounded-md w-full' type='text' placeholder='Email' {...register('email')}/>
        {
            errors.email?.message && 
            <span className='text-sm text-red-500'>{errors.email.message}</span>
        }
         <input className='border border-gray-600 px-4 py-2 rounded-md w-full' type='tel' placeholder='Mobile' {...register('mobile')}/>
        {
            errors.mobile?.message && 
            <span className='text-sm text-red-500'>{errors.mobile.message}</span>
        }
        <input {...register("graduated")} type="radio" value="Yes" />
      <input {...register("graduated" )} type="radio" value="No" />
        {
            errors.graduated?.message && 
            <span className='text-sm text-red-500'>{errors.graduated.message}</span>
        }
    <button type='submit' className='bg-green-500 text-white w-fit px-4 py-2 font-bol rounded-md my-2'>Submit</button>
      </form>
    </div>
  )
}

export default NewTopic
