import { NextRequest, NextResponse } from "next/server";
import connect from '@/Models-Schemas/models/dbconnect';
import { Users } from "@/Models-Schemas/models/user";
import { signupSchema } from "@/Models-Schemas/zodSchemas/singnUpSchema";
import SendMail from "@/helpers/resendSendOTP";


// NextResponse provide additional features over the native Response class of nextjs, it actually extens the Request API and provided additional features over Request
export  async function POST(request: NextRequest){

    // two cases could be there 
    // 1- the user is already signup 
        //  a>  Not verified
        //  b>  verified 
    // 2- the user is not signed up

    // first we will check if the user is signup or not by checking his entry in the database
    // the first step is to connect to the database due to hot reloading in the nextjs

    const connection = await connect();
    if(!connection){
        NextResponse.json({
            success: false,
            message: 'Database is not connected'
        },{
            status: 404
        })
    }
    // if the database is connected check if the user is present in the database or not
    const data =  await request.json();
    const correctData = signupSchema.safeParse(data);

    if(correctData.error){
       return NextResponse.json({
            success: false,
            message: "Please send the correct credentials",
            error: correctData.error.message
        })
    }
    
    const {username, email, password} = correctData.data;
    const user = await Users.findOne({
        username,
        email
    })

    if(!user){
        // if the user is not in database we create one entry 
        // for now we are not bcypting the password and storing the password directly
        const user = await Users.create({
            username,
            email,
            password
        })

      return  NextResponse.json({
            success: true,
            message: "You are signed up! Please login now"
        })
    }
    // following code will run if the users data is already present in the database
    // now if the user is verified then we simply return 
    // else we update the details provided by the user now and send an email for the verification

    if( user.isVerified ){
        return NextResponse.json({
            success: true,
            message: "You are already signed up! please Login"
        })
    }
    else{
        // here we need to send the OTP to the email of the user provided by him
        // this could be done by the help of resend Email which allows to send the email 


        const {error,data} = await SendMail(username,email);
        if( error ){
           return NextResponse.json({
                success: false,
                message: "Error while sending Email. Please try again later!"
            })
        }

        return NextResponse.json({
            success: true,
            message: "Email is sent! Please verify to continue"
        })
    }
    
}