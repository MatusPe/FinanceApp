import SidebarDemo from "@/components/MyComponent/Expenses/SiderBar.jsx";
import BudgetTable from "@/components/MyComponent/Budget/BudgetTable.jsx";
import {BudgetPieChartComponent} from "@/components/MyComponent/Budget/BudgetGraph.tsx";
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/Button"
import {useEffect, useState} from "react";
import Screenpiegraph from "@/components/MyComponent/Budget/graphscreen.jsx";
import {GetBudgetByUserApi} from "@/components/MyComponent/Services/ApiServiceBudget.jsx";
import {Dialog, DialogContent} from "@/components/ui/dialog.jsx";





function BudgetPage() {

    const [showPieComponent, setPieComponent] = useState(false);
    
    const [PickedName, setPickedName] = useState();
    
    const [getData, setGetData] = useState([]);
    const [Duration, setDuration] = useState(0);
    const [Budgeted, setBudgeted] = useState(0);
    const [costBudgeted, setCostBudgeted] = useState(0);
    const [LargeBudget, setLargeBudget] = useState(0);
    const [LargestSpendBudget, setLargestSpendBudget] = useState(0);
    const [SavedAmount, setSavedAmount] = useState(0);
    const [NameLargeBudget, setNameLargeBudget] = useState("Unknown");
    const [NameLargestSpend, setNameLargestSpend] = useState("Unknown");
    
    

    useEffect(()=>{

        GetBudgetByUserApi().then((res) => {
            setGetData(res.data);
            res.data.map((budget) => {
                
                if(budget.interval<=31){
                    setBudgeted((prevBudget) => prevBudget + budget.limitAmount);
                    setCostBudgeted((prevCostBudgeted) => prevCostBudgeted + budget.totalExpenses);
                    setSavedAmount((prevState)=>{
                        if(budget.totalExpenses>0){
                            return prevState + budget.totalExpenses;
                        }
                        return prevState;

                    })
                    setLargeBudget((prevLargeBudget) => {

                        if(prevLargeBudget<budget.limitAmount){
                            setNameLargeBudget(budget.category);
                            return budget.limitAmount;
                        }


                        return prevLargeBudget;
                    });
                    setLargestSpendBudget((prevLargestSpendBudget) => {
                        if(prevLargestSpendBudget<budget.totalExpenses){
                            setNameLargestSpend(budget.category)
                            return budget.totalExpenses;
                        }


                        return prevLargestSpendBudget;

                    });
                    
                }
                
            })
            
        })
        
    },[])
    
    useEffect(()=>{
        
        console.log(Budgeted)
        console.log(costBudgeted)
        console.log('rerere');
    }, [Budgeted])

    const handleeventPiecomponent = (event, name, duration) => {
        setPieComponent(!showPieComponent);
        setPickedName(name);
        
        setDuration(duration);
        

    };

    

    return (<div><div className="flex row h-screen"><SidebarDemo></SidebarDemo>
        <div className={'flex flex-grow h-full w-full  flex-row  bg-[#24232a] p-4'}>
            <div className="  flex-grow  h-[100%] w-[65%]    ">
                <BudgetTable getData={getData} handleeventPiecomponent={handleeventPiecomponent} setData={setGetData} />
            </div>
            <div className={'w-[35%]  flex flex-col bg-gradient-to-r  from-[#3A3535] to-[#1F1B1B] rounded-tr-[20px] rounded-br-[20px]  ml-4 items-center border border-green-500 shadow-lg shadow-black' }>
                <div className={'text-[50px]  border-b-2 border-green-500 text-green-500'}>Short-Term Budget</div>
                <div className={'w-full mt-10'}><BudgetPieChartComponent getdata={getData}></BudgetPieChartComponent></div>
                <div className={'w-[90%] h-[50px] flex flex-col '}><div className={'text-white'}>Amount Spent from Budget</div><Progress value={Budgeted/costBudgeted*10} style={{ backgroundColor: 'black', color: 'black' }}/></div>
                <div className={'w-[90%] h-[50px] flex flex-col'}><div className={'text-white'}>Amount income</div><Progress value={Budgeted/SavedAmount*10} style={{ backgroundColor: 'black', color: 'black' }}/></div>
                <div className={'mt-5 w-[90%] ml-14  mr-14 text-white flex flex-row '}>
                    <div className={'flex flex-col w-full'}>

                            Largest planned Budget
                            <Button  onClick={(event) => handleeventPiecomponent(event, 'someName')} variant="outline" className={'w-[50%] h-[100%] bg-[#1f1f1f] border-2 border-green-500 text-[20px] font-bold text-green-500'}>{NameLargeBudget}</Button>

                    </div>
                    <div className={'text-green-500 flex-row justify-center items-center  mt-auto text-[30px] '}>{LargeBudget}$</div>

                </div>

                <div className={'mt-5 w-[90%] ml-14  mr-14 text-white flex flex-row '}>
                    <div className={'flex flex-col w-full'}>

                        Largest Spending Budget
                        <Button  onClick={(event) => handleeventPiecomponent(event, 'someName')} variant="outline" className={'w-[50%] h-[100%] bg-[#1f1f1f] border-2 border-green-500 text-[20px] font-bold text-green-500'}>{NameLargestSpend}</Button>

                    </div>
                    <div className={'text-green-500 flex-row justify-center items-center  mt-auto text-[30px] '}>{LargestSpendBudget}$</div>


                </div>





            </div>
            
            <Dialog open={showPieComponent} onOpenChange={setPieComponent}>
                <DialogContent className=" border-none">
                    {showPieComponent&&<Screenpiegraph  Name={PickedName} duration={Duration} ></Screenpiegraph>}
                    </DialogContent>
            </Dialog>
            
        </div>

    </div></div>)

}
export default BudgetPage;