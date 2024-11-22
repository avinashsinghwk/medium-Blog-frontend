import { Quote } from "../components/Quote"
import { SigninForm } from "../components/SigninForm"

export default function Signin() {
    return <div className="w-screen h-screen flex items-center justify-center">
        <SigninForm />
        <Quote quote="The customer service I received was exceptional. The support team went above and beyond to address my concerns." writer="Avinash Kumar Singh" designation="CEO | Amoha tv" />
    </div>
}
