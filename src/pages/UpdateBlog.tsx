import axios from "axios"
import { AppBar } from "../components/AppBar"
import { BACKEND_URL } from "../config"
import { useState } from "react"
import { postInputType } from "@abhinashsinghwk/mediumblog-zod"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { LoaderFullBlog } from "../components/LoaderFullBlog"
import { useEffect } from "react"
import { BtnLoader } from "../components/BtnLoader"

export const UpdateBlogPage = () => {
    const navigate = useNavigate()
    const [authLoading, auth] = useAuth()
    const [isupdating, setIsupdating] = useState<boolean>(false)
    const [blogfetching, setBlogfetching] = useState(true)
    const { id } = useParams()
    const [data, setData] = useState<postInputType>({
        title: '',
        content: '',
        published: true
    })

    useEffect(() => {
        if (auth == false && authLoading == false) {
            navigate('/signup')
        }
    }, [authLoading])

    useEffect(() => {
        async function blogfetcher() {
            try {
                setBlogfetching(true)
                const res = await axios.get(`${BACKEND_URL}/api/v1/user/blog/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem("mediumBlog_token")
                    }
                })
                setData(d => ({
                    ...d,
                    title: res.data.post.title,
                    content: res.data.post.content
                }))
                setBlogfetching(false)
            } catch (e) {
                setBlogfetching(false)
                navigate('/blog/bulk')
                console.log(e)
            }
        }
        blogfetcher()
    }, [])

    const updateBtnClick = async () => {
        try {
            setIsupdating(true)
            const res = await axios.put(`${BACKEND_URL}/api/v1/user/blog/${id}`, data, {
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
                alert("Unable to update post")
            }
        } finally {
            setIsupdating(false)
        }
    }
    if (authLoading) {
        return <LoaderFullBlog />
    }
    else if (blogfetching || data.title === '' || data.content === '') {
        return <div>
            <div>
                <AppBar />
            </div>
            <div className="flex justify-center">
                <LoaderFullBlog />
            </div>
        </div>
    } else {
        return <div className="flex flex-col gap-5">
            <div>
                <AppBar />
            </div>
            <div className="w-screen flex justify-center">
                <div className="w-full mx-5 md:mx-20 xl:w-2/3 xl:mx-0 border-l-8 border-gray-200 p-4 md:p-8 flex flex-col items-center gap-7">

                    <div className="w-full">
                        <input
                            value={data.title}
                            onChange={e => {
                                setData(c => {
                                    return {
                                        ...c,
                                        title: e.target.value
                                    }
                                })
                            }} autoFocus autoComplete="off" placeholder="Title" type="text" id="large-input" className="w-full p-4 text-4xl text-gray-900 border-l-2 border-gray-300 rounded-md bg-gray-50 outline-none  " />
                    </div>

                    <div className="w-full">
                        <textarea
                            value={data.content}
                            onChange={e => {
                                setData(c => {
                                    return {
                                        ...c,
                                        content: e.target.value
                                    }
                                })
                            }} className="min-h-96 resize-y p-2.5 w-full text-xl font-sans font-semibold text-gray-900 bg-gray-100 rounded-md border-l-2 border-gray-300 outline-none" placeholder="Write about yourself....."></textarea>
                    </div>

                    <div>
                        <button onClick={updateBtnClick} type="button" className=" text-white bg-blue-600 hover:bg-blue-800 font-bold rounded-lg text-base px-10 py-3 flex items-center justify-center">{isupdating ? <BtnLoader /> : 'Update'}</button>
                    </div>
                </div>
            </div>
        </div>
    }
}