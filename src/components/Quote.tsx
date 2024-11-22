interface QuoteType{
    quote: string,
    writer: string,
    designation: string
}

export const Quote = ({quote, writer, designation}: QuoteType) => {
    return <div className="hidden md:h-screen md:px-8 w-1/2 bg-gray-200 md:flex md:flex-col md:justify-center lg:px-24 font-sans">
        <div className="font-bold text-[1.8rem] leading-8">"{quote}"</div>
        <div className="text-[1rem] font-extrabold mt-3">{writer}</div>
        <div className="text-gray-600 font-bold text-[0.85rem] ">{designation}</div>
    </div>
}