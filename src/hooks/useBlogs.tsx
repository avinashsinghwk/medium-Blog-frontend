import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"

export type BlogType = {
    id: string,
    title: string,
    content: string,
    createdAt: Date,
    updatedAt: Date,
    authorName: string,
    authorEmail: string,
    authodid: string
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState<BlogType[]>([])
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/user/blog/bulk`)
            .then(res => { setBlogs(res.data.posts); setLoading(false) })
    }, [])
    return { loading, blogs }
}