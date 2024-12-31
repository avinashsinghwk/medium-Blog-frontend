import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { BlogType } from "./useBlogs"

export const useSpecificBlogs = () => {
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState<BlogType[]>([])
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/user/blog/myBlogs`, {
            headers: {
                Authorization: localStorage.getItem("mediumBlog_token")
            }
        })
            .then(res => { setBlogs(res.data.posts); setLoading(false) })
            .catch(e => { setLoading(false)})
    }, [])
    return { loading, blogs }
}