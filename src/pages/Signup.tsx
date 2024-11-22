import { Quote } from "../components/Quote"
import { SingupForm } from "../components/SignupForm"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export default function Signup(){
    const navigate = useNavigate()
    const auth = useAuth()
    if(auth){
        navigate('/blog/bulk')
    }
    return <div className="w-screen h-screen flex items-center justify-center">
        <SingupForm />
       <Quote quote="The customer service I received was exceptional. The support team went above and beyond to address my concerns." writer="Avinash Kumar Singh" designation="CEO | Amoha tv" />
    </div>
}