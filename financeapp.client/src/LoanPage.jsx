import SidebarDemo from "@/components/MyComponent/Expenses/SiderBar.jsx";

import LoanTable from "@/components/MyComponent/Loan/LoanTable.jsx";
import BarChartComponent from "@/components/MyComponent/Loan/BarChart.tsx";
import StatLoan from "@/components/MyComponent/Loan/Statistic.jsx";
import Buttons, {GraphButtons} from "@/components/MyComponent/Loan/Buttons.jsx";
import React, {useEffect, useRef, useState} from "react";
import MonthlyPayment from "@/components/MyComponent/Loan/PieChartLoan.tsx";
import TimeLineLoan from "@/components/MyComponent/Loan/LineChartLoan.tsx";
import {GetAllLoanbyUserApi} from "@/components/MyComponent/Services/ApiServiceLoan.jsx";
import {data} from "autoprefixer";
import LoanData from "@/components/MyComponent/Loan/LoanTable.jsx";



function LoanPage(){

    const [CompareLoan, setCompareLoan] = useState(false)

    const [PieLoan, setPieLoan] = useState(false)

    const [LineLoanCode, setLineLoan] = useState(false)
    
    const [GetData, setGetData] = useState([])
    const [showTable, setShowTable] = useState(false)
    const [selectedData, setSelectedData] = useState([])
    const [ListofLoanId, setListofLoanId] = useState([])
    const [Stat, SetStat] = useState({ activeLoan: 0, remainingLoan: 0, highestIRLoan: 0 })
    
    useEffect(()=>{

        var Loans=GetAllLoanbyUserApi("halo").then((data)=>{
            console.log(data, 'this is loans')
            setGetData(data.data);
            setShowTable(true)
            setCompareLoan(true)
            const firstFiveLoans = data.data.slice(0, 5);
            setSelectedData(firstFiveLoans)
            
        })


        
        
    }, [])
    
    useEffect(()=>{
        var activeLoan=0;
        var remainingLoan=0;
        var highestIRLoan=0;
        GetData.map((data)=>{
            if (data.status=="active"){
                activeLoan+=data.amounth;
                remainingLoan+=activeLoan-data.totalSpent;
                if(highestIRLoan<data.ir){
                    highestIRLoan=data.ir
                }
            }
            
        })
        SetStat({ activeLoan, remainingLoan, highestIRLoan });
        
        
    }, [GetData])


    const transformLoanDataBarLine = (loanData) => {
        return loanData.map(loan => ({
            Loan: loan.loanName,
            TotalRemining: loan.totalSpent,
        }));
    }
    
    useEffect(()=>{
        
        if(PieLoan){
            
        }else if(CompareLoan){
            
        }else if(LineLoanCode){
            
        }
        
    },[PieLoan, CompareLoan, LineLoanCode])

    const gridRef = useRef();
    const handledisplayButton=()=>{
        if (gridRef.current) {
            const selectedRows = gridRef.current.api.getSelectedRows();
            console.log("Selected Rows:", selectedRows);
            const selectedLoanIds = selectedRows.map(row => row.id);
            console.log('this is selectedLoanIds:', selectedLoanIds);
            if(selectedRows.length > 0&&selectedRows.length<5){
                setSelectedData(selectedRows);
                setListofLoanId(selectedLoanIds);
                console.log(selectedLoanIds, 'this is loans');
            }else{
                setSelectedData(GetData);
                setListofLoanId(selectedLoanIds);
                console.log(selectedLoanIds, 'this is loans');
            }
        }
        console.log('hahahha')
    }
    

    console.log(LineLoanCode)

    return (<div>
        <div className="flex flex-row"><SidebarDemo></SidebarDemo>
            <div className="flex flex-col w-full h-full  bg-[#24232a] p-6">
                <div className="flex flex-row">
                    <div
                        className="relative   justify-center  bg-gradient-to-r from-[#3A3535] to-[#1F1B1B]  h-[47.1vh] w-[85%] rounded-[15px] shadow-md border-green-500 border  overflow-hidden min-h-[270px]">
                        <div className={'  absolute right-0 top-3 mr-0 z-10'}>
                            <div onClick={() => {
                                setCompareLoan(true);
                                setPieLoan(false);
                                setLineLoan(false);
                            }}>
                                <GraphButtons icon={'./src/assets/Compareline.svg'}></GraphButtons>
                            </div>
                            <div onClick={() => {
                                setCompareLoan(false);
                                setPieLoan(true);
                                setLineLoan(false);
                            }}>
                                <GraphButtons icon={'./src/assets/chart-pie.svg'}
                                ></GraphButtons>
                            </div>
                            <div onClick={() => {
                                setCompareLoan(false);
                                setPieLoan(false);
                                setLineLoan(true);
                            }}>
                                <GraphButtons icon={'./src/assets/chart-line.svg'}></GraphButtons>
                            </div>
                        </div>

                        {CompareLoan && <BarChartComponent getData={selectedData} setData={setGetData}></BarChartComponent>}
                        {LineLoanCode && <TimeLineLoan ListLoanId={ListofLoanId}></TimeLineLoan>}
                        <div className="flex flex-row h-full w-full p-2  justify-between ">
                            <div className={'w-[35%] h-full '}>
                                {PieLoan && <MonthlyPayment innerRing={80} title={`Unpaid Loan Balance`}
                                                            footer={'Showing total remaining Loan payment'}
                                                            DoublePie={false} getData={selectedData} setData={setGetData}></MonthlyPayment>}
                            </div>
                            <div className={'w-[35%] h-full'}>
                                {PieLoan && <MonthlyPayment innerRing={80} title={`Monthly Payment and Interest Rate`}
                                                            footer={'Showing total Monthly cost of Loans and IR'}
                                                            DoublePie={true} getData={selectedData} setData={setGetData}></MonthlyPayment>}
                            </div>
                            <div className={'w-[35%] h-full '}>
                                {PieLoan && <MonthlyPayment title={`Duration of Loan`}
                                                            footer={'Showing remaining duration of Loans'}
                                                            DoublePie={false} DurationPie={true} getData={selectedData} setData={setGetData}></MonthlyPayment>}
                            </div>




                        </div>

                    </div>
                    <div className="flex flex-col flex-grow pl-2">
                        <StatLoan text="Active Loan Amount" color="green-500" Number={Stat.activeLoan}></StatLoan>
                        <StatLoan text="Loan Balance" color="red-600" Number={Stat.remainingLoan}></StatLoan>
                        <StatLoan text="Highest IR" color="blue-700" Number={Stat.highestIRLoan}></StatLoan>
                        <div className=" flex flex-row flex-grow justify-between gap-1">
                            <Buttons className='' Text="Simulation"/>
                            <Buttons onClick={handledisplayButton} Text="Display"/>
                        </div>
                    </div>

                </div>
                <div className="w-full mt-4 h-[45vh] border border-green-500 rounded-[15px]">
                    {showTable&&(<LoanData getdata={GetData} setData={setGetData} gridRef={gridRef}></LoanData>)}
                </div>
            </div>
        </div>
    </div>)
}

export default LoanPage;