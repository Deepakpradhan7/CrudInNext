'use client'
import { Fragment } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { FormDataSchema } from "@/lib/schema";
import toast from "react-hot-toast";

type Inputs = z.infer<typeof FormDataSchema>

export default function EditTopicForm({ id, title, description }: any) {
    const { register, handleSubmit,watch, formState: { errors } } = useForm<z.infer <typeof FormDataSchema>>({
        resolver: zodResolver(FormDataSchema)
    });
    const router = useRouter();

    const onSubmit = async (data: any) => {
        try {
            const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
                method: "PUT",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (!res.ok) {
                throw new Error('Failed to update Topic')
            }
           if (res.ok) {
            toast.success('Topic updated')
            router.push('/');
            router.refresh();
           } else {
            toast.error('Failed to update Topic.')
           }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Fragment>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                <input
                    {...register('title')}
                    defaultValue={title} // Set default value here
                    type="text"
                    placeholder="Topic Title"
                    className="w-full rounded-md border border-gray-600 px-8 py-2"
                />
                {errors.title?.message && (
                    <span className="text-red-500">{errors.title.message}</span>
                )}

                <input
                    {...register('description')}
                    defaultValue={description} // Set default value here
                    type="text"
                    placeholder="Topic Description"
                    className="w-full rounded-md border border-gray-600 px-8 py-2"
                />
                {errors.description?.message && (
                    <span className="text-red-500">{errors.description.message}</span>
                )}

                <button type="submit" className="bg-green-600 rounded-md py-2 px-3 w-fit text-white font-bold">Update Topic</button>
            </form>
        </Fragment>
    )
}
