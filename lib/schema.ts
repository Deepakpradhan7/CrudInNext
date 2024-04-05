import { z } from 'zod'

export const FormDataSchema = z.object({
    title:z
    .string()
    .nonempty('Title is required')
    .min(4, {message: 'Title Should be at least 4 character'}),
    description: z
    .string()
    .nonempty('Description is required')
    .min(4, {message: 'Description Should be at least 4 character'}),
})
