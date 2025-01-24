import { BigButton } from "./BigButton"
import { InputBox } from "./InputBox"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { signupInputType } from "@abhinashsinghwk/mediumblog-zod"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { BtnLoader } from "./BtnLoader"

export const SingupForm = () => {
    const [signupInputBody, setSignupInputBody] = useState<signupInputType>({
        name: "",
        email: "",
        password: ""
    })
    const [btnActive, setBtnActive] = useState<boolean>(false)
    const [sendingRequest, setSendingRequestn] = useState<boolean>(false);
    const [passwordVisible, setPasswordVisible] = useState(false)

    const navigate = useNavigate();

    function ActiveBtn() {
        if (signupInputBody.email !== '' && signupInputBody.password !== '' && signupInputBody.name !== '') {
            setBtnActive(true)
        } else {
            setBtnActive(false)
        }
    }

    useEffect(() => {
        ActiveBtn()
    }, [signupInputBody])


    async function btnClick() {
        try {
            if (signupInputBody.name == '' || signupInputBody.email.trim() == '' || signupInputBody.password.trim() == '') {
                alert("Fill the all field")
                return;
            }
            const res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
                email: signupInputBody.email.trim(),
                password: signupInputBody.password.trim(),
                name: signupInputBody.name
            })
            localStorage.setItem('mediumBlog_token', res.data.token)
            navigate("/blog/bulk")
        } catch (e) {
            if (axios.isAxiosError(e)) {
                if (e.message == 'Network Error') {
                    alert("Network error......")
                }
                else {
                    alert(e.response?.data.message)
                }
            } else {
                alert("Unable to signup")
            }
        }
    }

    return <div className="w-full px-4 sm:px-16 md:px-8 md:w-1/2 lg:px-0 h-screen flex flex-col gap-8 items-center justify-center">
        <div>
            <h2 className="font-bold text-3xl">Create an account</h2>
            <h3 className="font-bold text-sm">Already have an account? <Link className="underline text-lg" to={"/signin"}>Login</Link></h3>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col gap-7 items-center justify-center">
            <InputBox passwordVisible={null} setPasswordVisible={null} onChange={(e) => {
                setSignupInputBody(c => {
                    return {
                        ...c,
                        email: e.target.value
                    }
                })
            }} id="signupEmailBox" label="Email:" type="email" placeholder="Enter your email" />
            <InputBox passwordVisible={null} setPasswordVisible={null} onChange={(e) => {
                setSignupInputBody(c => {
                    return {
                        ...c,
                        name: e.target.value
                    }
                })
            }} id="signupNameBox" label="Name:" type="text" placeholder="Enter your name" />
            <InputBox passwordVisible={passwordVisible} setPasswordVisible={setPasswordVisible} onChange={(e) => {
                setSignupInputBody(c => {
                    return {
                        ...c,
                        password: e.target.value
                    }
                })
            }} id="signupPasswordBox" label="Password:" type="password" placeholder="Enter your password" />
            <BigButton btnActive={btnActive} onClick={async () => {
                if (btnActive) {
                    setSendingRequestn(true)
                    setBtnActive(false)
                    await btnClick()
                    setSendingRequestn(false)
                }
            }} text={sendingRequest ? (<BtnLoader />) : "Sign Up"} />
        </div>
    </div>
}