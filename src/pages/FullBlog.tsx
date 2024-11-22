import { AppBar } from "../components/AppBar"
import { useBlog } from "../hooks/useBlog"
import { useNavigate, useSearchParams } from "react-router-dom"
import { FullBlogCard } from "../components/FullBlogCard"
import { LoaderFullBlog } from "../components/LoaderFullBlog"
import { useAuth } from "../hooks/useAuth"

export const FullBlog = () => {
    const navigate = useNavigate()
    const auth = useAuth()
    if(!auth){
        navigate('/signup')
    }
    const [searchParams] = useSearchParams()
    const id = searchParams.get("id")
    const {loading, blog} = useBlog(id || "")
    if(loading || blog == undefined){
        return <div>
            <div>
                <AppBar />
            </div>
            <div className="flex justify-center">
                <LoaderFullBlog />
            </div>
        </div>
    } else {
        return <div>
            <div>
                <AppBar />
            </div>
            <div className="flex gap-3 items-center">
                <FullBlogCard blogId={blog.id} content={blog.content} title={blog.title} publishDate={blog.createdAt.toString().substring(0, 10)} authorname={blog.authorName} />
            </div>
        </div>
    }
}