
import { EmailTemplate } from "@/components/email-template";
import { resend } from "./resendEmailFunction";
import GenerateOTP from "./OTP-generator";
import { Users } from "@/Models-Schemas/models/user";

export default async function SendMail(username:any,email:any){

    const OTP = GenerateOTP();

    const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [email],
        subject: 'Verify your Account',
        react: EmailTemplate({username,OTP}),
      });

      if( error ){
        return {error,data};
      }

      // data looks like 
      // {
      //   success: true,
      //   message: "Verification email resent successfully.",
      //   email: "user@example.com",
      // }

       // Convert timestamp to Date and add 10 minutes
  const expiryTime = new Date(Date.now() + 10 * 60000); // Add 10 minutes

      const user = await Users.updateOne({
        email
      },{
        $set : 
          {
           verifyCode:  OTP,
           verifyCodeExpiry: expiryTime 
          }
      })

     return {error,data}
}

