import { Quote } from "../components/Quote"
import { SingupForm } from "../components/SignupForm"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { LoaderFullBlog } from "../components/LoaderFullBlog"
import { useEffect } from "react"

export default function Signup(){
    const navigate = useNavigate()
    const [authLoading, auth] = useAuth()

    useEffect(()=> {
            if(auth == true && authLoading == false){
                navigate('/blog/bulk')
            }
        }, [authLoading])

    if(authLoading){
        return <LoaderFullBlog />
    } else {
        return <div className="w-screen h-screen flex items-center justify-center">
        <SingupForm />
       <Quote quote="The customer service I received was exceptional. The support team went above and beyond to address my concerns." writer="Avinash Kumar Singh" designation="CEO | Amoha tv" />
    </div>
    }
    
}