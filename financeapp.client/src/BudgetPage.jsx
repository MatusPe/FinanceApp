import SidebarDemo from "@/components/MyComponent/Expenses/SiderBar.jsx";
import BudgetTable from "@/components/MyComponent/Budget/BudgetTable.jsx";
import {BudgetPieChartComponent} from "@/components/MyComponent/Budget/BudgetGraph.tsx";
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/Button"
import {useEffect, useState} from "react";
import Screenpiegraph from "@/components/MyComponent/Budget/graphscreen.jsx";





function BudgetPage() {

    const [showPieComponent, setPieComponent] = useState(false);
    const [PickedName, setPickedName] = useState();
    const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });



    const handleeventPiecomponent = (event, name) => {
        setPieComponent(!showPieComponent);
        setPickedName(name);
        setButtonPosition({ x: event.clientX, y: event.clientY });

    };

    useEffect(() => {



        const handleclickedevent = () => {

            setPieComponent(false);


            console.log(buttonPosition);
            console.log('++++++++++++++++');
        }

        if (showPieComponent) {

            document.addEventListener("mousedown", handleclickedevent);
        }else{
            document.removeEventListener("mousedown", handleclickedevent);
        }
        return () => {
            document.removeEventListener("mousedown", handleclickedevent);
        }




    }, [ showPieComponent]);

    return (<div><div className="flex row h-screen"><SidebarDemo></SidebarDemo>
        <div className={'flex flex-grow h-full w-full  flex-row  bg-[#24232a] p-4'}>
            <div className="  flex-grow  h-[100%] w-[65%]    ">
                <BudgetTable handleeventPiecomponent={handleeventPiecomponent}/>
            </div>
            <div className={'w-[35%]  flex flex-col bg-gradient-to-r  from-[#3A3535] to-[#1F1B1B] rounded-tr-[20px] rounded-br-[20px]  ml-4 items-center border border-green-500 shadow-lg shadow-black' }>
                <div className={'text-[50px]  border-b-2 border-green-500 text-green-500'}>Short-Term Budget</div>
                <div className={'w-full mt-10'}><BudgetPieChartComponent></BudgetPieChartComponent></div>
                <div className={'w-[90%] h-[50px] flex flex-col '}><div className={'text-white'}>Budgeted</div><Progress value={33} style={{ backgroundColor: 'black', color: 'black' }}/></div>
                <div className={'w-[90%] h-[50px] flex flex-col'}><div className={'text-white'}>Amount Spent from Budget</div><Progress value={33} style={{ backgroundColor: 'black', color: 'black' }}/></div>
                <div className={'mt-5 w-[90%] ml-14  mr-14 text-white flex flex-row '}>
                    <div className={'flex flex-col w-full'}>

                            Largest planned Budget
                            <Button  onClick={(event) => handleeventPiecomponent(event, 'someName')} variant="outline" className={'w-[50%] h-[100%] bg-[#1f1f1f] border-2 border-green-500 text-[20px] font-bold text-green-500'}>Food</Button>

                    </div>
                    <div className={'text-green-500 flex-row justify-center items-center  mt-auto text-[30px] '}>13000$</div>

                </div>

                <div className={'mt-5 w-[90%] ml-14  mr-14 text-white flex flex-row '}>
                    <div className={'flex flex-col w-full'}>

                        Largest Spending Budget
                        <Button  onClick={(event) => handleeventPiecomponent(event, 'someName')} variant="outline" className={'w-[50%] h-[100%] bg-[#1f1f1f] border-2 border-green-500 text-[20px] font-bold text-green-500'}>Entertainment</Button>

                    </div>
                    <div className={'text-green-500 flex-row justify-center items-center  mt-auto text-[30px] '}>13000$</div>


                </div>





            </div>
            {showPieComponent&&<Screenpiegraph  Name={PickedName} position={buttonPosition}>{buttonPosition}</Screenpiegraph>}
        </div>

    </div></div>)

}
export default BudgetPage;