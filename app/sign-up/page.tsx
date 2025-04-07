'use client';

import Input from "@/components/Input-component"
import Button from "@/components/Button"
import { useState } from "react";
export default function SignUp(){
const [username,setUsername] = useState(null);
const [password,setPassword] = useState(null);
const [email,setEmail] = useState(null);

const handleClick = async()=>{
    const response = await axios.post(process.env.APP_API);
}

const onChange = ()=>{
    
}
 

    return (
        <div className="h-screen w-screen bg-zinc-100 flex items-center justify-center ">
                <div className="card h-fit flex flex-col w-fit gap-5 p-10 rounded-xl bg-white items-center">
                    <Input type={"text"} placeholder={"Username"} label={"Username"} />
                    <Input type={"text"} placeholder={"Email"} label={"Email"} />
                    <Input type={"password"} placeholder={"password"} label={"Password"} />
                    <Button onclick={handleClick} text={"SignIn"} />
                </div>
        </div>
    )
}