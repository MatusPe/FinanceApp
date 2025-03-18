


function Buttons({Text, onClick}){
    console.log(Text)
    return (
        <button className={'  text-[7px] min-h-7 md:text-[15px] sm:text-[12px] w-[20%] h-[40%]  rounded-[9px]  border-green-500 text-center text-white bg-gradient-to-r from-[#3A3535] to-[#1F1B1B] flex-grow  border-2 transition-all duration-2000 ease-in-out hover:scale-105 hover:shadow-lg hover:text-black hover:bg-gradient-to-r hover:from-white hover:to-white'} onClick={onClick}>{Text}</button>
    )
}
function GraphButtons({icon}){
    return(<button className={`mr-2 filter invert hover:scale-150 transition-transform duration-300`}><img className={'w-[32px] h-[32px]'} src={`${icon}`}/></button>)
}
export {GraphButtons};
export default Buttons;

