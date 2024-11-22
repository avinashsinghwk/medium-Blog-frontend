import { Quote } from "../components/Quote"
import { SigninForm } from "../components/SigninForm"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"

export default function Signin() {
    const navigate = useNavigate()
    const auth = useAuth()
    if(auth){
        navigate('/blog/bulk')
    }
    return <div className="w-screen h-screen flex items-center justify-center">
        <SigninForm />
        <Quote quote="The customer service I received was exceptional. The support team went above and beyond to address my concerns." writer="Avinash Kumar Singh" designation="CEO | Amoha tv" />
    </div>
}
