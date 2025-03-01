import {useEffect, useMemo, useRef, useState} from "react";
import {HandCoins, Table} from 'lucide-react';
import CalendarForm from "./CalendarComponent.tsx";

import {IconLabel} from "@/assets/IconReact.jsx";
import {AgGridReact} from "ag-grid-react";
import * as response from "autoprefixer";
import { CircleDollarSign, ArrowLeftRight, Blocks } from 'lucide-react';
const FormTransaction = ({activelabel,setactivelabel, savedData, setSavedData, inpuref}) => {
    const currentDate = new Date().toLocaleDateString();

    const [dob, setDob] = useState(null);

    const [path, setpath] = useState('relative bottom-[120px] right-[25px] space-x-0 flex-row justify-start');

    const formRef = useRef();


    const handleactivelabel = (activelabel) => {


        setactivelabel(activelabel)


    }


    const handlesavedData = (inputRefs) => {




        const values = Object.keys(inputRefs).map(key => ({
            name: key,  // the key name (e.g., "Type")
            value: inputRefs[key].current ? inputRefs[key].current.value : '',
        }));


        const resultObject = values.reduce((acc, { name, value }) => {
            acc[name] = value;
            return acc;
        }, {});


        const arrays = Object.values(resultObject);

        console.log(arrays);
        console.log('hihiih');


        setSavedData(prevData => [...prevData, arrays]);



        formRef.current.reset();

    }
    console.log(inpuref)
    console.log('newewewe')
    console.log(inpuref)
    console.log('inpureftcash')

    return (
        <div className={` text-center w-[550px] h-[550px] bg-[#3A3535] rounded-[9px]  border-green-500 border shadow-lg shadow-black z-50`}>
            <div className='relative  h-[100px] w-[100px] left-1/2 bottom-20 transform -translate-x-1/2   flex justify-center items-center my-7 text-[17px] font-bold  rounded-full bg-gradient-to-r from-green-700 to-lime-400 border-green-500'><HandCoins color={"white"} className={'w-[64px] h-[64px]'} /></div>
            <div className={'relative bottom-[120px] right-[25px] space-x-0 flex-row justify-start'}>
                <div onClick={() => handleactivelabel('Table')}><IconLabel width='70px' height='60px' color={'green'}  /></div>
                <div onClick={() => handleactivelabel('Detail')}><IconLabel width='70px' height='60px' color={'blue'}/></div>
                <div onClick={() => handleactivelabel('Change')}><IconLabel width='70px' height='60px' color={'red'}/></div>

            </div>

            <form className=' relative bottom-[230px] flex flex-col justify-center items-center' ref={formRef}>
                <div className='w-[400px] mb-5'>
                    <div className='flex flex-row gap-3 w-[400px] h-[30px] rounded-[9px] mb-5'>
                        <div className="flex flex-col relative w-[250px]">
                            <label
                                className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Category</label>
                            <input type="Type" placeholder="Category"  maxLength={15}
                                   className="w-full rounded-[9px] border-green-500 border p-2 bg-gradient-to-t from-[#3A3535] to-[#3A3535]" ref={inpuref.Category}/>
                        </div>
                        <div className="flex flex-col relative w-[170px]">
                            <label
                                className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Date</label>

                            <CalendarForm  className='bg-black' dob={dob} setDob={setDob} ref={inpuref.Date} ></CalendarForm>

                        </div>
                    </div>
                    <div className='flex flex-row gap-3 w-[400px] h-[30px] rounded-[9px] mb-5'>
                        <div className="flex flex-col relative w-[400px]">
                            <label
                                className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Name</label>
                            <input type="text" placeholder="Name" maxLength={40}
                                   className="w-full rounded-[9px] border-green-500 border p-2 bg-gradient-to-t from-[#3A3535] to-[#3A3535]" ref={inpuref.Name} />
                        </div>

                    </div>

                    <div className='flex flex-row gap-3 w-[400px] h-[30px] rounded-[9px] mb-5'>
                        <div className="flex flex-col relative w-[400px]">
                            <label
                                className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Sender</label>
                            <input type="text" placeholder="Name of the Sender" maxLength={27}
                                   className="w-full rounded-[9px] border-green-500 border p-2 bg-gradient-to-t from-[#3A3535] to-[#3A3535]" ref={inpuref.Sender}/>
                        </div>

                    </div>


                    <div className='flex flex-row gap-3 w-[400px] h-[100px] rounded-[9px] mb-5'>
                        <div className="flex flex-col relative w-full">
                            <label
                                className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b" >Notes</label>
                            <textarea
                                placeholder="Comment" maxLength={300}
                                className="w-full h-full rounded-[9px] border-green-500 border p-2 bg-gradient-to-t from-[#3A3535] to-[#3A3535]" ref={inpuref.Description}
                            ></textarea>
                        </div>

                        <div className="flex flex-col relative w-[180px]" >
                            <label
                                className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Price</label>
                            <input type="number" placeholder="0" max={2000}
                                   className="w-full rounded-[9px] border-green-500 border p-2 bg-gradient-to-t from-[#3A3535] to-[#3A3535]" ref={inpuref.Price}/>

                            {inpuref.Type==='Transaction'&&(<div className={'mt-3'}>
                            <label
                                className="absolute top-[40px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Typ</label>
                            <input type="number" placeholder="Typ" max={2000}
                                   className="w-full rounded-[9px] border-green-500 border p-2 bg-gradient-to-t from-[#3A3535] to-[#3A3535]" ref={inpuref.Typ}/>
                            </div>)}

                        </div>


                    </div>

                </div>
                <div
                    className=' h-[70px] w-[400px] border-2 border-dashed border-green-500 items-center justify-center text-white'>
                    <label htmlFor="file-upload">
                        <span>Upload Additional File</span>
                        <input id="file-upload" type="file"/>
                    </label>

                </div>
                <p className='mb-2 text-[12px] text-white' >Attach file. File size of your documents should not exceed 10MB.</p>
                <div className='flex flex-row gap-3 w-[400px]'>
                    <button type="button"
                        className='w-[80px] h-[40px] bg-[#3A3535] hover:scale-110 transition-transform duration-300 text-white ' onClick={() => window.location.reload()}>Cancel
                    </button>
                    <button type="button" onClick={() => handlesavedData(inpuref)}
                            className='w-[100px] h-[40px] bg-green-500 hover:scale-110 transition-transform duration-300 text-white'>ADD
                    </button>
                    <button type="submit"
                        className='w-[300px] h-[40px] bg-green-500 hover:scale-110 transition-transform duration-300 text-white'>Submit
                    </button>
                </div>
            </form>
        </div>
    );
};
const CashTable=(data)=>{


    return (<div className={'h-full bg-[#3A3535] rounded-l-[9px] border-green-500 border' }><ExpensesCashDataForm data={data}></ExpensesCashDataForm></div>)
}
const TrasactionTable=(data)=>{


    return (<div className={'h-full bg-[#3A3535] rounded-l-[9px] border-green-500 border' }><ExpensesTransactionDataForm data={data}></ExpensesTransactionDataForm></div>)
}



const CashDetail=({inpuref})=> {

    console.log(inpuref)
    console.log('inpureflec')
    return (<div className={'h-full w-full bg-[#3A3535] rounded-l-[9px] border-green-500  justify-center border  items-center text-center  flex flex-col ' }>
        <div className={'relative bottom-10 left-0 text-[30px]  flex flex-col items-center justify-center'}><CircleDollarSign size={'50%'} color={'#22c55e'} className={' '} /> <h1 className={'text-white'}>Cash Expenses Detail</h1></div>


        <div className='flex flex-row gap-3 w-[400px] h-[30px] rounded-[9px] mb-5'>
            <div className="flex flex-col relative w-[200px]">
                <label
                    className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Taxes</label>
                <input type="text" placeholder="Taxes" maxLength={40} ref={inpuref.Taxes}
                       className="w-full rounded-[9px] border-green-500 border p-2 bg-gradient-to-t from-[#3A3535] to-[#3A3535]"  />
            </div>

            <div className="flex flex-col relative w-[200px]">
                <label
                    className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Without taxes</label>
                <input type="text" placeholder="Without taxes" maxLength={27} ref={inpuref.WithoutTaxis}
                       className="w-full rounded-[9px] border-green-500 border p-2 bg-gradient-to-t from-[#3A3535] to-[#3A3535]" />
            </div>

        </div>


        <div className='flex flex-row gap-3 w-[400px] h-[30px] rounded-[9px] mb-5'>
            <div className="flex flex-col relative w-[400px]">
                <label
                    className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Receiver</label>
                <input type="text" placeholder="Receiver" maxLength={27} ref={inpuref.Receiver}
                       className="w-full rounded-[9px] border-green-500 border p-2 bg-gradient-to-t from-[#3A3535] to-[#3A3535]" />
            </div>

        </div>
        <div className='flex flex-row gap-3 w-[400px] h-[30px] rounded-[9px] mb-5'>
            <div className="flex flex-col relative w-[400px]">
                <label
                    className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Place</label>
                <input type="text" placeholder="Place" maxLength={27} ref={inpuref.Place}
                       className="w-full rounded-[9px] border-green-500 border p-2 bg-gradient-to-t from-[#3A3535] to-[#3A3535]" />
            </div>

        </div>

        <div className='flex flex-row gap-3 w-[400px] h-[30px] rounded-[9px] mb-5'>
            <div className="flex flex-col relative w-[400px]">
                <label
                    className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Country</label>
                <input type="text" placeholder="Country" maxLength={27} ref={inpuref.country}
                       className="w-full rounded-[9px] border-green-500 border p-2 bg-gradient-to-t from-[#3A3535] to-[#3A3535]" />
            </div>

        </div>


    </div>)
}

const TrasactionChange=({setType})=> {
    return (<div className={'h-full bg-[#3A3535] rounded-[9px] border-green-500 border flex-col items-center justify-center z-9999' }>

        <button className={'w-full h-[50%]  border-green-500  items-center rounded-[9px] justify-center flex bg-gradient-to-r from-black to-green-500 z-9999'}><CircleDollarSign size='50%'  color={'#22c55e'} className={'  transition-transform duration-300 hover:scale-150  rounded-full '} onClick={()=>setType('Cash')}/></button>
        <button className={' items-center justify-center flex w-full h-[50%] rounded-[9px]  z-10 bg-gradient-to-r from-black to-blue-700 z-9999'}><ArrowLeftRight size='50%' color={'#0277bd'} className={'  text-[50px] transition-transform duration-300 hover:scale-150 bg-black-700'} onClick={()=>setType('Transaction')}/></button></div>)
}


const TransactionDetail=({inpuref})=> {

    console.log(inpuref)
    console.log('inpureftransaction')
    return (<div className={'h-full w-full bg-[#3A3535] rounded-l-[9px] border-green-500  justify-center border  items-center text-center  flex flex-col ' }>
        <div className={'relative bottom-10 left-0 text-[30px]  flex flex-col items-center justify-center'}><ArrowLeftRight size={'50%'} color={'#0277bd'} className={' '} /> <h1 className={''}>Transaction Expenses Detail</h1></div>


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
                    className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">IBAN</label>
                <input type="text" placeholder="IBAN" maxLength={27} ref={inpuref.IBAN}
                       className="w-full rounded-[9px] border-green-500 border p-2" />
            </div>

        </div>

        <div className='flex flex-row gap-3 w-[400px] h-[30px] rounded-[9px] mb-5'>
            <div className="flex flex-col relative w-[400px]">
                <label
                    className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Variable symbol</label>
                <input type="text" placeholder="Variable symbol" maxLength={27} ref={inpuref.VS}
                       className="w-full rounded-[9px] border-green-500 border p-2" />
            </div>

        </div>
        <div className='flex flex-row gap-3 w-[400px] h-[30px] rounded-[9px] mb-5'>
            <div className="flex flex-col relative w-[400px]">
                <label
                    className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">IBAN Sender</label>
                <input type="text" placeholder="Variable symbol" maxLength={27} ref={inpuref.IBANSender}
                       className="w-full rounded-[9px] border-green-500 border p-2" />
            </div>

        </div>


    </div>)

}

export const Transaction=(handleButtonClick)=>{


    const [activelabel, setactivelabel] = useState(null);
    const [savedData, setSavedData] = useState([]);
    const [typeExpenses, setType] = useState(null);

    const inputRefs = {
        Type: typeExpenses,
        Category: useRef(),
        Name: useRef(),
        Sender:useRef(),
        Description: useRef(),
        Price: useRef(),
        Date: useRef(),
        Taxes: useRef(),
        WithoutTaxis: useRef(),
        Receiver: useRef(),
        Place: useRef(),
        country: useRef(),
    };

    const inputRefstransaction = {
        Type: typeExpenses,
        Typ: useRef(),
        Category: useRef(),
        Name: useRef(),
        Sender:useRef(),
        Description: useRef(),
        Price: useRef(),
        Date: useRef(),
        Taxes: useRef(),
        WithoutTaxis: useRef(),
        Receiver: useRef(),
        VS: useRef(),
        IBAN: useRef(),
        IBANSender: useRef(),
    };




    const PositionFormular=()=>{

        var postion=''
        if(activelabel!='Table'&&activelabel!='Detail'&&activelabel!='Change'&&activelabel!='Category'){
            postion='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center justify-center z-20';
        }else if(activelabel==='Detail'){
            postion='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-[60%] z-20';
        }else if(activelabel==='Table'){
            postion='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] z-20' ;
        }else if(activelabel==='Change'||activelabel==='Category'){
            postion='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%] z-20';
        }
        return postion;
    }

    console.log(inputRefs);
    return (<>{typeExpenses === 'Cash' && (<div className={`${PositionFormular()}  h-[550px]  flex flex-row`}>
        {activelabel === 'Table' && (<div className={`h-full w-[calc(100%-500px)] relative -mr-[6px]  `}><CashTable data={savedData} /></div>)}
        {activelabel === 'Detail' && (<div className={`h-full w-[calc(100%-500px)] relative -mr-[6px]  `}><CashDetail data={savedData} inpuref={inputRefs}/></div>)}
        {activelabel === 'Change' && (<div className={`h-full w-[calc(100%-500px)] relative -mr-[6px] z-9999'`}><TrasactionChange data={savedData} setType={setType}/></div>)}

        <div className={''}><FormTransaction activelabel={activelabel} setactivelabel={setactivelabel} savedData={savedData} setSavedData={setSavedData} inpuref={inputRefs} /></div></div>)}

        {typeExpenses === 'Transaction' && (<div className={`${PositionFormular()}  h-[550px]  flex flex-row`}>
            {activelabel === 'Table' && (<div className={`h-full w-[calc(100%-500px)] relative -mr-[6px]  `}><TrasactionTable data={savedData} /></div>)}
            {activelabel === 'Detail' && (<div className={`h-full w-[calc(100%-500px)] relative -mr-[6px]  `}><TransactionDetail data={savedData} inpuref={inputRefstransaction}   /></div>)}
            {activelabel === 'Change' && (<div className={`h-full w-[calc(100%-500px)] relative -mr-[6px] z-9999'`}><TrasactionChange data={savedData} setType={setType} /></div>)}

            <div className={''}><FormTransaction activelabel={activelabel} setactivelabel={setactivelabel} savedData={savedData} setSavedData={setSavedData} inpuref={inputRefstransaction} /></div></div>)}

        {(typeExpenses !== 'Transaction'&&typeExpenses !== 'Cash') && (<div className={`${PositionFormular()}  h-[550px] w-[60%] flex flex-row z-9999'`}>

            <div className={` h-full w-[calc(100%-500px)] relative -mr-[6px]  shadow-lg shadow-black z-9999'`}><TrasactionChange data={savedData} setType={setType} /></div>

            </div>)}

        </>

    )
}





export default FormTransaction;


const ExpensesCashDataForm = (data) => {

    const [showComponent, setShowComponent] = useState(false);






    var datanew=data.data.data

    console.log(datanew)
    console.log('haalaa')
    console.log(datanew)
    useEffect(() => {
        const transformedData = datanew.map(item => ({
            Type: item[0] || 'Cash',
            Name: item[2],
            Sender: item[3],
            Receiver: item[9],
            Price: item[5],
            Taxes: item[7],
            WithoutTax: item[8],
            Date: item[6],
            Place: item[10],
            Country: item[11],
            Description: item[4],
        }));

        setRowData(transformedData); // Update state when datanew changes
    }, [datanew]);


    const [rowData, setRowData] = useState(

    );
    const columnsStyle = {
        backgroundColor:'bg-gradient-to-r from-[#3A3535] to-[#1F1B1B]'
    };

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState([




        { field: "Name", width:100,filter: "agNumberColumnFilter", editable: true, cellStyle: {  fontSize:'16px', fontWeight: 'bold',whiteSpace: 'normal', wordWrap: 'break-word',lineHeight: '1.2', display: 'flex', justifyContent: 'center',alignItems: 'center'},

        },
        { field: "Sender", width:120,filter: "agNumberColumnFilter", editable: true, cellStyle: {  fontSize:'16px', fontWeight: 'bold',whiteSpace: 'normal', wordWrap: 'break-word',lineHeight: '1.2', display: 'flex', justifyContent: 'center',alignItems: 'center'},

        },
        { field: "Receiver", width:120,filter: "agNumberColumnFilter", editable: true, cellStyle: {  fontSize:'16px', fontWeight: 'bold',whiteSpace: 'normal', wordWrap: 'break-word',lineHeight: '1.2', display: 'flex', justifyContent: 'center',alignItems: 'center'},

        },
        { field: "Price", width:100,filter: "agNumberColumnFilter", editable: true, cellStyle: {  fontSize:'16px', fontWeight: 'bold',whiteSpace: 'normal', wordWrap: 'break-word',lineHeight: '1.2', display: 'flex', justifyContent: 'center',alignItems: 'center'},

        },
        { field: "Taxes", width:100,filter: "agNumberColumnFilter", editable: true, cellStyle: {  fontSize:'16px', fontWeight: 'bold',whiteSpace: 'normal', wordWrap: 'break-word',lineHeight: '1.2', display: 'flex', justifyContent: 'center',alignItems: 'center'},

        },
        { header:'Without taxes', field: "WithoutTax", width:100,filter: "agNumberColumnFilter", editable: true, cellStyle: {  fontSize:'16px', fontWeight: 'bold',whiteSpace: 'normal', wordWrap: 'break-word',lineHeight: '1.2', display: 'flex', justifyContent: 'center',alignItems: 'center'},

        },
        { field: "Date", width:120,  filter: 'agTextColumnFilter',cellStyle: {  fontSize:'14px', fontWeight: 'bold',whiteSpace: 'normal', wordWrap: 'break-word',lineHeight: '1.2', display: 'flex', justifyContent: 'center',alignItems: 'center'}},
        { field: "Place", width:120,  filter: 'agTextColumnFilter',cellStyle: {  fontSize:'14px', fontWeight: 'bold',whiteSpace: 'normal', wordWrap: 'break-word',lineHeight: '1.2', display: 'flex', justifyContent: 'center',alignItems: 'center'}},
        { field: "Country", width:120,  filter: 'agTextColumnFilter',cellStyle: {  fontSize:'14px', fontWeight: 'bold',whiteSpace: 'normal', wordWrap: 'break-word',lineHeight: '1.2', display: 'flex', justifyContent: 'center',alignItems: 'center'}},
        { field: "Description", width:220, filter: "agTextColumnFilter", editable: true, cellStyle: {  fontSize:'12px',fontWeight: 'bold',whiteSpace: 'normal', wordWrap: 'break-word',lineHeight: '1.2', color: "gray",} },
        { width:60,
            cellRenderer: (params) => {
                return(<div className={'h-full flex flex-row justify-center items-center'}><button className={'transition-transform duration-300 hover:scale-150 hover:opacity-100 opacity-80'}><img className={'w-[25px] h-[25px] '} src={'src/assets/edit.svg'}/></button><button className={'transition-transform duration-300 hover:scale-150 opacity-80 hover:z-20 hover:opacity-100'}><img className={'w-[25px] h-[25px] hover:shadow-black-500 '} src={'src/assets/Delete.svg'}/></button></div>)
            },cellStyle: { padding: 0, margin: 0 } },

    ]);
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


const ExpensesTransactionDataForm = (data) => {

    const [showComponent, setShowComponent] = useState(false);






    var datanew=data.data.data

    console.log(datanew)
    console.log('haalaa')
    console.log(datanew)
    useEffect(() => {
        const transformedData = datanew.map(item => ({
            Type: item[0] || 'Cash',
            Typ:item[1],
            Name: item[3],
            Sender: item[4],
            Receiver: item[10],
            Price: item[6],
            Taxes: item[8],
            WithoutTax: item[9],
            Date: item[7],
            VS: item[11],
            IBAN: item[12],
            Description: item[5],
            IBANSender: item[13],
        }));

        setRowData(transformedData); // Update state when datanew changes
    }, [datanew]);


    const [rowData, setRowData] = useState(

    );
    const columnsStyle = {
        backgroundColor:'bg-gradient-to-r from-[#3A3535] to-[#1F1B1B]'
    };

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState([



        { field: "Typ", width:100,filter: "agNumberColumnFilter", editable: true, cellStyle: {  fontSize:'16px', fontWeight: 'bold',whiteSpace: 'normal', wordWrap: 'break-word',lineHeight: '1.2', display: 'flex', justifyContent: 'center',alignItems: 'center'},

        },
        { field: "Name", width:100,filter: "agNumberColumnFilter", editable: true, cellStyle: {  fontSize:'16px', fontWeight: 'bold',whiteSpace: 'normal', wordWrap: 'break-word',lineHeight: '1.2', display: 'flex', justifyContent: 'center',alignItems: 'center'},

        },
        { field: "Sender", width:120,filter: "agNumberColumnFilter", editable: true, cellStyle: {  fontSize:'16px', fontWeight: 'bold',whiteSpace: 'normal', wordWrap: 'break-word',lineHeight: '1.2', display: 'flex', justifyContent: 'center',alignItems: 'center'},

        },
        { field: "Receiver", width:120,filter: "agNumberColumnFilter", editable: true, cellStyle: {  fontSize:'16px', fontWeight: 'bold',whiteSpace: 'normal', wordWrap: 'break-word',lineHeight: '1.2', display: 'flex', justifyContent: 'center',alignItems: 'center'},

        },
        { field: "Price", width:100,filter: "agNumberColumnFilter", editable: true, cellStyle: {  fontSize:'16px', fontWeight: 'bold',whiteSpace: 'normal', wordWrap: 'break-word',lineHeight: '1.2', display: 'flex', justifyContent: 'center',alignItems: 'center'},

        },
        { field: "Taxes", width:100,filter: "agNumberColumnFilter", editable: true, cellStyle: {  fontSize:'16px', fontWeight: 'bold',whiteSpace: 'normal', wordWrap: 'break-word',lineHeight: '1.2', display: 'flex', justifyContent: 'center',alignItems: 'center'},

        },
        { header:'Without taxes', field: "WithoutTax", width:100,filter: "agNumberColumnFilter", editable: true, cellStyle: {  fontSize:'16px', fontWeight: 'bold',whiteSpace: 'normal', wordWrap: 'break-word',lineHeight: '1.2', display: 'flex', justifyContent: 'center',alignItems: 'center'},

        },
        { field: "Date", width:120,  filter: 'agTextColumnFilter',cellStyle: {  fontSize:'14px', fontWeight: 'bold',whiteSpace: 'normal', wordWrap: 'break-word',lineHeight: '1.2', display: 'flex', justifyContent: 'center',alignItems: 'center'}},
        { field: "VS", width:120,  filter: 'agTextColumnFilter',cellStyle: {  fontSize:'14px', fontWeight: 'bold',whiteSpace: 'normal', wordWrap: 'break-word',lineHeight: '1.2', display: 'flex', justifyContent: 'center',alignItems: 'center'}},
        { field: "IBAN", width:120,  filter: 'agTextColumnFilter',cellStyle: {  fontSize:'14px', fontWeight: 'bold',whiteSpace: 'normal', wordWrap: 'break-word',lineHeight: '1.2', display: 'flex', justifyContent: 'center',alignItems: 'center'}},
        { field: "IBANSender", width:120,  filter: 'agTextColumnFilter',cellStyle: {  fontSize:'14px', fontWeight: 'bold',whiteSpace: 'normal', wordWrap: 'break-word',lineHeight: '1.2', display: 'flex', justifyContent: 'center',alignItems: 'center'}},

        { field: "Description", width:220, filter: "agTextColumnFilter", editable: true, cellStyle: {  fontSize:'12px',fontWeight: 'bold',whiteSpace: 'normal', wordWrap: 'break-word',lineHeight: '1.2', color: "gray",} },
        { width:60,
            cellRenderer: (params) => {
                return(<div className={'h-full flex flex-row justify-center items-center'}><button className={'transition-transform duration-300 hover:scale-150 hover:opacity-100 opacity-80'}><img className={'w-[25px] h-[25px] '} src={'src/assets/edit.svg'}/></button><button className={'transition-transform duration-300 hover:scale-150 opacity-80 hover:z-20 hover:opacity-100'}><img className={'w-[25px] h-[25px] hover:shadow-black-500 '} src={'src/assets/Delete.svg'}/></button></div>)
            },cellStyle: { padding: 0, margin: 0 } },

    ]);
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


