import { Link } from "react-router-dom"

export type BlogCardType = {
    authorname: string,
    title: string,
    content: string,
    publishDate: string,
    blogId: string
}

export const BlogCard = ({ authorname, title, content, publishDate, blogId }: BlogCardType) => {
    return <div className="w-full sm:w-4/5 lg:w-3/5 xl:w-2/5 p-5 border-b border-slate-400">
        <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full text-white bg-gray-700 font-bold text-sm flex items-center justify-center">{authorname[0]}</div>
            <div className="font-bold">{authorname},</div>
            &#9642;
            <div className="font-semibold text-slate-500 text-sm">{publishDate}</div>
        </div>
        <div>
            <Link to={`/blog/?id=${blogId}`}>
            <div className="text-xl font-bold cursor-pointer">{title}</div>
            </Link>
        </div>
        <div className="text-base font-semibold text-slate-600">{content.substring(0, 100) + "..."}</div>
        <div className="font-semibold text-slate-500 text-xs mt-3">
            {Math.ceil(content.length / 100) + " minute(s) read"}
        </div>
    </div>
}