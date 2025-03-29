// this will be used when the someone send the message

import {z} from 'zod';

const usernameValidation = z
    .string()
    .min(10,{message:"Message should of minimum 10 characters"})
    .max(300,{message:"Message should  be of maximum 300 characters"})

const passwordValidation = z
    .string()

const emailValidatoin = z
    .string()
    .email({message: "Email is invalid"})

export  const acceptMessageSchema = z.object({
    username: usernameValidation,
    password : passwordValidation,
    email : emailValidatoin
})