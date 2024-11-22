interface BigButtonprops{
    text: string,
    onClick : ()=>void
}

export const BigButton = ({text, onClick}: BigButtonprops) => {
    return <button onClick={onClick} className="w-full py-2 font-bold text-xl text-white bg-black hover:bg-gray-700">
        {text}
    </button>
}