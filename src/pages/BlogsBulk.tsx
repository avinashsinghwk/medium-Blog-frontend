import { BlogCard } from "../components/BlogCard"
import { AppBar } from "../components/AppBar"
import { useBlogs } from "../hooks/useBlogs"
import { SkletonBlogBulk } from "../components/SkletonBlogBulk"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"

export default function BlogsBulk() {
    const navigate = useNavigate()
    const auth = useAuth()
    if(!auth){
        navigate('/signup')
    }
    const { loading, blogs } = useBlogs()
    if (loading) {
        return <div>
            <div>
                <AppBar />
            </div>
            <div className="flex justify-center">
                <SkletonBlogBulk />
            </div>
        </div>
    } else {
        return <div>
            <div>
                <AppBar />
            </div>
            <div className="flex flex-col gap-3 items-center">
            {blogs.map(b => {
                return <BlogCard blogId={b.id} key={b.id} publishDate={b.createdAt.toString().substring(0,10)} authorname={b.authorName} title={b.title} content={b.content} />
            })}
            </div>

        </div>
    }
}