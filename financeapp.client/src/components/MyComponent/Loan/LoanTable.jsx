import {AgGridReact} from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import {useEffect, useMemo, useRef, useState} from "react"; // Optional Theme applied to the Data Grid
import '../CSS/DateTable.css';
import { Atom } from 'lucide-react';

import {Transaction} from "@/components/MyComponent/Loan/FormLoanAdd.jsx";

import {DeleteLoanApi, UpdateLoanApi} from "../Services/ApiServiceLoan.jsx";
import {UpdateonlyExpensesApi} from "@/components/MyComponent/Services/ApiService.jsx";
import {toast} from "react-toastify";


const LoanData = ({getdata, setData, gridRef}) => {
    const [edit, setEdit] = useState(false);
    const [lastKey, setLastKey] = useState(null);



    const [showComponent, setShowComponent] = useState(false);

    const handleButtonClick = () => {
        setShowComponent(!showComponent);

    };
    useEffect(() => {
        console.log(getdata, 'ththtsrs');
        setRowData(getdata);
        
    },[])
    // Row Data: The data to be displayed.
     const [rowData, setRowData] = useState([
         
    ]);
    const columnsStyle = {
        backgroundColor:'bg-gradient-to-r from-[#3A3535] to-[#1F1B1B]'
    };

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState([
        {  headerName: "Loan Name", field: "loanName", flex:1, minWidth:120, filter: "agTextColumnFilter", editable: true, cellStyle: {  fontSize: 16, fontWeight: 'bold',} },

        {  headerName: "Lender",field: "lender", flex:1,minWidth:100, filter: "agTextColumnFilter", editable: true, cellStyle: {textAlign: "center", justifyContent: "center", alignItems:'center',  display: "flex", fontSize: 12, fontWeight: 'bold', color: 'gray'},},
        { headerName: "Amount",  field: "amount", flex:1,minWidth:130,filter: "agNumberColumnFilter", editable: true, cellStyle: {textAlign: "center", justifyContent: "center", alignItems:'center',  display: "flex", fontSize: 18, fontWeight: 'bold', color: 'green', textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)"},

            cellRenderer: (params) => {
            return (<div className={'h-full w-full'}>{params.data['amounth']}$</div>)
            }

        },
        { headerName: "IR",field: "ir", flex:1,minWidth:110, filter: "agNumberColumnFilter", editable: true,

            cellRenderer:(params) => {



                return (<div className={'flex justify-center items-center w-full h-full '}><div className={'flex justify-center items-center w-5/6  mt-2 mb-2 aspect-square border-8 border-blue-500 rounded-full text-[20px] font-bold'}>{params.data["ir"]}%</div></div>)
            }


        },
        { headerName: "Term" ,flex:1, minWidth:80,filter: "agNumberColumnFilter", editable: true,


        cellRenderer:(params) => {

            const loanCommencement = new Date(params.data["loanStart"]);
            const loanMaturity = new Date(params.data["loanEnd"]);

            var remainingDays =loanMaturity-loanCommencement
            var today= new Date()-loanCommencement
            var percentual=today/remainingDays

            


            return (<div className={'w-full h-full relative flex flex-col items-center '}><div className={'mt-2 w-2/3 aspect-square rounded-full flex   font-bold text-center text-[15px]'}
                                                                                style={{
                                                                                    background: `conic-gradient(
                                                                                            #16a34a ${percentual*100 * 3.6}deg, 
                                                                                            black ${percentual*100* 3.6}deg
                                                                                            )`,

                                                                                    WebkitMask:
                                                                                        "radial-gradient(circle, transparent 50%, black 51%)",
                                                                                    mask: "radial-gradient(circle, transparent 50%, black 51%)",

                                                                                }}></div><span className={'mt-2  w-2/3 aspect-square absolute  font-bold text-white items-center text-center justify-center flex text-[20px]'}>{params.data.term}y</span></div>)
        },cellStyle: { padding: 0, margin: 0 }

        },
        { headerName:"Loan Start", field: "loanStart", flex:1,minWidth:130, filter: "agDateColumnFilter", editable: true, cellStyle: { textAlign: "center", justifyContent: "center", display: "flex", fontSize: 18, fontWeight: 'bold', borderLeftColor: "green", color: "gray" },valueFormatter: (params) => {
                // Format the date in MM/DD/YYYY format
                const date = new Date(params.value);
                return date.toLocaleDateString("en-US"); // You can change the locale and format as needed
            }

        },
        { headerName:"Loan End", field: "loanEnd", flex:1,minWidth:130,filter: "agDateColumnFilter", editable: true, cellStyle: { textAlign: "center", justifyContent: "center", display: "flex", fontSize: 18, fontWeight: 'bold', borderRightColor: "green", color: "green" }, valueFormatter: (params) => {
                // Format the date in MM/DD/YYYY format
                const date = new Date(params.value);
                return date.toLocaleDateString("en-US"); // You can change the locale and format as needed
            }},
        { headerName:"M. Pay",field: "monthlyPayment", flex:1,minWidth:110, filter: "agNumberColumnFilter", cellStyle: { textAlign: "center", justifyContent: "center", display: "flex", fontSize: 20, fontWeight: 'bold', color: "red" },


            cellRenderer:(params) => {


                return (<div className={''}>{params.data.monthlyPayment}$</div>)
            }
            },
        { field: "Status",flex:1, minWidth:100, filter: "agTextColumnFilter", editable: true,cellStyle: {margin: 0,padding: 0,display: "flex", justifyContent: "center", textAlign: "center"},
            cellRenderer:(params) => {
                var status=params.data.status


            return(<div className={'  flex h-full w-full text-center  hover:scale-150 transition-transform duration-300 overflow-visible'}  ><img className={'m-5 w-[45px] h-[45px]'} src={`src/assets/${status}.svg`}/></div>)
            }

        },
        { field: "description", flex:2,minWidth:150,filter: "agTextColumnFilter", editable: true, cellStyle: {color: 'gray'} },
        {  flex:1,minWidth:30,filter: false, cellStyle: {color: 'gray'}, cellRenderer:(params) => {




                

                if(params.data.status!=="active"){
                    return (<div></div>)
                }
                var percentual=(params.data["intervalPayment"]-params.data["intervalRemaining"])/params.data["intervalPayment"]




                return (<div className={'  w-full h-full relative flex flex-col items-center justify-center '}><div className={'mt-2 w-2/3 aspect-square rounded-full flex   font-bold text-center text-[12px]'}
                                                                                                   style={{
                                                                                                       background: `conic-gradient(
                                                                                            #16a34a ${percentual*100 * 3.6}deg, 
                                                                                            black ${percentual*100* 3.6}deg
                                                                                            )`,

                                                                                                       WebkitMask:
                                                                                                           "radial-gradient(circle, transparent 50%, black 51%)",
                                                                                                       mask: "radial-gradient(circle, transparent 50%, black 51%)",

                                                                                                   }}></div><span className={'   top-2 w-2/3 aspect-square absolute  font-bold text-white items-center text-center justify-center flex text-[15px]'}>{params.data["intervalRemaining"]}y</span>
                
                    <div className={'flex flex-row'}>
                        <div className={'text-green-500'}>{params.data["paymentCurrectlyRemain"]}/</div>
                        <div className={'text-red-500'}>{params.data["monthlyPayment"]}</div>
                    </div>
                    
                
                </div>)
            
            
            } },
        {
            width: 100,
            cellRenderer:(params) => {

                const handleDeleteClick = () => {
                    console.log("Row Data:", params.data); // This logs the full row data
                    DeleteLoanApi(params.data.id).then(data=>{

                        console.log(data)
                    });
                    setRowData(prevData => prevData.filter(row => row.id !== params.data.id));
                };

                const handleUpdateClick = () => {
                    console.log("Row Data:", params.data); // This logs the full row data
                    UpdateLoanApi(params.data).then(data=>{
                        if(data.data===""){
                            console.log(data,'haha');
                            toast.warn(
                                "You can not have two loan with same Name"
                            )
                            event.node.setDataValue(event.colDef.field, event.oldValue);
                        }else{


                            toast.success("You update Loan successfully");
                        }

                    });
                };
                
                return (
                    <div className={'  flex justify-center items-center w-full h-full m-0 p-4  '}>
                    <button className=" m-0 p-0 opacity-80  text-align: center mr-1 hover:scale-150 transition-transform duration-300 overflow-visible hover:opacity-100">
                        <img onClick={handleUpdateClick} className={'w-[32px] h-[32px] z-100'} src="./src/assets/edit.svg" />
                    </button>
                    <button className=" m-0 p-0  opacity-80   text-align: center mr-1 hover:scale-150 transition-transform duration-300 overflow-visible hover:opacity-100">
                        <img onClick={handleDeleteClick} className={'w-[32px] h-[32px]'} src="./src/assets/Delete.svg" />
                    </button>
                    
                    </div>
                )
            }, filter: false,cellStyle: { padding: 0,textAlign: 'center',justifyContent: "center", display: "flex",
                verticalAlign: 'middle',overflow: "visible"}
        },



    ]);
    const defaultColDef = useMemo(() => {
        return {
            filter: 'agTextColumnFilter',

            wrapText: true,
            autoHeight: true,





        };
    }, []);

    

    const getSelectedRows = () => {
        if (gridRef.current) {
            const selectedRows = gridRef.current.api.getSelectedRows();
            console.log("Selected Rows:", selectedRows);
        }
    };

    const rowStyle = {
        borderBottom: '2px solid green', background:'linear-gradient(to right, #3A3535, #1F1B1B)',
    };
    const headerStyle = {
        borderBottom: '2px solid green', backgroundColor:'black'
    };



    

    const rowSelection = useMemo(() => {
        return {
            mode: 'multiRow',
            headerCheckbox: false,
            bodyCheckbox: false,
        };
    }, []);
    

    const handleRowClick = (event) => {
        // event.data contains all the information of the clicked row
        console.log("Clicked Row Data:", event.data);

        // You can access specific columns like this:
        const { name, price, category, sender, date } = event.data;
        console.log(`Name: ${name}, Price: ${price}, Category: ${category}, Sender: ${sender}, Date: ${date}`);
    };

    const handleEnterKey = (event) => {
        const editedData = event.data;
        UpdateLoanApi(editedData).then(data=>{
            if(data.data===""){
                console.log(data,'haha');
                toast.warn(
                    "You can not have two loan with same Name"
                )
                event.node.setDataValue(event.colDef.field, event.oldValue);
            }else{
               
                
                toast.success("You update Loan successfully");
            }
        
        });
        // Add your custom logic here
    };
    const onCellEditCommit = (event) => {

        if (event.oldValue !== event.newValue) {
            console.log("Cell Edit Commit:", event.newValue);
            handleEnterKey(event); // Call your update API or logic here
        }
    };
    const onCellEditingStopped = (event) => {


        if (event.oldValue !== event.newValue) {
            // Ensure updates happen only when editing stops and there's a real change
            console.log("Cell Edit Commit:", event.newValue);
            // Perform your update logic here, e.g., calling an API or updating state
            if (lastKey === 'Enter') {
                handleEnterKey(event);
            }
        }
        setEdit(false);
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







    return (<div
        className={
            "ag-theme-quartz-dark border-2 p-1   max-h-full min-w-[660px]  rounded-lg shadow-md border-none overflow-y-scroll mb-8"
        }
        style={{height: 'auto', background: 'linear-gradient(to right, #3A3535, #1F1B1B)', borderRadius: 15}}
    >

            <AgGridReact rowHeight={100}

                rowData={rowData}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
                
                rowStyle={rowStyle}
                columnStyle={columnsStyle}
                rowSelection={rowSelection}
                domLayout="autoHeight"
                onGridReady={(params) => (gridRef.current = params)}
                suppressHorizontalScroll={true}
                         onRowClicked={handleRowClick}
                         onCellEditingStopped={onCellEditingStopped}
                         onCellEditCommit={onCellEditCommit}
                         
                         onCellEditingStarted={onCellEditingStarted}
                         onCellClicked={handleCellClick}


            />
            <div className="shadow-black shadow-lg mr-5 sticky bottom-10 float-end w-14 h-14 items-center justify-center text-center border-2 border-green-500 bg-black rounded-full  transition-transform duration-300 hover:scale-150" onClick={handleButtonClick}>
                <img src="src/assets/list-plus.svg" alt="Transaction" className="w-full h-full object-contain" />

            </div>
            {showComponent && <Transaction  />}

        </div>
        );

        // ...

        }

        export default LoanData;