import { useEffect } from "react"
import { LoaderFullBlog } from "../components/LoaderFullBlog"
import { Quote } from "../components/Quote"
import { SigninForm } from "../components/SigninForm"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"

export default function Signin() {
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
        <SigninForm />
        <Quote quote="The customer service I received was exceptional. The support team went above and beyond to address my concerns." writer="Avinash Kumar Singh" designation="CEO | Amoha tv" />
    </div>
    }
}
