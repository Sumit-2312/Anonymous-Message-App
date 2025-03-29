// this will be used when the someone send the message

import {z} from 'zod';

const messageValidation = z
    .string()
    .min(10,{message:"Message should of minimum 10 characters"})
    .max(300,{message:"Message should  be of maximum 300 characters"})

export const MessageSchema = z.object({
    message: messageValidation,
    userId : z.string()
})