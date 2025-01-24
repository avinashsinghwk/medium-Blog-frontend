interface BigButtonprops{
    text: any,
    onClick : ()=>void,
    btnActive: boolean
}

export const BigButton = ({text, onClick, btnActive}: BigButtonprops) => {
    return <button onClick={onClick} className={`flex items-center justify-center w-full py-2 font-bold text-xl text-white ${btnActive ? 'cursor-pointer' : 'cursor-not-allowed'} ${btnActive ? 'bg-black': 'bg-gray-700'}`}>
        {text}
    </button>
}