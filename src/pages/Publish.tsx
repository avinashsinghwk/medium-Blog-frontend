import axios from "axios"
import { AppBar } from "../components/AppBar"
import { BACKEND_URL } from "../config"
import { useState } from "react"
import { postInputType } from "@abhinashsinghwk/mediumblog-zod"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { LoaderFullBlog } from "../components/LoaderFullBlog"
import { useEffect } from "react"
import { BtnLoader } from "../components/BtnLoader"

export const Publish = () => {
    const navigate = useNavigate()
    const [authLoading, auth] = useAuth()
    const [ispublishing, setIsPublishing] = useState<boolean>(false)

    useEffect(() => {
        if(auth == false && authLoading == false){
            navigate('/signup')
        }
    }, [authLoading])

    const [data, setData] = useState<postInputType>({
        title: '',
        content: '',
        published: true
    })
    
    const publishBtnClick = async () => {
        try {
            setIsPublishing(true)
            const res = await axios.post(`${BACKEND_URL}/api/v1/user/blog`, data, {
                headers: {
                    Authorization: localStorage.getItem("mediumBlog_token")
                }
            })
            alert(res.data.message)
            navigate(`/blog/?id=${res.data.post.id}`)
        } catch (e) {
            if (axios.isAxiosError(e)) {
                alert(e.response?.data.message)
            } else {
                alert("Unable to create post")
            }
        } finally{
            setIsPublishing(false)
        }
    }
    if(authLoading){
        return <LoaderFullBlog />
    } else {
        return <div className="flex flex-col gap-5">
        <div>
            <AppBar />
        </div>
        <div className="w-screen flex justify-center">
            <div className="w-full mx-5 md:mx-20 xl:w-2/3 xl:mx-0 border-l-8 border-gray-200 p-4 md:p-8 flex flex-col items-center gap-7">

                <div className="w-full">
                    <input onChange={e => {
                        setData(c => { return {
                            ...c,
                            title : e.target.value
                        }
                        })
                    }} autoFocus autoComplete="off" placeholder="Title" type="text" id="large-input" className="w-full p-4 text-4xl text-gray-900 border-l-2 border-gray-300 rounded-md bg-gray-50 outline-none  " />
                </div>

                <div className="w-full">
                    <textarea onChange={e => {
                        setData(c => { return {
                            ...c,
                            content : e.target.value
                        }
                        })
                    }} className="min-h-96 resize-y p-2.5 w-full text-xl font-sans font-semibold text-gray-900 bg-gray-100 rounded-md border-l-2 border-gray-300 outline-none" placeholder="Write about yourself....."></textarea>
                </div>

                <div>
                    <button onClick={publishBtnClick} type="button" className=" text-white bg-blue-600 hover:bg-blue-800 font-bold rounded-lg text-base px-10 py-3 flex items-center justify-center">{ispublishing ? <BtnLoader /> : 'Publish'}</button>
                </div>
            </div>
        </div>
    </div>
    }
}