import { useNavigate } from "react-router-dom"

export const AppBar = () => {
    const navigate = useNavigate()
    const createBtnClick = () =>{
        navigate("/publish")
    }

    return <div className="flex justify-between items-center border-b border-slate-400 px-4 md:px-10 py-3">
        <div className=" flex gap-2 items-center">
            <div className="text-2xl">&#11044;&#9680;</div>
            <div className="font-bold text-lg">Medium</div>
        </div>
        <div className="flex gap-5 items-center">
            <div>
                <button onClick={createBtnClick} type="button" className="focus:outline-none text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2  ">Create Blog</button>
            </div>
            <div className="h-8 w-8 rounded-full text-white bg-gray-800 font-bold text-sm flex items-center justify-center">{"U"}</div>
        </div>
    </div>
}