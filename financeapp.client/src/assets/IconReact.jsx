export const IconLabel =({color, width, height, icon})=>{

    console.log(color)
    return (<div className="relative flex justify-center items-center h-[60px] w-[60px]  transition-transform duration-300 hover:scale-150  m-0 p-0  hover:translate-x-[-20px]" >
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill={color}
             className="icon icon-tabler icons-tabler-filled icon-tabler-label ">
            <path stroke="none" d="M0 0h24v24H0z" fill='none'/>
            <path
                d="M16.52 6a2 2 0 0 1 1.561 .75l3.7 4.625a1 1 0 0 1 0 1.25l-3.7 4.624a2 2 0 0 1 -1.561 .751h-10.52a3 3 0 0 1 -3 -3v-6a3 3 0 0 1 3 -3z"/>
        </svg>
        <img className={'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[32px] z-10'} src={'src/assets/Active.svg'}/>
    </div>)
}


export const IconStocks =({color, width, height, icon})=>{

    console.log(color)
    return (<div className="relative flex justify-center items-center h-[60px] w-[60px]  transition-transform duration-300 hover:scale-150  m-0 p-0  hover:translate-x-[-20px]" >
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill={color}
             className="icon icon-tabler icons-tabler-filled icon-tabler-label ">
            <path stroke="none" d="M0 0h24v24H0z" fill='none'/>
            <path
                d="M16.52 6a2 2 0 0 1 1.561 .75l3.7 4.625a1 1 0 0 1 0 1.25l-3.7 4.624a2 2 0 0 1 -1.561 .751h-10.52a3 3 0 0 1 -3 -3v-6a3 3 0 0 1 3 -3z"/>
        </svg>
        <img className={'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[32px] z-10'} src={'src/assets/Active.svg'}/>
    </div>)
}

export const GoogleIcon =({color, size})=>{

    return(

        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} id="google" fill={color} viewBox="0 0 1792 1792">
            <path d="M896 786h725q12 67 12 128 0 217-91 387.5T1282.5 1568 896 1664q-157 0-299-60.5T352 1440t-163.5-245T128 896t60.5-299T352 352t245-163.5T896 128q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65T484 652.5 420 896t64 243.5T657.5 1316t238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78H896V786z"></path>
        </svg>
        )

}