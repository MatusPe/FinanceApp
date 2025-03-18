import React, {useEffect, useMemo, useRef, useState} from "react";
import {HandCoins, Table} from 'lucide-react';
import CalendarForm from "./CalendarComponent.tsx";

import {IconLabel} from "@/assets/IconReact.jsx";
import {AgGridReact} from "ag-grid-react";
import * as response from "autoprefixer";
import { CircleDollarSign, ArrowLeftRight, Blocks } from 'lucide-react';
import {SelectDemo} from "@/components/MyComponent/Select.js";
import {Switch} from "@/components/ui/switch.js";
import {Label} from "@/components/ui/label.js";
import {toast} from "react-toastify";
import {Button} from "@/components/ui/button.js";
import {PostExpensesApi} from "@/components/MyComponent/Services/ApiService.jsx";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";



const FormTransaction = ({activelabel,setactivelabel, savedData, setSavedData, setType, type, setshowcomponent}) => {
    const currentDate = new Date().toLocaleDateString();

    const [dob, setDob] = useState(new Date());

    

    const [expenses, setExpenses] = useState({
        type: "",
        category: "",
        name: "",
        receiver: "",
        price: "",
        date: "",
        description: "",
    });
    const formRef = useRef();
    const handleactivelabel = (newactivelabel) => {
        
        if (newactivelabel!==activelabel) {
            setactivelabel(newactivelabel)
        }else{
            setactivelabel(null)
        }
        
    }
    const handleChange = async (e) => {
        const {name, value} = e.target;
        await setExpenses((prevExpenses) => ({
            ...prevExpenses,
            [name]: value,
        }));
        
        
    }
    const addTransaction = async (e,transaction) => {
        e.preventDefault();
        console.log(transaction, 'this is transaction');
        const newExpenses = await new Promise((resolve) => {
            setExpenses((prevState) => {
                let updatedState;

                if (type === "Cash") {
                    updatedState = {
                        ...prevState,
                        cashTransactions: transaction
                        ,
                    };
                } else if (type === "Transaction") {
                    updatedState = {
                        ...prevState,
                        expenseTransactions: transaction
                    };
                } else {
                    return prevState;
                }

                resolve(updatedState); // Resolve with the updated state
                return updatedState;
            });
        });

        // Now use `newExpenses`, since `expenses` might still be stale
        
        
        await PostExpensesApi(newExpenses);
        window.location.reload();
        
    };

    useEffect(() => {
        
    }, [expenses]);
    
    useEffect(() => {
        setExpenses((prevState) => ({
            ...prevState,
            type: type,
        }));
        console.log(type)
    },[type])
    useEffect( () => {
        setExpenses((prevState) => ({
            ...prevState,
            date: dob,
        }));
        console.log(expenses)
    },[dob])
    
    const proceedAction=()=>{
        setType(prevType => (prevType === "Cash" ? "Transaction" : "Cash"));
        setSavedData([]);
    }
    const handleSwitchChange = (event) => {

        
        if (savedData.length> 0) {
            toast.warn(
                <div className={'flex justify-center items-center flex-col'}>
                    <h1>Warning: Changing type of expenses expenses will remove the associated data. Are you sure you want to proceed?</h1>
                    <div className={'flex justify-center items-center flex-row w-full  justify-between'}>
                        <Button onClick={() => toast.dismiss()} className={'bg-[#1f1f1f] border-2  shadow-md shadow-black border-green-500 text-[13px] font-bold text-green-500 items-center justify-center flex'}>Cancel</Button>
                        <Button onClick={() => proceedAction()} className={'bg-[#1f1f1f] border-2  shadow-md shadow-black border-green-500 text-[13px] font-bold text-green-500 items-center justify-center flex'}>Proceed</Button>
                    </div>
                    
                </div>,
                {
                    autoClose: 10000,  // The toast will stay for 10 seconds
                }
                
            )
        }else{
            setType(prevType => (prevType === "Cash" ? "Transaction" : "Cash"));
        }
        
        
        return type
        
        
    };
    const handleClick = () => {
        setshowcomponent(false);
    };
    
    
    return (
        <div className={` text-center text-white w-[550px] h-[550px] bg-[#3A3535] rounded-[9px]  border-green-500 border shadow-lg shadow-black z-50`}>
            <div className='relative  h-[100px] w-[100px] left-1/2 bottom-20 transform -translate-x-1/2   flex justify-center items-center my-7 text-[17px] font-bold  rounded-full bg-gradient-to-r from-green-700 to-lime-400 border-green-500'><HandCoins color={"white"} className={'w-[64px] h-[64px]'} /></div>
            <div className={'relative bottom-[120px] right-[25px] space-x-0 flex-row justify-start'}>
                <div onClick={() => handleactivelabel('Table')}><IconLabel width='70px' height='60px' color={'green'}  /></div>
                <div onClick={() => handleactivelabel('Detail')}><IconLabel width='70px' height='60px' color={'blue'}/></div>

            </div>

            <form className=' relative bottom-[200px] flex flex-col justify-center items-center gap-0' ref={formRef} onSubmit={(e)=>addTransaction(e,savedData)}>
                <div className='w-[400px] mb-5 flex flex-col gap-1'>
                    
                    <div className='flex flex-row gap-3 w-[400px] h-[30px] rounded-[9px] mb-5'>
                        <div className="flex flex-col relative w-[250px]">
                            <label
                                className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Category</label>
                            <input type="Type" placeholder="Category"  maxLength={15}
                                   className="placeholder-gray-400 w-full rounded-[9px] border-green-500 border p-2 bg-[#2D2A2A]"   onChange={handleChange} required />
                            
                        </div>
                        
                        
                        <div className="flex flex-col relative w-[170px]">
                            <label
                                className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b" >Date</label>

                            <CalendarForm  className='bg-black' dob={dob} setDob={setDob}  ></CalendarForm>

                        </div>
                    </div>
                    
                    <div className='flex flex-row gap-3 w-[400px] h-[30px] rounded-[9px] mb-5'>
                        <div className="flex flex-col relative w-[400px]">
                            <label
                                className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Name</label>
                            <input type="text" placeholder="Name" maxLength={40}
                                   className="placeholder-gray-400 w-full rounded-[9px] bg-[#2D2A2A] border-green-500 border p-2 " value={expenses.name} name="name" onChange={handleChange} required />
                        </div>

                    </div>
                    

                    <div className='flex flex-row gap-3 w-[400px] h-[30px] rounded-[9px] mb-5'>
                        <div className="flex flex-col relative w-[400px]">
                            <label
                                className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Receiver</label>
                            <input type="text" placeholder="Name of the Sender" maxLength={27}
                                   className=" placeholder-gray-400 w-full rounded-[9px] border-green-500 border p-2 bg-[#2D2A2A] " value={expenses.receiver} name="receiver" onChange={handleChange}/>
                        </div>

                    </div>


                    <div className='flex flex-row gap-3 w-[400px] h-[100px] rounded-[9px] '>
                        <div className="flex flex-col relative w-full ">
                            <label
                                className="absolute inline-block p-0 m-0 top-[-12px]  left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b" >Notes</label>
                            <textarea
                                placeholder="Comment" maxLength={300}
                                className="placeholder-gray-400 bg-[#2D2A2A] w-full h-full rounded-[9px] border-green-500 border p-2 " value={expenses.description} name="description" onChange={handleChange}
                            ></textarea>
                        </div>

                        <div className="flex flex-col relative w-[180px]" >
                            <label
                                className="absolute top-[-10px] left-5 text-green-500 bg-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Price</label>
                            <input type="number" placeholder="0" max={1000000} required  min={0}
                                   className="placeholder-gray-400 w-full rounded-[9px] border-green-500 border p-2  bg-[#2D2A2A] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" step="0.01" value={expenses.Price}   name="price" onChange={handleChange}/>
                            <div className="flex items-center space-x-2 mt-5">
                                <Label htmlFor="airplane-mode" className={'font-bold text-gray-400'}><CircleDollarSign size={'32px'} color={'#22c55e'}/></Label>
                                <Switch
                                    id="airplane-mode"
                                    checked={type === "Cash"}
                                    onCheckedChange={()=>{handleSwitchChange()}}
                                />
                                <Label htmlFor="airplane-mode" className={'font-bold text-gray-400'}><div className={'rounded-full'}><ArrowLeftRight size={'32px'} color={'#0277bd'}/></div></Label>
                            </div>
                            
                        </div>
                        
                    </div>
                    

                </div>
                <div
                    className=' h-[70px] w-[400px] border-2 border-dashed border-green-500 items-center justify-center text-gray-400 bg-[#2D2A2A]'>
                    <label htmlFor="file-upload">
                        <span>Upload Additional File</span>
                        <input id="file-upload" type="file"/>
                    </label>

                </div>
                <p className='mb-2 text-[12px] text-gray-400' >Attach file. File size of your documents should not exceed 10MB.</p>
                <div className='flex flex-row gap-3 w-[400px]'>
                    <button type="button"
                        className='w-[80px] h-[40px] bg-[#3A3535] hover:scale-110 transition-transform duration-300 text-white ' onClick={handleClick}>Cancel
                    </button>
                    
                    <button type="submit" 
                        className='w-[300px] h-[40px] bg-green-500 hover:scale-110 transition-transform duration-300 text-white'>Submit
                    </button>
                </div>
            </form>
        </div>
    );
};



const DataTable=({data, type})=>{

    console.log(type, 'okey');

    return (<div className={'h-full bg-[#3A3535] rounded-l-[9px] border-green-500 border' }><ExpensesDataForm data={data} type={type}></ExpensesDataForm></div>)
}




const CashDetail=({setSavedData})=> {

    const [CashTransaction, setCashTransaction] = useState({

        name: "",
        price: "",
        taxes:"",
        withoutTaxes: "",
        sender: "",
        place: "",
        country: "",

    })
    console.log('expenses activate');

    const handleChange = async (e) => {
        const {name, value} = e.target;
        await setCashTransaction((prevExpenses) => ({
            ...prevExpenses,
            [name]: value,
        }));


    }
    
    const handleAddChange = (e) => {
        e.preventDefault();
        setSavedData(prevExpenses => [...(prevExpenses || []), CashTransaction]);
        setCashTransaction({

            name: "",
            price: "",
            taxes:"",
            withoutTaxes: "",
            sender: "",
            place: "",
            country: "",

        });
        
        
    }

    
    return (<div className={'  border h-full w-full bg-[#3A3535] rounded-l-[9px]  gap-0 border-green-500  justify-center    items-center text-center  flex flex-col ' }>
        <div className={' relative bottom-10 left-0 text-[30px]  flex flex-col items-center justify-center'}><CircleDollarSign size={'50%'} color={'#22c55e'} className={' '} /> <h1 className={'text-white'}>Cash Expenses Detail</h1></div>
        <form onSubmit={handleAddChange} >
        <div className='flex flex-row gap-3 w-[400px] h-[30px] rounded-[9px] mb-6 '>
            <div className="flex flex-col relative w-[200px]">
                <label
                    className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Name</label>
                <input type="text" placeholder="Name" maxLength={40} value={CashTransaction.name} name="name" onChange={handleChange} required 
                       className="text-white placeholder-white w-full rounded-[9px] border-green-500 border p-2 bg-[#2D2A2A] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"  />
            </div>

            <div className="flex flex-col relative w-[200px]">
                <label
                    className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Price</label>
                <input type="number" placeholder="Price" maxLength={27} value={CashTransaction.price} name="price" step={'0.01'} onChange={handleChange} required max={1000000} min={0}
                       className="text-white placeholder-white w-full rounded-[9px] border-green-500 border p-2 bg-[#2D2A2A] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
            </div>

        </div>
        
        
        <div className='flex flex-row gap-3 w-[400px] h-[30px] rounded-[9px] mb-6'>
            <div className="flex flex-col relative w-[200px]">
                <label
                    className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Taxes</label>
                <input type="number" placeholder="Taxes" maxLength={40} value={CashTransaction.taxes} step={'0.01'} name="taxes" onChange={handleChange}  max={1000000} min={0}
                       className="text-white placeholder-white w-full rounded-[9px] border-green-500 border p-2 bg-[#2D2A2A] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"  />
            </div>

            <div className="flex flex-col relative w-[200px]">
                <label
                    className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Without taxes</label>
                <input type="number" placeholder="Without taxes" maxLength={27} value={CashTransaction.withoutTaxes} step={'0.01'} name="withoutTaxes" onChange={handleChange}  max={1000000} min={0}
                       className="text-white placeholder-white w-full rounded-[9px] border-green-500 border p-2 bg-[#2D2A2A] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
            </div>

        </div>


        <div className='flex flex-row gap-3 w-[400px] h-[30px] rounded-[9px] mb-6'>
            <div className="flex flex-col relative w-[400px]">
                <label
                    className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Sender</label>
                <input type="text" placeholder="Sender" maxLength={27} value={CashTransaction.sender} name="sender" onChange={handleChange}
                       className="text-white placeholder-white w-full rounded-[9px] border-green-500 border p-2 bg-[#2D2A2A]" />
            </div>

        </div>
        <div className='flex flex-row gap-3 w-[400px] h-[30px] rounded-[9px] mb-6'>
            <div className="flex flex-col relative w-[400px]">
                <label
                    className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Place</label>
                <input type="text" placeholder="Place" maxLength={27} value={CashTransaction.place} name="place" onChange={handleChange}
                       className="text-white placeholder-white w-full rounded-[9px] border-green-500 border p-2 bg-[#2D2A2A]" />
            </div>

        </div>

        <div className='flex flex-row gap-3 w-[400px] h-[30px] rounded-[9px] mb-6'>
            <div className="flex flex-col relative w-[400px]">
                <label
                    className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Country</label>
                <input type="text" placeholder="Country" maxLength={27} value={CashTransaction.country} name="country" onChange={handleChange}
                       className="text-white placeholder-white w-full rounded-[9px] border-green-500 border p-2 bg-[#2D2A2A]" />
            </div>

        </div>
        <div className='flex flex-row gap-3 w-[400px] items-center justify-center'>
            

            <button type="submit" 
                    className=' text-white placeholder-white w-[100px] h-[40px] bg-green-500 hover:scale-110 transition-transform duration-300 text-white'>Add
            </button>
        </div>
        </form>


    </div>)
}




const TransactionDetail=({setSavedData})=> {

    const [Transaction, setTransaction] = useState({

        name: "",
        price: "", 
        taxes:"",
        withoutTaxes: "",
        sender: "",
        iban: "",
        vb: "",
        ibanSender: "",
        

    })
    console.log('expenses activate');

    const handleChange = async (e) => {
        const {name, value} = e.target;
        await setTransaction((prevExpenses) => ({
            ...prevExpenses,
            [name]: value,
        }));
        


    }

    const handleAddChange = (e) => {
        e.preventDefault();
        setSavedData(prevExpenses => [...(prevExpenses || []), Transaction]);
        setTransaction({

            name: "",
            price: "",
            taxes:"",
            withoutTaxes: "",
            sender: "",
            iban: "",
            vb: "",
            ibanSender: "",

        });
    }

    const formRef = useRef();
    
    return (<div className={'h-full w-full bg-[#3A3535] rounded-l-[9px] border-green-500  justify-center border  items-center text-center  flex flex-col ' }>
        <div className={' relative bottom-4 left-0 text-[30px]  flex flex-col items-center justify-center'}><ArrowLeftRight size={'50%'} color={'#0277bd'} className={' '} /> <h1 className={'text-white'}>Transaction Expenses Detail</h1></div>

        <form onSubmit={handleAddChange} ref={formRef}>
    <div className={'relative top-[-40px]'}>
        <div className='flex flex-row gap-3 w-[400px] h-[30px] rounded-[9px] mb-6'>
            <div className="flex flex-col relative w-[200px]">
                <label
                    className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b "  >Name</label>
                <input type="text" placeholder="Name" maxLength={40} value={Transaction.name} name="name" onChange={handleChange} required
                       className="text-white placeholder-white w-full rounded-[9px] border-green-500 border p-2 bg-[#2D2A2A]"  />
            </div>

            <div className="flex flex-col relative w-[200px]">
                <label
                    className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b ">Price</label>
                <input type="number" step={'0.01'} placeholder="Price" maxLength={27} value={Transaction.price} name="price" onChange={handleChange} required max={1000000} min={0}
                       className="text-white placeholder-white w-full rounded-[9px] border-green-500 border p-2 bg-[#2D2A2A] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
            </div>

        </div>
        
        <div className='flex flex-row gap-3 w-[400px] h-[30px] rounded-[9px] mb-6'>
            <div className="flex flex-col relative w-[200px]">
                <label
                    className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b" >Taxes</label>
                <input type="number" step={'0.01'} placeholder="Taxes" maxLength={40} value={Transaction.taxes} name="taxes" onChange={handleChange} required max={1000000} min={0}
                       className="text-white placeholder-white w-full rounded-[9px] border-green-500 border p-2 bg-[#2D2A2A] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none "  />
            </div>

            <div className="flex flex-col relative w-[200px]">
                <label 
                    className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Without taxes</label>
                <input type="number" step={'0.01'} placeholder="Without taxes" maxLength={27} value={Transaction.withoutTaxes} name="withoutTaxes" onChange={handleChange} max={1000000} min={0}
                       className="text-white placeholder-white w-full rounded-[9px] border-green-500 border p-2 bg-[#2D2A2A] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
            </div>

        </div>


        <div className='flex flex-row gap-3 w-[400px] h-[30px] rounded-[9px] mb-6'>
            <div className="flex flex-col relative w-[400px]">
                <label
                    className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Sender</label>
                <input type="text" placeholder="Sender" maxLength={27} value={Transaction.sender} name="sender" onChange={handleChange}
                       className="text-white placeholder-white w-full rounded-[9px] border-green-500 border p-2 bg-[#2D2A2A] " />
            </div>

        </div>
        <div className='flex flex-row gap-3 w-[400px] h-[30px] rounded-[9px] mb-6'>
            <div className="flex flex-col relative w-[400px]">
                <label
                    className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">IBAN</label>
                <input type="text" placeholder="IBAN" maxLength={27} value={Transaction.iban} name="iban" onChange={handleChange}
                       className="text-white placeholder-white w-full rounded-[9px] border-green-500 border p-2 bg-[#2D2A2A]"  />
            </div>

        </div>

        <div className='flex flex-row gap-3 w-[400px] h-[30px] rounded-[9px] mb-6'>
            <div className="flex flex-col relative w-[400px]">
                <label
                    className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Variable symbol</label>
                <input type="text" placeholder="Variable symbol" maxLength={27} value={Transaction.vb} name="vb" onChange={handleChange}
                       className=" text-white placeholder-white w-full rounded-[9px] border-green-500 border p-2 bg-[#2D2A2A]" />
            </div>

        </div>
        <div className='flex flex-row gap-3 w-[400px] h-[30px] rounded-[9px] mb-6'>
            <div className="flex flex-col relative w-[400px]">
                <label
                    className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">IBAN Sender</label>
                <input type="text" placeholder="Variable symbol" maxLength={27} value={Transaction.ibanSender} name="ibanSender" onChange={handleChange}
                       className="text-white placeholder-white w-full rounded-[9px] border-green-500 border p-2 bg-[#2D2A2A]" />
            </div>

        </div>
        <div className='flex flex-row gap-3 w-[400px] items-center justify-center'>


            <button type="submit"
                    className=' text-white placeholder-white w-[100px] h-[40px] bg-green-500 hover:scale-110 transition-transform duration-300 text-white'>Add
            </button>
        </div>
    </div>
            </form>


    </div>)

}

export const Transaction=({setshowcomponent})=>{


    const [activelabel, setactivelabel] = useState(null);
    const [savedData, setSavedData] = useState([]);
    const [typeExpenses, setType] = useState('Cash');
    

    const ExpensesTransaction = {
        
        Name: useRef(),
        Price: useRef(),
        Taxes:useRef(),
        WithoutTaxes: useRef(),
        Sender: useRef(),
        Receiver: useRef(),
        IBAN: useRef(),
        VB: useRef(),
        IBANSender: useRef(),
        
    };

    useEffect( () => {
        
        console.log(savedData)
    },[savedData])
    

    
    
    

    




    const PositionFormular=()=>{

        var postion=''
        if(activelabel!='Table'&&activelabel!='Detail'){
            postion='absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center justify-center z-20';
        }else if(activelabel==='Detail'){
            postion='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-[60%] z-20 h-[550px]';
        }else if(activelabel==='Table'){
            postion='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] z-20' ;
        }
        return postion;
    }

    console.log('okoko');
    return (<>{typeExpenses === 'Cash' && (<div className={`${PositionFormular()}  flex flex-row`}>
        {activelabel === 'Table' && (<div className={`h-[550px] w-[calc(100%-500px)] relative -mr-[6px]  `}><DataTable data={savedData} type={typeExpenses} /></div>)}
        {activelabel === 'Detail' && (<div className={`h-full w-[calc(100%-500px)] relative -mr-[6px]  `}><CashDetail setSavedData={setSavedData}/></div>)}
            <div className={` h-[550px]  flex flex-row`}><FormTransaction activelabel={activelabel} setactivelabel={setactivelabel} savedData={savedData} setSavedData={setSavedData} setType={setType} type={typeExpenses} setshowcomponent={setshowcomponent}/></div>
        

        </div>)}

        {typeExpenses === 'Transaction' && (<div className={`${PositionFormular()}  h-[550px]  flex flex-row`}>
            {activelabel === 'Table' && (<div className={`h-[550px] w-[calc(100%-500px)] relative -mr-[6px]  `}><DataTable data={savedData} type={typeExpenses} /></div>)}
            {activelabel === 'Detail' && (<div className={`h-full w-[calc(100%-500px)] relative -mr-[6px]  `}><TransactionDetail setSavedData={setSavedData}   /></div>)}
            <div className={` h-[550px]  flex flex-row`}><FormTransaction activelabel={activelabel} setactivelabel={setactivelabel} savedData={savedData} setSavedData={setSavedData} setType={setType} type={typeExpenses} setshowcomponent={setshowcomponent}/></div>
        </div>)}

            
        

        </>

    )
}





export default FormTransaction;


const cashrows=[
    { field: "name", flex:2,filter: "agNumberColumnFilter", editable: true, cellStyle: {  fontSize:'16px', fontWeight: 'bold',whiteSpace: 'normal', wordWrap: 'break-word',lineHeight: '1.2', display: 'flex', justifyContent: 'center',alignItems: 'center'},

    },
    { field: "sender", flex:2,filter: "agNumberColumnFilter", editable: true, cellStyle: {  fontSize:'16px', fontWeight: 'bold',whiteSpace: 'normal', wordWrap: 'break-word',lineHeight: '1.2', display: 'flex', justifyContent: 'center',alignItems: 'center'},

    },

    { field: "price", flex:1,minWidth:80,filter: "agNumberColumnFilter", editable: true, cellStyle: {  fontSize:'16px', fontWeight: 'bold',whiteSpace: 'normal', wordWrap: 'break-word',lineHeight: '1.2', display: 'flex', justifyContent: 'center',alignItems: 'center'},

    },
    { field: "taxes", flex:1,minWidth:80,filter: "agNumberColumnFilter", editable: true, cellStyle: {  fontSize:'16px', fontWeight: 'bold',whiteSpace: 'normal', wordWrap: 'break-word',lineHeight: '1.2', display: 'flex', justifyContent: 'center',alignItems: 'center'},

    },
    { header:'without taxes',minWidth:120, field: "WithoutTaxes", flex:1,filter: "agNumberColumnFilter", editable: true, cellStyle: {  fontSize:'16px', fontWeight: 'bold',whiteSpace: 'normal', wordWrap: 'break-word',lineHeight: '1.2', display: 'flex', justifyContent: 'center',alignItems: 'center'},

    },
    { field: "place", flex:2,  filter: 'agTextColumnFilter',cellStyle: {  fontSize:'14px', fontWeight: 'bold',whiteSpace: 'normal', wordWrap: 'break-word',lineHeight: '1.2', display: 'flex', justifyContent: 'center',alignItems: 'center'}},
    { field: "country", flex:2,  filter: 'agTextColumnFilter',cellStyle: {  fontSize:'14px', fontWeight: 'bold',whiteSpace: 'normal', wordWrap: 'break-word',lineHeight: '1.2', display: 'flex', justifyContent: 'center',alignItems: 'center'}},
    { width:60,
        cellRenderer: (params) => {
            return(<div className={'h-full flex flex-row justify-center items-center'}><button className={'transition-transform duration-300 hover:scale-150 hover:opacity-100 opacity-80'}><img className={'w-[25px] h-[25px] '} src={'src/assets/edit.svg'}/></button><button className={'transition-transform duration-300 hover:scale-150 opacity-80 hover:z-20 hover:opacity-100'}><img className={'w-[25px] h-[25px] hover:shadow-black-500 '} src={'src/assets/Delete.svg'}/></button></div>)
        },cellStyle: { padding: 0, margin: 0 } },

];

const Transactionrows=[

    { field: "name", width:100,filter: "agNumberColumnFilter", editable: true, cellStyle: {  fontSize:'16px', fontWeight: 'bold',whiteSpace: 'normal', wordWrap: 'break-word',lineHeight: '1.2', display: 'flex', justifyContent: 'center',alignItems: 'center'},

    },
    { field: "sender", width:120,filter: "agNumberColumnFilter", editable: true, cellStyle: {  fontSize:'16px', fontWeight: 'bold',whiteSpace: 'normal', wordWrap: 'break-word',lineHeight: '1.2', display: 'flex', justifyContent: 'center',alignItems: 'center'},

    },
    { field: "price", width:100,filter: "agNumberColumnFilter", editable: true, cellStyle: {  fontSize:'16px', fontWeight: 'bold',whiteSpace: 'normal', wordWrap: 'break-word',lineHeight: '1.2', display: 'flex', justifyContent: 'center',alignItems: 'center'},

    },
    { field: "taxes", width:100,filter: "agNumberColumnFilter", editable: true, cellStyle: {  fontSize:'16px', fontWeight: 'bold',whiteSpace: 'normal', wordWrap: 'break-word',lineHeight: '1.2', display: 'flex', justifyContent: 'center',alignItems: 'center'},

    },
    { header:'without taxes', field: "WithoutTaxes", width:100,filter: "agNumberColumnFilter", editable: true, cellStyle: {  fontSize:'16px', fontWeight: 'bold',whiteSpace: 'normal', wordWrap: 'break-word',lineHeight: '1.2', display: 'flex', justifyContent: 'center',alignItems: 'center'},

    },
    { field: "vb", width:120,  filter: 'agTextColumnFilter',cellStyle: {  fontSize:'14px', fontWeight: 'bold',whiteSpace: 'normal', wordWrap: 'break-word',lineHeight: '1.2', display: 'flex', justifyContent: 'center',alignItems: 'center'}},
    { field: "iban", width:120,  filter: 'agTextColumnFilter',cellStyle: {  fontSize:'14px', fontWeight: 'bold',whiteSpace: 'normal', wordWrap: 'break-word',lineHeight: '1.2', display: 'flex', justifyContent: 'center',alignItems: 'center'}},
    { field: "ibanSender", width:120,  filter: 'agTextColumnFilter',cellStyle: {  fontSize:'14px', fontWeight: 'bold',whiteSpace: 'normal', wordWrap: 'break-word',lineHeight: '1.2', display: 'flex', justifyContent: 'center',alignItems: 'center'}},
    { width:60,
        cellRenderer: (params) => {
            return(<div className={'h-full flex flex-row justify-center items-center'}><button className={'transition-transform duration-300 hover:scale-150 hover:opacity-100 opacity-80'}><img className={'w-[25px] h-[25px] '} src={'src/assets/edit.svg'}/></button><button className={'transition-transform duration-300 hover:scale-150 opacity-80 hover:z-20 hover:opacity-100'}><img className={'w-[25px] h-[25px] hover:shadow-black-500 '} src={'src/assets/Delete.svg'}/></button></div>)
        },cellStyle: { padding: 0, margin: 0 } },

];

const ExpensesDataForm = ({data, type}) => {

    const [showComponent, setShowComponent] = useState(false);
    
    useEffect(() => {
        
        console.log(data);
        setRowData(Array.isArray(data) ? data : [data]);
    }, [data]);

    useEffect(() => {
        setColDefs(type === "Cash" ? cashrows : Transactionrows);
       
    }, [type]);


    const [rowData, setRowData] = useState([]

    );
    const columnsStyle = {
        backgroundColor:'bg-gradient-to-r from-[#3A3535] to-[#1F1B1B]'
    };

    // Column Definitions: Defines the columns to be displayed.
    
    
    
    
    
    const [colDefs, setColDefs] = useState(cashrows);
    const defaultColDef = useMemo(() => {
        return {




        };
    }, []);



    const rowStyle = {
        borderBottom: '2px solid green', background:'linear-gradient(to right, #3A3535, #1F1B1B)',  display: 'flex', alignItems:"center", justifyContent:"center", textAlign:"center"
    };
    const headerStyle = {
        borderBottom: '2px solid green', backgroundColor:'black'
    };







    return (<div
            className={
                "ag-theme-quartz-dark border-2 p-1   h-full min-w-[660px]  rounded-lg shadow-md border-none overflow-y-scroll mb-8 overflow-x-hidden"
            }
            style={{height: '550px', background: 'linear-gradient(to right, #3A3535, #1F1B1B)', borderRadius: 15}}
        >

            <AgGridReact

                rowData={rowData}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}

                rowStyle={rowStyle}
                columnStyle={columnsStyle}
                rowHeight={70}
                domLayout="normal"




            />

        </div>
    );

    // ...

}





