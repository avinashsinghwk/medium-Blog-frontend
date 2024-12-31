import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { AppBar } from "../components/AppBar"
import { LoaderFullBlog } from "../components/LoaderFullBlog"
import { useEffect } from "react"
import { useSpecificBlogs } from "../hooks/useSpecificBlogs"
import { BlogCard } from "../components/BlogCard"

export default function Myblogs() {
    const navigate = useNavigate()
    const [authLoading, auth] = useAuth()

    useEffect(() => {
        if (auth == false && authLoading == false) {
            navigate('/signup')
        }
    }, [authLoading])

    const { loading, blogs } = useSpecificBlogs()

    if (authLoading) {
        return <LoaderFullBlog />
    }
    else if (loading) {
        return <div>
            <div>
                <AppBar />
            </div>
            <div className="flex justify-center">
                <LoaderFullBlog />
            </div>
        </div>
    }
    else
        return <div>
            <div>
                <AppBar />
            </div>
            {
                blogs !== undefined ?
                    <div className="flex flex-col gap-3 items-center">
                        {blogs.map(b => {
                            return <>
                                <BlogCard blogId={b.id} key={b.id} publishDate={b.createdAt.toString().substring(0, 10)} authorname={b.authorName} title={b.title} content={b.content} />
                                <div className="flex justify-around w-full sm:w-4/5 lg:w-3/5 xl:w-2/5">
                                    <button className="w-24 py-2 bg-red-800 text-white font-bold">Delete</button>
                                    <button className="py-2 w-24 bg-green-800 text-white font-bold">Edit</button>
                                </div>
                            </>
                        })}
                    </div> :
                    <div className="font-bold text-3xl text-gray-700 text-center">
                        No posts found...
                    </div>
            }

        </div>
}