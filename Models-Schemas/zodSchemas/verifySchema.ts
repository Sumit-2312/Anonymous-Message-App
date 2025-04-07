import {z} from 'zod';

const OTPValidation = z
    .string()
    .min(6,{message:"OTP should  be of minimum 6 characters"})
    .max(6,{message:"OTP should  be of maximum 6 characters"})


const emailValidation = z.string().email()

export  const verifySchema = z.object({
   OTP : OTPValidation,
   email : emailValidation
})