import {handleError} from "@/Helpers/handleError.jsx";
import {Transaction} from "@/components/MyComponent/Expenses/FormTransaction.jsx";
import { toast } from 'react-toastify';  // Import toast notification
import 'react-toastify/dist/ReactToastify.css';

import {AgGridReact} from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";

import { RefreshCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {useMemo, useState, useEffect, useRef} from "react";
import {PieChartforTransactionComponent} from "@/components/MyComponent/Expenses/PieChartforTransaction";
import {GetExpensesbyIdApi, UpdateExpensesApi} from "@/components/MyComponent/Services/ApiService.jsx";

const columnHeaderCash=()=>
    [
        { headerName: "Name", field: "name", flex: 1 , editable: true},
        { headerName: "Price", field: "price", flex: 1,editable: true  },
        { headerName: "Date", field: "date", flex: 1 , editable: true },
        { headerName: "Taxis", field: "taxis", flex: 1 ,editable: true },
        { headerName: "Without Taxis", field: "withoutTaxis", flex: 1 ,editable: true },
        { headerName: "Sender", field: "sender", flex: 1,editable: true  },
        { headerName: "Receiver", field: "receiver", flex: 1,editable: true  },
        { headerName: "Place", field: "place", flex: 1 ,editable: true },
        { headerName: "Country", field: "country", flex: 1,editable: true  },
        { flex: 0.7, cellRenderer: (params) => {
                return(<div className={'h-full flex flex-row justify-center items-center'}><button onClick={()=>handleDelete(params)} className={'transition-transform duration-300 hover:scale-150 opacity-80 hover:z-20 hover:opacity-100'}><img className={'w-[25px] h-[25px] hover:shadow-black-500 '} src={'src/assets/Delete.svg'}/></button></div>)
            },cellStyle: { padding: 0, margin: 0 } },

    ];
const columnHeaderTransaction=()=>
    [
        { headerName: "Name", field: "name", flex: 1, editable: true },
        { headerName: "Price", field: "price", flex: 1, editable: true },
        { headerName: "Taxis", field: "taxis", flex: 1, editable: true },
        { headerName: "Without Taxis", field: "withoutTaxis", flex: 1, editable: true },
        { headerName: "Sender", field: "sender", flex: 1, editable: true },
        { headerName: "Receiver", field: "receiver", flex: 1, editable: true },
        { headerName: "IBAN", field: "iban", flex: 1, editable: true },
        { headerName: "VB", field: "vb", flex: 1, editable: true },
        { headerName: "IBAN Sender", field: "ibanSender", flex: 1, editable: true },
        { flex: 0.7, cellRenderer: (params) => {
                return(<div className={'h-full flex flex-row justify-center items-center'}><button onClick={()=>handleDelete(params)} className={'transition-transform duration-300 hover:scale-150 opacity-80 hover:z-20 hover:opacity-100'}><img className={'w-[25px] h-[25px] hover:shadow-black-500 '} src={'src/assets/Delete.svg'}/></button></div>)
            },cellStyle: { padding: 0, margin: 0 } },

    ];


const DetailExpenseTable = ({data, setshowcomponent}) => {
    console.log(data, 'thistisisis');
    const [rowData, setRowData] = useState( );
    const [fetchdata, setData] = useState(data);
    const navigate = useNavigate();
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (fetchdata.type == "Transaction") {
            setColDefs(columnHeaderTransaction)
            setRowData(fetchdata.expenseTransactions);
        } else {
            setColDefs(columnHeaderCash)
            setRowData(fetchdata.cashTransactions);
            
        }
    }, []);

    
    const handleAddButton =()=>{
        if (rowData.length >= 100) {
            // Show toast notification if the row limit is exceeded
            toast.error("You've exceeded the limit of 100 rows!");
            return;  // Prevent adding another row
        }
        
            const emptyRow = {
                name: null,
                price: null,           // Set price to null
                date: null,            // Set date to null
                taxis: null,           // Set taxis to null
                withoutTaxis: null,    // Set withoutTaxis to null
                sender: null,          // Set sender to null
                receiver: null,        // Set receiver to null
                place: null,           // Set place to null
                country: null
            };

            setRowData([...rowData, emptyRow]);
            console.log(rowData, 'this is row data')
        
        
    }
    const handleUpdateButton =async (params)=>{
        
        const nonEmptyRows = rowData.filter(row =>
            Object.values(row).some(value =>
                value !== "" && value !== null && value !== undefined
            )
        );
        
        const rowsWithNullNameOrPrice = nonEmptyRows.filter(row => {
            const taxisMissing = row.hasOwnProperty('name') ? (row.name === null || row.name === "") : true;
            const priceMissing = row.hasOwnProperty('price') ? (row.price === null || row.price === "") : true;

            return taxisMissing || priceMissing;
        });
        console.log(rowsWithNullNameOrPrice, 'non');
        if (rowsWithNullNameOrPrice.length > 0) {
            console.log(rowsWithNullNameOrPrice.length);
            toast.error("Missing taxis or Price");
            return;
        }

        const updatedState = {
            ...fetchdata,
            [fetchdata.type === "Transaction" ? "expenseTransactions" : "cashTransactions"]: rowData.map(item => ({
                ...item,
                expensesId: data.id
            }))
        };

        try {
            await UpdateExpensesApi(
                fetchdata.type === "Transaction" ? "expenseTransactions" : "cashTransactions",
                updatedState[fetchdata.type === "Transaction" ? "expenseTransactions" : "cashTransactions"]
            );

            setData(updatedState); // Aktualizácia stavu po úspešnom update
            toast.success("Expenses updated successfully!");
        } catch (error) {
            console.error("Failed to update expenses:", error);
            toast.error("Failed to update expenses.");
        }
        navigate(0)
    }
    const handleCancelButton =()=>{
        setshowcomponent(false)
        
    }
    const handleDelete = (params) => {
        
        setRowData(prevRowData =>
            prevRowData.filter(row => row !== params.data)
        );
    };

    
    
    const [startime, setStartime] = useState(new Date("2024-02-01"));
    const [endTime, setEndTime] = useState(new Date("2026-02-01"));
    
    
    console.log(rowData,'thisisidfsfsdfs');
    const columnsStyle = {
        backgroundColor:'bg-gradient-to-r from-[#3A3535] to-[#1F1B1B]'
    };

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState([
        { headerName: "Name", field: "name", flex: 1 , editable: true},
        { headerName: "Price", field: "price", flex: 1,editable: true  },
        { headerName: "Date", field: "date", flex: 1 , editable: true },
        { headerName: "Taxis", field: "taxis", flex: 1 ,editable: true },
        { headerName: "Without Taxis", field: "withoutTaxis", flex: 1 ,editable: true },
        { headerName: "Sender", field: "sender", flex: 1,editable: true  },
        { headerName: "Receiver", field: "receiver", flex: 1,editable: true  },
        { headerName: "Place", field: "place", flex: 1 ,editable: true },
        { headerName: "Country", field: "country", flex: 1,editable: true  },
        { flex: 0.7, cellRenderer: (params) => {
                return(<div className={'h-full flex flex-row justify-center items-center'}><button onClick={()=>handleDelete(params)} className={'transition-transform duration-300 hover:scale-150 opacity-80 hover:z-20 hover:opacity-100'}><img className={'w-[25px] h-[25px] hover:shadow-black-500 '} src={'src/assets/Delete.svg'}/></button></div>)
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






    return (<div
            className={
                "relative ag-theme-quartz-dark  p-1   min-h-full min-w-[660px] w-full h-full rounded-lg shadow-md border-none overflow-y-scroll mb-8 overflow-x-hidden"
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

                suppressHorizontalScroll={true}


            />



            <div className={'fixed bottom-0 w-full h-[30px]  mb-2 rounded-[9px] items-center justify-center flex'}>
                <div className={'w-[70%] flex flex-row gap-5'}>
                    <button onClick={handleCancelButton} className={'w-[70%] bg-[#1f1f1f] border-2  shadow-md shadow-black border-green-500 text-[20px] font-bold text-green-500 items-center justify-center flex'}>Cancel</button>
                <button onClick={handleAddButton} className={'w-[70%] bg-[#1f1f1f] border-2  shadow-md shadow-black border-green-500 text-[20px] font-bold text-green-500 items-center justify-center flex'}>Add</button>
                <button  onClick={()=>handleUpdateButton(rowData)} className={'w-[30%] bg-[#1f1f1f] border-2  shadow-md shadow-black border-green-500 text-[20px] font-bold text-green-500 items-center justify-center flex flex-row'}><RefreshCcw />Update</button>
                </div>
            </div>
        </div>
    );

    // ...

}

const Detail=({data, setshowcomponent})=>{
    console.log(data, 'newobject');
    const [fetchdata, setData] = useState(null);
    const getdata= async() =>{
        
        var newdata=await GetExpensesbyIdApi(data.id).then((res)=>{
            console.log(res.data,'ress');
            
            
            setData(res.data);
            return res;
        })
        
        
        
        
    }
    useEffect(()=>{
        getdata();
        
    },[])
    
    
    console.log(fetchdata,'this is fetch data')
    
    return (<div className={'rounded-[9px] z-10 border-2 border-green-500 bg-[#24232a] absolute top-[calc(50%+35px)] left-1/2 transform min-w-[750px] min-h-[300px] -translate-x-1/2 -translate-y-1/2 items-center gap-5 justify-center w-[92%] h-[80%] flex flex-row p-4'}>

        <div className={'lg:w-[70%] w-[100%] h-full  flex-row flex  '}>{fetchdata!==null&&<DetailExpenseTable  data={fetchdata} setshowcomponent={setshowcomponent}></DetailExpenseTable>}</div>
        <div className={'w-[30%] h-full lg:w-[30%] w-0 hidden lg:block h-full bg-gradient-to-r from-[#3A3535] to-[#1F1B1B]'}>{fetchdata!==null&&<PieChartforTransactionComponent data={fetchdata}></PieChartforTransactionComponent>}</div>
        
    </div>)
}
export default Detail;

