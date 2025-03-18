import {useEffect, useMemo, useRef, useState} from "react";
import {HandCoins, Table} from 'lucide-react';
import CalendarForm from "@/components/MyComponent/Expenses/CalendarComponent.tsx";

import {IconLabel} from "@/assets/IconReact.jsx";
import {AgGridReact} from "ag-grid-react";
import * as response from "autoprefixer";
import { CircleDollarSign, ArrowLeftRight, Blocks,File, FilePlus2, Images, CloudUpload } from 'lucide-react';
import {FormHelperText, Slider} from "@mui/material";
import {LoanIcon} from "@/assets/overall/OverAllSVG.jsx";
import {Inter} from "next/dist/compiled/@next/font/dist/google/index.js";

import {PostLoan} from "../Services/ApiServiceLoan.jsx";
import {toast} from "react-toastify";
const FormTransaction = ({activelabel,setactivelabel, savedData, setSavedData}) => {
    const currentDate = new Date().toLocaleDateString();

    const [dob, setDob] = useState(null);

    const [path, setpath] = useState('relative bottom-[120px] right-[25px] space-x-0 flex-row justify-start');
    
    const [Duration, setDuration] = useState(30);
    
    const [Interval, setInterval] = useState(30);
    const formRef = useRef();
    const [DateStart, setDateStart] = useState();
    const [DateEnd, setDateEnd] = useState();


    const handleactivelabel = (activelabel) => {


        setactivelabel(activelabel)


    }

    const [loan, setloan] = useState({
        loanname: "",
        lender: "",
        amounth: "",
        ir: "",
        term: "",
        loanStart: "",
        loanEnd: "",
        monthlyPayment:"",
        status:"active",
        description: "",
        IntervalPayment:""
    });
    
    useEffect(() => {
        console.log(loan, 'this is loan at least');
    }, [loan])

    const handleChange = async (e) => {
        const {name, value} = e.target;
        await setloan((prevLoan) => ({
            ...prevLoan,
            [name]: value,
        }));


    }
    const handleSubmitData=async (e)=>{
        e.preventDefault()
        if(Duration<1||Interval<1||!DateStart||!DateEnd){
            toast.error("Missing or wrong data.")
            return
        }
        await PostLoan(loan).then(r => window.location.reload());
    }
    
    const marksLoanDuration = [
        {
            value: 0,
            label: '0D',
        },
        {
            value: 5,
            label: '5Y',
        },
        
        {
            value: 10,
            label: '10Y',
        },
        {
            value: 20,
            label: '20Y',
        },
        {
            value: 30,
            label: '30Y',
        },
        {
            value: 50,
            label: '50Y',
        },
        {
            value: 60,
            label: '60Y',
        },
        
        
    ];

    const marksIntervalPayment = [
        {
            value: 0,
            label: '0D',
        },
        {
            value: 30,
            label: '30D',
        },
        {
            value: 60,
            label: '60D',
        },
        {
            value: 90,
            label: '90D',
        },
        {
            value: 180,
            label: '180D',

        },
        {
            value: 270,
            label: '270D',

        },
        {
            value: 365,
            label: '365D',

        },
    ];

    
    useEffect( () => {
        setloan((prevState) => ({
            ...prevState,
            loanStart: DateStart,
        }));
        
    },[DateStart])

    useEffect( () => {
        setloan((prevState) => ({
            ...prevState,
            loanEnd: DateEnd,
        }));
        
    },[DateEnd])
    useEffect( () => {
        setloan((prevState) => ({
            ...prevState,
            term: Duration,
        }));

    },[Duration])
    useEffect( () => {
        setloan((prevState) => ({
            ...prevState,
            IntervalPayment: Interval,
        }));

    },[Interval])
    

    function valuetext(value) {
        return `${value}°C`;
    }
    

    return (
        <div className={` text-center w-[900px] h-[550px] bg-[#3A3535] rounded-[9px]  border-green-500 border shadow-lg shadow-black z-50`}>
            <div className='relative  h-[100px] w-[100px] left-1/2 bottom-20 transform -translate-x-1/2   flex justify-center items-center my-7 text-[17px] font-bold  rounded-full bg-gradient-to-r from-yellow-600 to-yellow-300'><LoanIcon color={'#FFFFFF'} height='64px' /></div>
            <div className={'relative bottom-[120px] right-[25px] space-x-0 flex-row justify-start'}>
                <div onClick={() => handleactivelabel('File')}><IconLabel width='70px' height='60px' color={'green'}  /></div>
                <div onClick={() => handleactivelabel('Detail')}><IconLabel width='70px' height='60px' color={'blue'}/></div>
                <div onClick={() => handleactivelabel('Change')}><IconLabel width='70px' height='60px' color={'red'}/></div>

            </div>

            <form className=' relative bottom-[230px] flex flex-col justify-center items-center'  >


                <div className={'flex flex-row '}>
                <div className='w-[400px] mr-5'>
                    <div className='flex flex-row gap-3 w-[400px] h-[30px] rounded-[9px] mb-5'>
                        <div className="flex flex-col relative w-[400px]">
                            <label
                                className="absolute top-[-10px] left-5  text-green-500  bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Name</label>
                            <input type="text" placeholder="Name" maxLength={40} required
                                   className="w-full rounded-[9px] border-green-500 border p-2 bg-[#2D2A2A] " value={loan.loanname} name="loanname" onChange={handleChange}  />
                        </div>

                    </div>
                    <div className='flex flex-row gap-3 w-[400px] h-[30px] rounded-[9px] mb-5 '>
                        <div className="flex flex-col relative w-[250px]">
                            <label
                                className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Loan</label>
                            <input type="number" placeholder="Loan"  maxLength={15} required max={10000000} min={0}
                                   className="w-full rounded-[9px] border-green-500 border p-2 bg-[#2D2A2A] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" value={loan.amounth} name="amounth" onChange={handleChange}/>
                        </div>
                        <div className="flex flex-col relative w-[170px]">
                            <label
                                className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Start Date</label>

                            <CalendarForm  className='bg-black' dob={DateStart} setDob={setDateStart}  ></CalendarForm>

                        </div>
                    </div>



                    <div className='flex flex-row gap-3 w-[400px] h-[30px] rounded-[9px] mb-5 '>
                        <div className="flex flex-col relative w-[250px]">
                            <label
                                className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b ">IR</label>
                            <input type="number" placeholder="IR"  maxLength={15} required max={100} min={0}
                                   className="w-full rounded-[9px] border-green-500 border p-2 bg-[#2D2A2A] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" value={loan.ir} name="ir" onChange={handleChange}/>
                        </div>
                        <div className="flex flex-col relative w-[170px]">
                            <label
                                className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">End Date</label>

                            <CalendarForm  className='bg-black' dob={DateEnd} setDob={setDateEnd}  ></CalendarForm>

                        </div>
                    </div>

                    <div className='flex flex-row gap-3 w-[400px] h-[30px] rounded-[9px] mb-5'>
                        <div className="flex flex-col relative w-[400px]">
                            <label
                                className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Lender</label>
                            <input type="text" placeholder="Lender" maxLength={27} required
                                   className="w-full rounded-[9px] border-green-500 border p-2 bg-[#2D2A2A]" value={loan.lender} name="lender" onChange={handleChange}/>
                        </div>

                    </div>

                    





                </div>

                <div className='w-[400px] mb-5'>
                    <div className='flex flex-row justify-end gap-3 w-[400px] h-[30px] rounded-[9px] mb-5'>
                        <div className="flex flex-col relative w-[250px]">
                            <label
                                className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Mounthly payment</label>
                            <input type="number" placeholder="Mounthly payment"  maxLength={15} max={100000} min={0}
                                   className="w-full rounded-[9px] border-green-500 border p-2 bg-[#2D2A2A] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" value={loan.monthlyPayment} name="monthlyPayment" onChange={handleChange}/>
                        </div>
                       
                    </div>
                    <div className='flex flex-row gap-3 w-[400px] h-[30px] rounded-[9px] mb-10 mt-10 relative'>
                        <label
                            className="absolute top-[-20px] left-5 text-green-500 bg-[#2D2A2A]  rounded-b-[9px]  border-b-green-500 border-b">Loan Duration</label>
                        <Slider
                            size="medium"
                            aria-label="Restricted values"
                            defaultValue={30}
                            getAriaValueText={valuetext}
                            
                            value={Duration} onChange={(e, newValue)=>setDuration(newValue)}
                            max={60}
                            step={1}
                            valueLabelDisplay="auto"
                            marks={marksLoanDuration}
                            
                            sx={{  color: 'success.main',
                                '& .MuiSlider-markLabel': { fontWeight: 'bold', fontSize: '1.0rem', color: 'white' }, // Adjust mark labels
                                '& .MuiSlider-valueLabel': { fontWeight: 'bold', fontSize: '1.0rem', color: 'white' },  // Increase the track height
                            }}
                            
                                
                            
                        />
                        
                    </div>

                    <div className='flex flex-row gap-3 w-[400px] h-[30px] rounded-[9px] mb-8 mt-8 relative'>

                        <label
                            className="absolute top-[-20px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Payment interval</label>
                        <Slider
                            size="medium"
                            aria-label="Restricted values"
                            defaultValue={30}
                            getAriaValueText={valuetext}
                            max={365}
                            step={0.01}
                            value={Interval} // Binds to the state Interval
                            onChange={(e, newValue) => {
                                setInterval(newValue); // Updates the state
                                console.log(newValue); // Logs the new value to the console
                            }}
                            valueLabelDisplay="auto"
                            marks={marksIntervalPayment}
                            sx={{  color: 'success.main',
                                '& .MuiSlider-markLabel': { fontWeight: 'bold', fontSize: '1.0rem', color: 'white' }, // Adjust mark labels
                                '& .MuiSlider-valueLabel': { fontWeight: 'bold', fontSize: '1.0rem', color: 'white' },  // Increase the track height
                            }}
                        />

                    </div>

                   




                </div>

                </div>
                <div className='flex flex-row gap-3 w-[830px] h-[100px] rounded-[9px] mb-5'>
                    <div className="flex flex-col relative w-full">
                        <label
                            className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b" >Notes</label>
                        <textarea
                            placeholder="Comment" maxLength={3000}
                            className="w-full h-full rounded-[9px] border-green-500 border p-2 bg-[#2D2A2A]" value={loan.description} name="description" onChange={handleChange}
                        ></textarea>
                    </div>




                </div>


                <div className='flex flex-row gap-3 w-[400px]'>
                    <button type="button"
                            className='w-[80px] h-[40px] bg-[#3A3535] hover:scale-110 transition-transform duration-300 ' onClick={() => handleSubmitData()}>Cancel
                    </button>

                    <button type="submit"
                            className='w-[300px] h-[40px] bg-green-500 hover:scale-110 transition-transform duration-300' onClick={(e) => handleSubmitData(e)}>Submit
                    </button>
                </div>
            </form>
        </div>
    );
};





const CashDetail=({inpuref})=> {

    console.log(inpuref)
    console.log('inpureflec')
    return (<div className={'h-full w-full bg-[#3A3535] rounded-l-[9px] border-green-500  justify-center border  items-center text-center  flex flex-col ' }>
        <div className={'relative bottom-10 left-0 text-[30px]  flex flex-col items-center justify-center'}><CircleDollarSign size={'50%'} color={'#22c55e'} className={' '} /> <h1 className={''}>Cash Expenses Detail</h1></div>


        <div className='flex flex-row gap-3 w-[400px] h-[30px] rounded-[9px] mb-5'>
            <div className="flex flex-col relative w-[200px]">
                <label
                    className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Taxes</label>
                <input type="text" placeholder="Taxes" maxLength={40} ref={inpuref.Taxes}
                       className="w-full rounded-[9px] border-green-500 border p-2"  />
            </div>

            <div className="flex flex-col relative w-[200px]">
                <label
                    className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Without taxes</label>
                <input type="text" placeholder="Without taxes" maxLength={27} ref={inpuref.WithoutTaxis}
                       className="w-full rounded-[9px] border-green-500 border p-2" />
            </div>

        </div>


        <div className='flex flex-row gap-3 w-[400px] h-[30px] rounded-[9px] mb-5'>
            <div className="flex flex-col relative w-[400px]">
                <label
                    className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Receiver</label>
                <input type="text" placeholder="Receiver" maxLength={27} ref={inpuref.Receiver}
                       className="w-full rounded-[9px] border-green-500 border p-2" />
            </div>

        </div>
        <div className='flex flex-row gap-3 w-[400px] h-[30px] rounded-[9px] mb-5'>
            <div className="flex flex-col relative w-[400px]">
                <label
                    className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Place</label>
                <input type="text" placeholder="Place" maxLength={27} ref={inpuref.Place}
                       className="w-full rounded-[9px] border-green-500 border p-2" />
            </div>

        </div>

        <div className='flex flex-row gap-3 w-[400px] h-[30px] rounded-[9px] mb-5'>
            <div className="flex flex-col relative w-[400px]">
                <label
                    className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Country</label>
                <input type="text" placeholder="Country" maxLength={27} ref={inpuref.country}
                       className="w-full rounded-[9px] border-green-500 border p-2" />
            </div>

        </div>


    </div>)
}


const Addfile=({inpuref})=> {

    console.log(inpuref)
    console.log('inpureflec')
    return (<div className={'h-full w-full bg-[#3A3535] rounded-l-[9px] border-green-500  justify-center border  items-center text-center  flex flex-col ' }>

        <div className={'flex flex-row'}><FilePlus2 color={'#22c55e'} size='120px' className={'m-5'}/><Images color={'#22c55e'} size='120px' className={'m-5'}/></div>

        <div
            className=' h-[300px] w-[400px] border-2 border-dashed border-green-500 flex flex-col items-center justify-center m-5'>
            <CloudUpload size='200px' color={'#808080'}/>
            <label htmlFor="file-upload" >
                <div className={'flex-row ml-5'}>Upload Additional File or Image to cloud center <input id="file-upload" type="file"/></div>

            </label>

        </div>

    </div>)
}








export const Transaction=(handleButtonClick)=>{


    const [activelabel, setactivelabel] = useState(null);
    const [savedData, setSavedData] = useState([]);
    const [typeExpenses, setType] = useState(null);

    






    const PositionFormular=()=>{

        var postion=''
        if(activelabel!='Table'&&activelabel!='Detail'&&activelabel!='Change'&&activelabel!='Category'&&activelabel!='File'){
            postion='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center justify-center';
        }else if(activelabel==='Detail'){
            postion='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-[90%] ';
        }else if(activelabel==='File'){
            postion='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] ' ;
        }else if(activelabel==='Change'||activelabel==='Category'){
            postion='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%]';
        }
        return postion;
    }

    
    return (<div className={`${PositionFormular()}  h-[550px]  flex flex-row`}>


            
            {activelabel === 'File' && (<div className={`h-full w-[calc(100%-900px)] relative -mr-[6px]  `}><Addfile data={savedData} /></div>)}


            <div className={''}><FormTransaction activelabel={activelabel} setactivelabel={setactivelabel} savedData={savedData} setSavedData={setSavedData}  /></div></div>)






}





export default FormTransaction;


