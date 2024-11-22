import { ChangeEvent } from "react"

interface InputBoxType {
    type: string,
    placeholder: string,
    label: string,
    id: string,
    onChange: (e: ChangeEvent<HTMLInputElement>)=>void
}

export const InputBox = ({id, label, placeholder, type, onChange}: InputBoxType) => {
    return <div className="w-full">
        <label htmlFor={id}>
            <div className="text-lg font-sans font-bold cursor-text">{label}</div>
        </label>
            <input onChange={onChange} id={id} className="w-full mt-1 py-2 px-4 font-bold text-black border border-black bg-gray-50 outline-none font-sans" type={type} placeholder={placeholder} />
    </div>
}