import { useNavigate } from "react-router-dom"

export default function Menu({refName}: {refName: any}){
    const navigate = useNavigate()

    function logoutBtnClick(){
        localStorage.removeItem('mediumBlog_token')
        navigate('/signup')
    }
    return <div ref={refName} className="absolute w-48 h-24 bg-gray-800 top-16 p-5 flex flex-col gap-2 rounded-md hidden">
        <a className="font-bold text-white hover:text-gray-200" href="/myblogs">Your Blogs</a>
        <div onClick={logoutBtnClick} className="font-bold text-white hover:text-gray-200 cursor-pointer">Log out</div>
    </div>
}