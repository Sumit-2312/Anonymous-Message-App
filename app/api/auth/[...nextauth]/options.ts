import { Users } from "@/Models-Schemas/models/user";
import CredentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import  connect  from "@/Models-Schemas/models/dbconnect";

export const authOptions= {
    providers:[
        CredentialProvider({
            name: "Gmail",
            credentials:{
                username: {label: "username", type: "text"},
                password : {label: "password", type: "password"},
                email: {label: "Email",type: "text"}
            },
            async authorize(credentials:any,req){
                const db = await connect();
                if(!db){
                    console.error("Not connected to the database")
                    return null;
                }
                const user = await Users.findOne({email:credentials.email});
                if(!user){
                    return null;
                }

                if(user.password != credentials.password){
                    return null;
                }
                else {
                    return {
                        id:user._id,
                        username: user.username,
                        email: user.email
                    };
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks:{
        async jwt({token,user}:{token:any,user:any}){
            // user here is the retured value of the authorize function
            if (user) {  
                    // The jwt() callback runs twice:
                    // First, when the user signs in → user is defined.
                    // Later (e.g., refreshing session) → user is undefined.
                token.userId = user.id;
                token.username = user.username;
                token.email = user.email;
              }
            return token;
        },
        async session({session,token}:{session:any,token:any}){
            session.user.userId = token.userId,
            session.user.username = token.username,
            session.user.email = token.email
            return session;
        }
    }
}
