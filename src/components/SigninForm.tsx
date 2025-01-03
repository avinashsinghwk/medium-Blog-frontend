import { BigButton } from "./BigButton"
import { InputBox } from "./InputBox"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { signinInputType } from "@abhinashsinghwk/mediumblog-zod"
import axios from "axios"
import { BACKEND_URL } from "../config"

export const SigninForm = () => {
    const [signinInputBody, setSigninInputBody] = useState<signinInputType>({
        email : "",
        password: ""
    })
    const navigate = useNavigate();

    async function btnClick(){
        try{
            if(signinInputBody.email.trim() == '' || signinInputBody.password.trim() == ''){
                alert("Fill the all field")
                return;
            }
            const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
                email : signinInputBody.email,
                password : signinInputBody.password
            })
            localStorage.setItem('mediumBlog_token', res.data.token)
            navigate("/blog/bulk")
        } catch(e){
            if (axios.isAxiosError(e)) {
                alert(e.response?.data.message)
               } else{
                  alert("Unable to signin")
               }
        }
    }

    return <div className="w-full px-4 sm:px-16 md:px-8 md:w-1/2 lg:px-0 h-screen flex flex-col gap-8 items-center justify-center">
        <div>
        <h2 className="font-bold text-3xl">Login to account</h2>
        <h3 className="font-bold text-sm">Do your have an account? <Link className="underline text-lg" to={"/signup"}>Signup</Link></h3>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col gap-7 items-center justify-center">
        <InputBox onChange={(e)=>{
            setSigninInputBody(c => {
                return {
                    ...c,
                    email : e.target.value
                }
            })
        }} id="signinEmailBox" label="Email:" type="email" placeholder="Enter your email" />
        <InputBox onChange={(e)=>{
            setSigninInputBody(c => {return {
                ...c,
                password : e.target.value
            }})
        }} id="signinPasswordBox" label="Password:" type="password" placeholder="Enter your password" />
        <BigButton onClick={btnClick} text="Sign In" />
        </div>
    </div>
}