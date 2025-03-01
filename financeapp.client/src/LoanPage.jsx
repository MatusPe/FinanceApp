import SidebarDemo from "@/components/MyComponent/Expenses/SiderBar.jsx";

import LoanTable from "@/components/MyComponent/Loan/LoanTable.jsx";
import BarChartComponent from "@/components/MyComponent/Loan/BarChart.tsx";
import StatLoan from "@/components/MyComponent/Loan/Statistic.jsx";
import Buttons, {GraphButtons} from "@/components/MyComponent/Loan/Buttons.jsx";
import React, {useState} from "react";
import MonthlyPayment from "@/components/MyComponent/Loan/PieChartLoan.tsx";
import TimeLineLoan from "@/components/MyComponent/Loan/LineChartLoan.tsx";



function LoanPage(){

    const [CompareLoan, setCompareLoan] = useState(true)

    const [PieLoan, setPieLoan] = useState(false)

    const [LineLoanCode, setLineLoan] = useState(false)

    console.log(LineLoanCode)

    return (<div>
        <div className="flex flex-row"><SidebarDemo></SidebarDemo>
            <div className="flex flex-col w-full h-full  bg-black p-6">
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

                        {CompareLoan && <BarChartComponent></BarChartComponent>}
                        {LineLoanCode && <TimeLineLoan></TimeLineLoan>}
                        <div className="flex flex-row h-full w-full p-2  justify-between ">
                            <div className={'w-[35%] h-full '}>
                                {PieLoan && <MonthlyPayment innerRing={80} title={`Unpaid Loan Balance`}
                                                            footer={'Showing total remaining Loan payment'}
                                                            DoublePie={false}></MonthlyPayment>}
                            </div>
                            <div className={'w-[35%] h-full'}>
                                {PieLoan && <MonthlyPayment innerRing={80} title={`Monthly Payment and Interest Rate`}
                                                            footer={'Showing total Monthly cost of Loans and IR'}
                                                            DoublePie={true}></MonthlyPayment>}
                            </div>
                            <div className={'w-[35%] h-full '}>
                                {PieLoan && <MonthlyPayment title={`Duration of Loan`}
                                                            footer={'Showing remaining duration of Loans'}
                                                            DoublePie={false} DurationPie={true}></MonthlyPayment>}
                            </div>




                        </div>

                    </div>
                    <div className="flex flex-col flex-grow pl-2">
                        <StatLoan text="Active Loan Amount" color="green-500" Number='10000'></StatLoan>
                        <StatLoan text="Loan Balance" color="red-600" Number='5000'></StatLoan>
                        <StatLoan text="Highest IR" color="blue-700" Number={'3%'}></StatLoan>
                        <div className=" flex flex-row flex-grow justify-between gap-1">
                            <Buttons className='' Text="Simulation"/>
                            <Buttons Text="Display"/>
                        </div>
                    </div>

                </div>
                <div className="w-full mt-4 h-[45vh] border border-green-500 rounded-[15px]">
                    <LoanTable></LoanTable>
                </div>
            </div>
        </div>
    </div>)
}

export default LoanPage;