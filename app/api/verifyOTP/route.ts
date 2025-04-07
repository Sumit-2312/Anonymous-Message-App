import { NextRequest, NextResponse } from "next/server";
import { verifySchema } from "@/Models-Schemas/zodSchemas/verifySchema";
import { Users } from "@/Models-Schemas/models/user";


export async function POST(request : NextRequest){

    const data = await request.json();
    const correctData = verifySchema.safeParse(data);

    if(!correctData.success){
        return NextResponse.json({
            success: false,
            message: "Please send the correct credentials",
            error: correctData.error.message
        })
    }

    const {OTP,email} = correctData.data;

    // check if the OTP is correct and under the time limit say 10 minutes

    const user = await Users.findOne({email});

    if(!user){
        return NextResponse.json({
            message: "You are not signed Up"
        },{
            status: 404
        }
    )
    }

    if( user.verifyCode != OTP ){
        return NextResponse.json({
            message: "Your OTP is incorrect"
        })
    }
    else {
        const storedDate = new Date(user.verifyCodeExpiry);
        const currentTime = new Date()
        const diff = storedDate.getTime() - currentTime.getTime();

        // Convert to minutes
        const diffInMinutes = diff / (1000 * 60);

        if( diffInMinutes > 10 ){
            return NextResponse.json({
                message: "10 minutes have passed! Try by sending email again"
            })
        }
        else {
            user.isVerified = true;
            await user.save();
            return NextResponse.json({
                message:"Email is verified, You can proceed to log in process"
            })
        }
    }


}