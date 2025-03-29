
import { EmailTemplate } from "@/components/email-template";
import { resend } from "./resendEmailFunction";
import GenerateOTP from "./OTP-generator";

export default async function SendMail(username:any,email:any){

    const OTP = GenerateOTP();

    const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [email],
        subject: 'Verify your Account',
        react: EmailTemplate({username,OTP}),
      });
     
     return {error,data}
}