import { useEffect, useState } from "react"
import { BlogType } from "./useBlogs";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const useBlog = (id: string) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<BlogType>()
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/user/blog/${id}`)
            .then(res => {
                setBlog(res.data.post)
                setLoading(false)
            })
    }, [id])
    return { loading, blog }
}