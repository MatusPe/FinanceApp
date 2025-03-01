import {AgGridReact} from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import {useMemo, useState, useEffect} from "react"; // Optional Theme applied to the Data Grid
import '../CSS/DateTable.css';
import { toast } from 'react-toastify';

import {Transaction} from "@/components/MyComponent/Expenses/FormTransaction.jsx";
import {LoginAPI} from "@/components/MyComponent/Services/AuthServices.jsx";
import {handleError} from "@/Helpers/handleError.jsx";

import axios from "axios";
import Detail from "@/components/MyComponent/Expenses/DetailExpenses.jsx";
import { CalendarSearch } from 'lucide-react';
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo/index.js";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Box } from "@mui/material";
import {DeleteExpensesApi, UpdateExpensesApi, UpdateonlyExpensesApi} from "@/components/MyComponent/Services/ApiService.jsx";

const api="https://localhost:44301/";
const ExpensesData = () => {
    const [showComponent, setShowComponent] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [startime, setStartime] = useState(new Date(new Date(new Date().setMonth(new Date().getMonth() - 1))));
    const [endTime, setEndTime] = useState(new Date());
    const [edit, setEdit] = useState(false);
    const [lastKey, setLastKey] = useState(null);
    const [ExpensesDetail, setExpensesDetail] = useState(null);
    
    const [tempStartTime, setTempStartTime] = useState(new Date(new Date().setMonth(new Date().getMonth() - 1)));
    const [tempEndTime, setTempEndTime] = useState(new Date());
    const handleClickedTime= async ()=>{
        setShowCalendar(!showCalendar);
        
        if (startime.getTime()===new Date(tempStartTime).getTime()&&endTime.getTime()===new Date(tempEndTime).getTime()){return}
        
        if (tempStartTime>tempEndTime){
            toast.error("Wrong range define");
            return;
        }
            
        
        await setStartime(new Date(tempStartTime));
        await setEndTime(new Date(tempEndTime));
        
        
        
    }

    useEffect(() => {
        
        const GetDateExpenses = async () => {
            try {
                const startDate = startime.toISOString();  // Convert Date object to ISO string
                const endDate = endTime.toISOString();
                console.log(startDate, endDate);
                const data= await axios.get
                (api+"api/Expenses/GetExpensesByDate",{params:{ startDate, endDate}}
                ).then((res)=> {
                    
                    console.log(res.data);
                    setRowData(res.data);
                    console.log(rowData)
                })
                return data;
                

            } catch (err) {
                console.error('Login failed:', err); // Catch and handle errors
                handleError(err); // Make sure handleError is defined
            }
        }
        const data=GetDateExpenses();
        console.log(data, "toto su data ktore si vybralnaozjasadaswdawd")
        
    }, [startime, endTime]);

    const handleButtonClick = () => {
        setShowComponent(!showComponent);

    };
    
    

    // Row Data: The data to be displayed.
     const [rowData, setRowData] = useState();
    const columnsStyle = {
        backgroundColor:'bg-gradient-to-r from-[#3A3535] to-[#1F1B1B]'
    };
    const handleset=()=>{
        
    }

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState([
        {  headerName: '', field:"type", width:45, sortable: true,groupSort: { order: 'desc' },headerHide: true, HeaderHeight:0, editable: true,
        cellRenderer: (params) => {

            return (<div className={'  ml-0'}><img className={'w-[32px] h-[32px]'} src={`src/assets/Expense/${params.data.type}.svg`}/></div>)
        },cellStyle: { padding: 0, margin: 0, zIndex:-1 }
        },
        { field: "category", width:110, filter: "agTextColumnFilter",editable: true,

        cellRenderer: (params) => {
            var bordercolorclass

            if(params.data.Category == "Loan"){
                bordercolorclass = 'yellow-500';
            }else if(params.data.Category == "investment"){
                bordercolorclass = 'blue-500';

            }else{
                bordercolorclass = 'green-500';
            }


            return(<div className={' w-full h-full flex items-center justify-center'}><div className={`w-[60px] h-[60px]  rounded-[20px] border-2 flex justify-center items-center border-${bordercolorclass} bg-black`} ><img className={'w-[80%] h-[80%]" '} src={`src/assets/Budget/${params.data.Category}.svg`} onError={(e) => e.target.src = 'src/assets/Budget/car.svg'}/></div></div>)

        },cellStyle: { padding: 0, margin: 0 }
        },
        { field: "name" , rowGroup:true, width:120,filter: "agTextColumnFilter", editable: true, cellStyle: {  fontSize:'16px', fontWeight: 'bold',whiteSpace: 'normal', wordWrap: 'break-word',lineHeight: '1.2'} , },
        { field: "sender", width:100, filter: "agTextColumnFilter", editable: true, cellStyle: {  fontSize:'12px',fontWeight: 'bold',whiteSpace: 'normal', wordWrap: 'break-word',lineHeight: '1.2', color: "gray",} },
        { field: "price", width:100,editable: true,filter: "agNumberColumnFilter",  cellStyle: {  fontSize:'16px', fontWeight: 'bold',whiteSpace: 'normal', wordWrap: 'break-word',lineHeight: '1.2', display: 'flex', justifyContent: 'center',alignItems: 'center'},
            cellRenderer: (params) => {

                var bordercolorclass

                if(params.data.Price >= 0){
                    bordercolorclass = 'green-500';
                }else {
                    bordercolorclass = 'red-500';
                }
                return(<div className={`text-${bordercolorclass}`}>{params.data.price}</div>)
            }
        },
        { field: "date", width:100,  editable: true,filter: 'agTextColumnFilter',cellStyle: {  fontSize:'14px', fontWeight: 'bold',whiteSpace: 'normal', wordWrap: 'break-word',lineHeight: '1.2', display: 'flex', justifyContent: 'center',alignItems: 'center'},valueGetter: (params) => {
                const date = new Date(params.data.date);
                return date.toLocaleDateString('en-GB'); // Change 'en-GB' to the desired locale
            }},
        { width:60,
            cellRenderer: (params) => {
                const handleUpdateClick = () => {
                    console.log("Row Data:", params.data); // This logs the full row data
                    UpdateonlyExpensesApi(params.data).then(data=>{
                        
                        console.log(data)
                    });
                };

                const handleDeleteClick = () => {
                    console.log("Row Data:", params.data); // This logs the full row data
                    DeleteExpensesApi(params.data).then(data=>{
            
                        console.log(data)
                    });
                    setRowData(prevData => prevData.filter(row => row.id !== params.data.id));
                };

                const handleDoubleClick = async () => {
                    await setExpensesDetail(params.data);
                    console.log("Row transaction Data:", params.data);
                    setShowDetail(true)
                    
                };
                
                
                
                
            return(<div className={'h-full flex flex-row justify-center items-center'}>
                <button onClick={handleUpdateClick} onDoubleClick={handleDoubleClick} className={'transition-transform duration-300 hover:scale-150 hover:opacity-100 opacity-80'}><img className={'w-[25px] h-[25px] '} src={'src/assets/edit.svg'}/></button>
                <button onClick={handleDeleteClick} className={'transition-transform duration-300 hover:scale-150 opacity-80 hover:z-20 hover:opacity-100'}><img className={'w-[25px] h-[25px] hover:shadow-black-500 '} src={'src/assets/Delete.svg'}/></button>
            
            </div>)
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

    const handleRowClick = (event) => {
        // event.data contains all the information of the clicked row
        console.log("Clicked Row Data:", event.data);

        // You can access specific columns like this:
        const { name, price, category, sender, date } = event.data;
        console.log(`Name: ${name}, Price: ${price}, Category: ${category}, Sender: ${sender}, Date: ${date}`);
    };
    
    const handleEnterKey = (event) => {
        const editedData = event.data;
        UpdateonlyExpensesApi(editedData).then(data=>{})
        // Add your custom logic here
    };
    const onCellEditCommit = (event) => {
        
        console.log("no Data:", event.data);
        if (event.oldValue !== event.newValue) {
            
            handleEnterKey(event);
        }
    };
    const onCellEditingStopped = (event) => {
        
        
        if (event.oldValue !== event.newValue) {
            console.log("newthinks", event.newValue);
            
            
            if (lastKey === 'Enter') {
                
                handleEnterKey(event);
            }
        }
        setEdit(false)
    };

    const handleKeyDown = (event) => {
        setLastKey(event.key);  // Store the last key pressed
    };

    useEffect(() => {

        if(edit)
            window.addEventListener('keydown', handleKeyDown);

        // Cleanup the event listener when the component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [edit]);

    const onCellEditingStarted = () => {
        setEdit(true);
    };

    let clickTimeout = null;

    const handleCellClick = (event) => {
        clickTimeout = setTimeout(() => {
            
            clickTimeout = null; // Reset timeout reference
        }, 250);
        console.log('firstclicked');
        
        console.log(event);
    };

    

    return (<div className={'  max-sm:hidden max-md:hidden rounded-[15px] border-green-500 border overflow-hidden min-w-[660px] '}>
            <div className={'relative z-10 '}>
                <div className={`  absolute translate-x-[calc(-100%+50px)] w-[370px] h-[50px] top-[100px]  flex bg-[#24232a] rounded-r-[9px] flex-row gap-2 justify-center items-center ${showCalendar?"left-[315px]":"left-0 "}  transition-all duration-300 ease-in-out`}
                >
                    <div className={'overflow-hidden w-[150px] '}>
                        <BasicDatePicker label={'Start Date'} setData={setTempStartTime} date={tempStartTime}></BasicDatePicker>
                    </div>
                    <div className={'overflow-hidden w-[150px] '} >
                        <BasicDatePicker label={'End Date'} setData={setTempEndTime} date={tempEndTime}></BasicDatePicker>
                    </div>
                    <div className={'pb-1 '}>
                        <div className={'shadow-black shadow-lg '} onClick={handleClickedTime}><CalendarSearch size={'35px'} color={'#22c55e'} className={''}/>
                        </div>

                    </div>
                </div>

            </div>
            <div
        className={ 
            "   ag-theme-quartz-dark border-2 p-1   max-h-full min-w-[660px] rounded-lg shadow-md border-none  mb-8 overflow-scroll max-sm:hidden max-md:hidden rounded-[15px] border-green-500 border overflow-hidden min-w-[660px]"
        }
        style={{height: 'auto', background: 'linear-gradient(to right, #3A3535, #1F1B1B)', borderRadius: 15}}
    >

            <AgGridReact

                rowData={rowData}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}

                rowStyle={rowStyle}
                columnStyle={columnsStyle}
                rowHeight={70}
                domLayout="autoHeight"
                onRowClicked={handleRowClick}
                onCellEditingStopped={onCellEditingStopped}
                onCellEditCommit={onCellEditCommit}
                suppressHorizontalScroll={true}
                onCellEditingStarted={onCellEditingStarted}
                onCellClicked={handleCellClick}
                


            />



                <div className="shadow-black shadow-lg mr-5 sticky bottom-10 float-end w-14 h-14 items-center justify-center text-center border-2 border-green-500 bg-black rounded-full  transition-transform duration-300 hover:scale-150" onClick={handleButtonClick}>
                    <img src="src/assets/list-plus.svg" alt="Transaction" className="w-full h-full object-contain" />

                </div>


                

        
            
        </div>





            {showComponent && <div className={''}> <Transaction  /></div>}
            {showDetail&& <div className={''}> <Detail data={ExpensesDetail} setshowcomponent={setShowDetail}></Detail></div>}
            

        
       
        </div>
        
        );

        // ...

        }


    


export function BasicDatePicker({label, setData,date}) {
    
    
    
    return (
        <div style={{ maxWidth:'150px',  padding: "0",margin:'0', display: "inline-block", overflow:"hidden",boxSizing: 'border-box', }}>
        <LocalizationProvider dateAdapter={AdapterDayjs} style={{ width: '150px' }} >
            <div style={{ maxWidth:'300px',  padding: "0",margin:'0', display: "inline-block", overflow:"hidden",boxSizing: 'border-box' }}>
            <DemoContainer components={['DatePicker']} style={{ width: '150px' }}>
                <div style={{ Width: '100%' }}>
                <DatePicker label={label} style={{ width: '150px' }}
                            value={date ? dayjs(date) : null}  // Ensure value is properly formatted
                            onChange={(newDate) => {
                                if (newDate) {
                                    setData(new Date(newDate)); // Ensure consistent data format
                                    console.log("Selected date:", newDate.toISOString());
                                }
                            }}
                            slotProps={{
                                
                                layout: {
                                    sx: {
                                        backgroundColor: "#3A3535",
                                        border: "1px solid #22c55e",
                                        borderRadius: "15px",
                                        color: "#22c55e",
                                        width: "300px",
                                        overflow:"hidden",
                                        
                                        
                                    },
                                },
                                textField: {
                                    
                                    
                                    sx: {
                                          // Set width of the input field
                                        overflow: 'hidden',
                                        width: '100%',
                                        
                                        
                                        color: 'green', // Green text color for the input
                                        '& .MuiOutlinedInput-root': {
                                            width: '150px',
                                            height: '35px',
                                            fontSize: '15px',
                                            
                                            '& fieldset': {
                                                borderColor: 'green', // Green border color for input
                                            },
                                            '&:hover fieldset': {
                                                
                                                borderColor: 'lightgreen', // Light green border on hover
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#22c55e', // Green border when focused
                                            },
                                        },
                                        '& .MuiInputBase-input': {
                                            marginLeft: '5px',
                                            padding: '0',
                                            color: 'green', // Green text inside the input
                                            
                                        },
                                        '& .MuiFormLabel-root': {
                                            fontSize: '12px',
                                            padding:'0',
                                            marginTop:'2px',
                                            color: 'green', // Green label color
                                            transform: 'translate(10px, -5px)',
                                            
                                        },
                                        
                                        '& .MuiFormLabel-root.Mui-focused': {
                                            transform: 'translate(10px, -5px)', // Moves up on focus
                                            color: '#22c55e', // Brighter green when focused
                                        },
                                        '& .MuiSvgIcon-root': {
                                            color: 'green', // Changes the calendar icon color
                                        },
                                    },
                                },
                                popper: {
                                    sx: {
                                        
                                        "& .MuiPaper-root": {
                                            backgroundColor: "#222222",  // Background of the calendar
                                            color: "lightgrey",          // Text color
                                            borderRadius: "15px",
                                            fontSize: '10px',
                                            
                                            
                                        },
                                        "& .MuiPickersDay-root": {
                                            color: "lightgrey", // Dates color
                                            fontSize: '10px',
                                            
                                        },
                                        "& .MuiPickersDay-root.Mui-selected": {
                                            backgroundColor: "#555555", // Selected date background
                                            color: "#ffffff", // Selected date text
                                            fontSize: '10px',
                                            
                                        },
                                        

                                    },
                                    preventScroll: (event) => {
                                        event.preventDefault(); // Prevent scroll
                                    },
                                },
                                day: ({ day, selected }) => ({
                                    style: {
                                        color: day.isAfter(dayjs()) ? 'gray' : 'white', // Set text color
                                        fontWeight: day.isAfter(dayjs()) ? 'normal' : 'bold',
                                        backgroundColor: selected ? 'green' : 'transparent',
                                    },
                                }),
                            }}   
                />
                </div>
            </DemoContainer>
                </div>
            
        </LocalizationProvider>
        
        </div>
    );
}




        export default ExpensesData;