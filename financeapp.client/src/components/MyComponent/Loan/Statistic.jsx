


function StatLoan({text, color, Number}) {
    return (
        <div className="relative   flex flex-col mb-2 rounded-[9px] bg-gradient-to-r text-center flex-grow from-[#3A3535] to-[#1F1B1B]  border border-green-500  text-white font-bold ">

            <h className="text-[8px] sm:text-[8px] md:text-[10px] lg:text-sm xl:text-md">{text}</h>

            <h1 className={`text-${color} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-2xl xl:text-4xl`}>{Number}</h1>




        </div>)
}

export default StatLoan;