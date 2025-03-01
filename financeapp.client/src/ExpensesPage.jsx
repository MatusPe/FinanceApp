import SidebarDemo from "@/components/MyComponent/Expenses/SiderBar.jsx";
import ExpensesData from "./components/MyComponent/Expenses/DateTable.jsx";

import {PieChartComponent} from "@/components/MyComponent/Expenses/PieChart.tsx";
import Componentone from "@/components/MyComponent/Expenses/Radial.tsx";
import RadarChart from "@/components/MyComponent/Expenses/RadarChart.tsx";
import RadarComponent from "@/components/MyComponent/Expenses/RadarChart.tsx";




function ExpensesPage(){
    return (<div>
        <div className="flex"><SidebarDemo></SidebarDemo>
            <div className="flex flex-row gap-4 p-4 justify-center    bg-[#24232a] w-full max-h-screen overflow-hidden ">
                <div className="h-screen w-full flex-col">
                    <div className="  h-[51%]  bg-gradient-to-r from-[#3A3535] to-[#1F1B1B] rounded-[15px] shadow-md border-green-500 border overflow-hidden flex flex-col shadow-lg shadow-black">
                        <PieChartComponent></PieChartComponent>
                    </div>
                    <div className="h-full flex flex-row w-full">
                    <div
                        className="flex flex-row  h-[42%] mt-6  bg-gradient-to-r from-[#3A3535] to-[#1F1B1B]   w-[50%] mr-4 rounded-[15px] shadow-md border-green-500 border shadow-lg shadow-black">
                        <Componentone className="h-full  "></Componentone>


                    </div>
                    <div
                        className="flex flex-row  h-[42%] mt-6   bg-gradient-to-r  from-[#3A3535] to-[#1F1B1B]   w-[50%] rounded-[15px] shadow-md border-green-500 border shadow-lg shadow-black">

                        <RadarComponent ></RadarComponent>


                    </div>
                </div>

                </div>
                <ExpensesData/>
            </div>
        </div>
    </div>)
}

export default ExpensesPage;