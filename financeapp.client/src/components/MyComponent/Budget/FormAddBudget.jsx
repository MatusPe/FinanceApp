import {useEffect, useMemo, useRef, useState} from "react";
import {HandCoins, Table} from 'lucide-react';
import CalendarForm from "@/components/MyComponent/Expenses/CalendarComponent.tsx";

import {IconLabel} from "@/assets/IconReact.jsx";
import {AgGridReact} from "ag-grid-react";
import * as response from "autoprefixer";
import { CircleDollarSign, ArrowLeftRight, Blocks,File, FilePlus2, Images, CloudUpload } from 'lucide-react';
import {Slider} from "@mui/material";
import {BudgetIcon, LoanIcon} from "@/assets/overall/OverAllSVG.jsx";
import { Switch } from "@/components/ui/switch.tsx"

import { Label } from "@/components/ui/label"
import {PostBudgetApi} from "@/components/MyComponent/Services/ApiServiceBudget.jsx";
import {toast} from "react-toastify";

const FormTransaction = ({activelabel,setactivelabel, savedData, setSavedData, hideform}) => {
    const currentDate = new Date().toLocaleDateString();

    const [dob, setDob] = useState(new Date());

    const [path, setpath] = useState('relative bottom-[120px] right-[25px] space-x-0 flex-row justify-start');

    const formRef = useRef();

    const [Interval, setInterval] = useState(0);
    const [switchButton, setSwitchButton] = useState("repeater");
    
    const handleactivelabel = (activelabel) => {


        setactivelabel(activelabel)


    }
    
    
    
    const [BudgetData, setBudgetData] = useState({
        category: "",
        name: "",
        repeater: "",
        interval: "",
        limitAmount: "",
        startDate: "",
        description: "",
    });

    const handleChange = async (e) => {
        const {name, value} = e.target;
        await setBudgetData((prevBudget) => ({
            ...prevBudget,
            [name]: value,
        }));


    }
    useEffect(() => {

        setBudgetData((prevState) => ({
            ...prevState,
            startDate: dob,
        }));
        
    }, [dob])
    
    useEffect(() => {

        setBudgetData((prevState) => ({
            ...prevState,
            interval: Interval,
        }));
    }, [Interval])

    useEffect(() => {

        setBudgetData((prevState) => ({
            ...prevState,
            repeater: switchButton,
        }));
    }, [switchButton]);
    
    useEffect(() => {
        
        
        console.log(BudgetData);
    }, [BudgetData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(Interval<1){
            toast.error("Interval must be at least one")
            return
        }
        
        PostBudgetApi(BudgetData).then((res)=> {
            
            console.log(res);
        });
        
        
    }
    
    const marks = [
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

    function valuetext(value) {
        return `${value}°C`;
    }
    
    const handleSwitchChange=()=>{
        
        
        setSwitchButton((prevstate)=>{
            return prevstate==="repeater"?"notRepeat":"repeater";
        });
    }
    

    return (
        <div className={` text-center w-[550px] h-[550px] bg-[#3A3535] rounded-[9px]  border-green-500 border shadow-lg shadow-black z-50`}>
            <div className='relative  h-[100px] w-[100px] left-1/2 bottom-20 transform -translate-x-1/2   flex justify-center items-center my-7 text-[17px] font-bold  rounded-full bg-gradient-to-r from-purple-600 to-purple-300'><BudgetIcon color={'#FFFFFF'} height='64px' /></div>
            <div className={'relative bottom-[120px] right-[25px] space-x-0 flex-row justify-start'}>
                <div onClick={() => handleactivelabel('File')}><IconLabel width='70px' height='60px' color={'green'}  /></div>
                <div onClick={() => handleactivelabel('Detail')}><IconLabel width='70px' height='60px' color={'blue'}/></div>
                <div onClick={() => handleactivelabel('Change')}><IconLabel width='70px' height='60px' color={'red'}/></div>

            </div>

            <form className=' relative bottom-[230px] flex flex-col justify-center items-center gap-2' onSubmit={handleSubmit}>


                <div className={'flex flex-row gap-3'}>
                    <div className='w-[400px] mr-5 gap-6 '>
                        <div className='flex flex-row gap-6 w-[400px] h-[30px] rounded-[9px] mb-6'>
                            <div className="flex flex-col relative w-[400px]">
                                <label
                                    className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Category</label>
                                <input type="text" placeholder="Category" maxLength={40}
                                       className="w-full rounded-[9px] border-green-500 border p-2 bg-[#2D2A2A]"  required  value={BudgetData.category} name="category" onChange={handleChange} />
                            </div>
                            <div className="flex items-center space-x-2 text-white">
                                <Switch color='#FF0000' id="airplane-mode"
                                        checked={switchButton === "repeater"}
                                        onCheckedChange={()=>{handleSwitchChange()}}
                                
                                />
                                <Label htmlFor="airplane-mode">Repeatable</Label>
                            </div>

                        </div>
                        <div className='flex flex-row gap-3 w-[400px] h-[30px] rounded-[9px] mb-5 '>
                            <div className="flex flex-col relative w-[400px]">
                                <label
                                    className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Name</label>
                                <input type="type" placeholder="Name"  maxLength={40}  required  
                                       className="w-full rounded-[9px] border-green-500 border p-2 bg-[#2D2A2A]" value={BudgetData.name} name="name" onChange={handleChange}/>
                            </div>

                        </div>

                        <div className='flex flex-row gap-3 w-[400px] h-[30px] rounded-[9px] mb-8 mt-8'>
                            <Slider
                                size="medium"
                                aria-label="Restricted values"
                                defaultValue={30}
                                getAriaValueText={valuetext}
                                value={Interval} onChange={(e, newValue)=>setInterval(newValue)}
                                max={365}
                                step={1}
                                valueLabelDisplay="auto"
                                marks={marks}
                                sx={{  color: 'success.main',
                                    '& .MuiSlider-markLabel': { fontWeight: 'bold', fontSize: '1.0rem', color: 'white' }, // Adjust mark labels
                                    '& .MuiSlider-valueLabel': { fontWeight: 'bold', fontSize: '1.0rem', color: 'white' },  // Increase the track height
                                     }}
                            />

                        </div>



                        <div className='flex flex-row gap-3 w-[400px] h-[30px] rounded-[9px] mb-5 '>
                            <div className="flex flex-col relative w-[250px]">
                                <label
                                    className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Budget</label>
                                <input type="number" placeholder="Budget"  maxLength={15} max={1000000} required  min={0}
                                       className="w-full rounded-[9px] border-green-500 border p-2 bg-[#2D2A2A] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" value={BudgetData.limitAmount} name="limitAmount" onChange={handleChange}/>
                            </div>
                            <div className="text-white flex flex-col relative w-[170px] ">
                                <label
                                    className="absolute top-[-12px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Start Date</label>

                                <CalendarForm  className='bg-black' dob={dob} setDob={setDob}  ></CalendarForm>

                            </div>
                        </div>









                    </div>



                </div>
                <div className=' flex flex-row gap-3 w-[400px] h-[100px] rounded-[9px] mb-5 mr-5'>
                    <div className="flex flex-col relative w-full">
                        <label
                            className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b" >Notes</label>
                        <textarea
                            placeholder="Comment" maxLength={300}
                            className="w-full h-full rounded-[9px] border-green-500 border p-2 bg-[#2D2A2A]" value={BudgetData.description} name="description" onChange={handleChange}
                        ></textarea>
                    </div>




                </div>


                <div className='flex flex-row gap-3 w-[400px] mr-5'>
                    <button type="button"
                            className='w-[80px] h-[40px] text-white bg-[#3A3535] hover:scale-110 transition-transform duration-300 ' onClick={()=>hideform(false)}>Cancel
                    </button>

                    <button type="submit"
                            className='w-[300px] h-[40px] text-white bg-green-500 hover:scale-110 transition-transform duration-300'>Submit
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








export const Transaction=({handleButtonClick, hideform})=>{


    const [activelabel, setactivelabel] = useState(null);
    const [savedData, setSavedData] = useState([]);
    const [typeExpenses, setType] = useState(null);

    const inputRefs = {
        Name: typeExpenses,
        Loan: useRef(),
        IR: useRef(),
        StartDate:useRef(),
        EndDate: useRef(),
        Lender: useRef(),
        Borrower: useRef(),
        Notes: useRef(),
        MounthlyPayment: useRef(),
        FirstPayment: useRef(),
        Duration: useRef(),
        Interval: useRef(),

    };






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

    console.log(inputRefs);
    return (<div className={`${PositionFormular()}  h-[550px]  z-50 flex flex-row`}>


        {activelabel === 'Detail' && (<div className={`h-full w-[calc(100%-900px)] relative -mr-[6px]  `}><CashDetail data={savedData} inpuref={inputRefs}/></div>)}
        {activelabel === 'File' && (<div className={`h-full w-[calc(100%-900px)] relative -mr-[6px]  `}><Addfile data={savedData} inpuref={inputRefs}/></div>)}


        <div className={''}><FormTransaction activelabel={activelabel} setactivelabel={setactivelabel} savedData={savedData} setSavedData={setSavedData} inpuref={inputRefs} hideform={hideform}/></div></div>)






}





export default FormTransaction;