import {BudgetPieChartComponent} from "@/components/MyComponent/Budget/BudgetGraph.tsx";



const Screenpiegraph = ({ Name,duration }) => {


    

    

    return (<div className={'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r  from-[#3A3535] to-[#1F1B1B] w-[700px] h-[500px] rounded-[10px] border-2 border-green-500'}>

                         
        <div className={'absolute text-[35px] text-white font-bold ml-4'}>{Name}
        </div><BudgetPieChartComponent name={Name} duration={duration}></BudgetPieChartComponent></div>)
}
export default Screenpiegraph;