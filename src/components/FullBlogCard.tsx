import { BlogCardType } from "./BlogCard"

export const FullBlogCard = ({ authorname, title, content, publishDate, blogId }: BlogCardType) => {
    console.log(blogId)
    return <div className="flex flex-col-reverse gap-3 lg:flex-row w-full justify-between items-start px-10 lg:px-44 py-8">
        <div className="w-full lg:w-3/4 xl:w-1/2 border-b border-slate-400">
            <div>
                <div className="text-3xl font-bold cursor-pointer mt-3">{title}</div>
            </div>
            <div className="font-bold text-slate-400 text-sm my-3">Publish on {publishDate}</div>
            <div className="text-base font-bold text-slate-700 min-h-[75vh]">{content}</div>
            <div className="font-semibold text-slate-500 text-xs my-3">
                {Math.ceil(content.length / 100) + " minute(s) read"}
            </div>
        </div>

        <div className="flex flex-col gap-5 w-full lg:w-80 bg-slate-50 p-4">
            <div className="text-lg font-bold text-slate-400">Author</div>
            <div className="flex gap-6 items-center">
                <div>
                <div className="h-8 w-8 rounded-full bg-gray-300 font-bold text-sm flex items-center justify-center"></div>
                </div>
                <div>
                    <div className="font-bold text-2xl">{authorname}</div>
                    <div className="font-semibold text-sm mt-2">Hii, i am {authorname} a passionate writter and love writing articles.I love writing letters.</div>
                </div>
            </div>
        </div>
    </div>
}