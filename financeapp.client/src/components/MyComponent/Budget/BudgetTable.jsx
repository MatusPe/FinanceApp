import {AgGridReact} from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import {useEffect, useMemo, useState} from "react"; // Optional Theme applied to the Data Grid
import '../CSS/DateTable.css';

import FormTransaction from "@/components/MyComponent/Budget/FormAddBudget.jsx";
import ExpensesPage from "@/ExpensesPage.jsx";
import {colorSchemeDark, themeQuartz} from 'ag-grid-community';
import CircularProgressWithLabel from "@/components/MyComponent/Budget/CircularProgresswithLabe.jsx";
import {duration} from "@mui/material";


import Screenpiegraph from "@/components/MyComponent/Budget/graphscreen.jsx";
import {Transaction} from "@/components/MyComponent/Budget/FormAddBudget.jsx";





const BudgetData = ({ handleeventPiecomponent }) => {



    const [showComponent, setShowComponent] = useState(false);







    const handleButtonClick = () => {
        setShowComponent(!showComponent);


    };






    // Row Data: The data to be displayed.
    const [rowData, setRowData] = useState([
        { Name: "Model Y", Description: "Electric SUV by Tesla", Category: "bill", Price: 64950, Actual: 64950, "Budget expiration": "2.12.2022", Duration:30 },
        { Name: "F-Series", Description: "Popular truck by Ford", Category: "car", Price: 33850, Actual: 64950, "Budget expiration": "1.01.2025", Duration:30 },
        { Name: "Corolla", Description: "Compact car by Toyota", Category: "cloth", Price: 29600, Actual: 64950, "Budget expiration": "10.7.2024", Duration:30 },
        { Name: "Bolt EV", Description: "Affordable EV by Chevrolet", Category: "cloth", Price: 35990, Actual: 64950, "Budget expiration": "21.3.2021", Duration:30 },
        { Name: "iX3", Description: "Luxury EV by BMW", Category: "house", Price: 71000, Actual: 64950, "Budget expiration": "8.10.2023", Duration:30 },
        { Name: "Leaf", Description: "Affordable EV by Nissan", Category: "investment", Price: 31990, Actual: 64950, "Budget expiration": "5.6.2022", Duration:30 },
        { Name: "e-tron", Description: "Premium electric SUV by Audi", Category: "Nocturnal", Price: 86500, Actual: 64950, "Budget expiration": "11.1.2023", Duration:30 },
        { Name: "EQB", Description: "Luxury electric SUV by Mercedes-Benz", Category: "saving", Price: 56000, Actual: 64950, "Budget expiration": "3.9.2022", Duration:30 },
        { Name: "ID.4", Description: "Compact EV by Volkswagen", Category: "saving", Price: 41990, Actual: 64950, "Budget expiration": "7.8.2021", Duration:30 },
        { Name: "Mustang Mach-E", Description: "Sporty EV by Ford", Category: "Ford", Price: 42990, Actual: 64950, "Budget expiration": "12.5.2022", Duration:30 },
        { Name: "Ioniq 5", Description: "Futuristic EV by Hyundai", Category: "Hyundai", Price: 46000, Actual: 64950, "Budget expiration": "19.2.2024", Duration:30 },
        { Name: "Model 3", Description: "Affordable sedan by Tesla", Category: "Tesla", Price: 46990, Actual: 64950, "Budget expiration": "1.3.2023", Duration:30 },
        { Name: "RAV4", Description: "Popular SUV by Toyota", Category: "Toyota", Price: 38500, Actual: 64950, "Budget expiration": "20.6.2022", Duration:30 },
        { Name: "Silverado", Description: "Durable truck by Chevrolet", Category: "Chevrolet", Price: 41000, Actual: 64950, "Budget expiration": "10.8.2021", Duration:30 },
        { Name: "X5", Description: "Luxury SUV by BMW", Category: "BMW", Price: 82000, Actual: 64950, "Budget expiration": "15.9.2023", Duration:30 },
        { Name: "Q5", Description: "Compact luxury SUV by Audi", Category: "Audi", Price: 58000, Actual: 64950, "Budget expiration": "2.4.2024", Duration:30 },
        { Name: "C-Class", Description: "Compact luxury sedan by Mercedes-Benz", Category: "Mercedes-Benz", Price: 56000, Actual: 64950, "Budget expiration": "18.7.2022", Duration:30 },
        { Name: "Tiguan", Description: "SUV by Volkswagen", Category: "Volkswagen", Price: 33000, Actual: 64950, "Budget expiration": "11.11.2021", Duration:30 },
        { Name: "Explorer", Description: "Family SUV by Ford", Category: "Ford", Price: 45000, Actual: 64950, "Budget expiration": "23.3.2023", Duration:30 },
        { Name: "Tucson", Description: "Compact SUV by Hyundai", Category: "Hyundai", Price: 29000, Actual: 64950, "Budget expiration": "6.10.2022", Duration:30 },
    ]);
    const columnsStyle = {
        backgroundColor:'bg-gradient-to-r from-[#3A3535] to-[#1F1B1B]'
    };

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState([

        {   width:120,  cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' },
            cellRenderer:(params) => {
                return (

                    <div className={'m-0 p-0 bg-[#121212] object-contain w-[75%] h-[70%] items-center flex justify-center rounded-full overflow-hidden'}><img className={'w-[70%] h-[70%] object-contain'}  src={`src/assets/Budget/${params.data.Category}.svg`} onError={(e) => e.target.src = 'src/assets/Budget/car.svg'}/></div>


                )
            },


        },

        { field: "Name", width:120,  filter: "agTextColumnFilter", editable: true,
            cellRenderer:(params) => {
                return (
                    <div style={{ display: "flex", flexDirection: "column", marginTop:20   }}>
                        <span style={{ fontWeight: "bold" ,   lineHeight: 'normal'}}>{params.data.Name}</span>
                        <span style={{ color: "gray",  lineHeight: 'normal' }}>{params.data.Description}</span>
                    </div>

                )
            },


        },
        { field: "Progress" , width:120,filter: "agTextColumnFilter", editable: true, cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' },
            cellRenderer:(params) => {
                return (

                    <div className={'flex flex-col  relative    w-[100%] items-center'}><div className={''} ><CircularProgressWithLabel size={60} color={'success'} value={100} /></div> <div className={'absolute top-12 text-[12px]  items-center'}>{params.data.Price}/<span className={'text-green-500 flex-row'}>{params.data.Actual}</span></div></div>


                )
            },




        },
        {   flex: 1,  cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', flexGrow: 1 } },

        { field: "Budget expiration", width:120,
            cellRenderer:(params) => {

            var tempvariable=new Date(params.data["Budget expiration"])- new Date();

                var day=Math.abs(Math.floor(tempvariable / (1000 * 3600 * 24)));
                var remainingDays = Math.abs(Math.floor(tempvariable / (1000 * 3600 * 24)));

                if (remainingDays >= 365) {
                    const years = Math.floor(remainingDays / 365);
                    remainingDays = `${years}y.`;
                }else{
                    remainingDays = `${remainingDays}d.`;
                }

            return (<div className={'relative flex flex-col items-center'}><div className={'mt-2 w-2/3 aspect-square rounded-full flex justify-center items-center  font-bold text-center text-[15px]'}
                                                                                style={{
                                                                                        background: `conic-gradient(
                                                                                            #16a34a ${(day / params.data.Duration) * 100 * 3.6}deg, 
                                                                                            black ${(day / params.data.Duration) * 100* 3.6}deg
                                                                                            )`,

                                                                                        WebkitMask:
                                                                                            "radial-gradient(circle, transparent 50%, black 51%)",
                                                                                            mask: "radial-gradient(circle, transparent 50%, black 51%)",

            }}></div><span className={'mt-4 w-2/3 aspect-square absolute font-bold text-white '}>{remainingDays}</span><div className={'  '}>{params.data["Budget expiration"]}</div></div>)
            }
        },
        { field: "Duration", width:120,
            cellRenderer:(params) => {



            return (<div className={'flex justify-center items-center w-full h-full '}><div className={'flex justify-center items-center w-5/6  mt-2 mb-2 aspect-square border-8 border-green-500 rounded-full text-[20px] font-bold'}>{params.data.Duration}</div></div>)
        }
        },
        {
            width:150,
            cellRenderer:(params) => {
                return (<div className={'flex flex-row w-full h-full  justify-self-start '}><div className={' flex flex-row w-[50px] items-center '}>


                    <img className={'ml-0 pl-0 w-[32px] h-[32px] mr-2 opacity-80 hover:opacity-100 hover:scale-150 transition-transform duration-300'} src={'src/assets/edit.svg'}/>
                    <img className={'w-[32px] h-[32px] mr-2 opacity-80 hover:opacity-100 hover:scale-150 transition-transform duration-300'} src={'src/assets/delete.svg'}/>
                    <img onClick={(event) => handleeventPiecomponent(event, params.data.Name)} className={'w-[32px] h-[32px] mr-2 opacity-80 hover:opacity-100 hover:scale-150 transition-transform duration-300'} src={'src/assets/Budget/chart-pie.svg'}/></div></div>)
            }
        }

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
            "ag-theme-quartz-dark  p-1   max-h-full min-w-[660px]  rounded-lg   overflow-y-scroll mb-8 border border-green-500 shadow-lg shadow-black"
        }
        style={{height: 'auto', background: 'linear-gradient(to right, #3A3535, #1F1B1B)', borderRadius: 15, foregroundColor: "rgb(126, 46, 132)"}}>




            <AgGridReact

                rowData={rowData}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}

                rowStyle={rowStyle}
                columnStyle={columnsStyle}
                rowHeight={100}

                domLayout="autoHeight"

                suppressHorizontalScroll={true}




            />



            <div className="shadow-black shadow-lg mr-5 sticky bottom-10 float-end w-14 h-14 items-center justify-center text-center border-2 border-green-500 bg-black rounded-full  transition-transform duration-300 hover:scale-150" onClick={handleButtonClick} >
                <img src="src/assets/list-plus.svg" alt="Transaction" className="w-full h-full object-contain" />

            </div>

            {showComponent && <Transaction />}

        </div>
        );

        // ...

        }

        export default BudgetData;


