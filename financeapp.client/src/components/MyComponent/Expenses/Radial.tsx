

import { TrendingUp } from "lucide-react"

import {LabelList, PolarGrid, RadialBar, RadialBarChart} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import React, {useState, useEffect} from "react"
import '@/app/globals.css'
import {ButtonArrowLeft, ButtonArrowRight} from "@/components/MyComponent/Expenses/ButtonArrows";
import { GetGroupedExpensesByMonthApi} from "../Services/ApiService";


const chartConfig = {
    Jan: {
        label: "Jan",
        color: "hsl(var(--chart-11))",
    },
    Feb: {
        label: "Feb",
        color: "hsl(var(--chart-1))",
    },
    Mar: {
        label: "Mar",
        color: "hsl(var(--chart-2))",
    },
    Apr: {
        label: "Apr",
        color: "hsl(var(--chart-3))",
    },
    May: {
        label: "May",
        color: "hsl(var(--chart-4))",
    },
    Jun: {
        label: "Jun",
        color: "hsl(var(--chart-5))",
    },
    Jul: {
        label: "Jul",
        color: "hsl(var(--chart-6))",
    },
    Aug: {
        label: "Aug",
        color: "hsl(var(--chart-7))",
    },
    Sep: {
        label: "Sep",
        color: "hsl(var(--chart-12))",
    },
    Oct: {
        label: "Oct",
        color: "hsl(var(--chart-8))",
    },
    Nov: {
        label: "Nov",
        color: "hsl(var(--chart-9))",
    },
    Dec: {
        label: "Dec",
        color: "hsl(var(--chart-10))",
    },

} satisfies ChartConfig





function RadialComponent() {

    const [selectedDate, setSelectedDate] = useState(() => {
        const date = new Date();
        date.setFullYear(date.getFullYear());
        return date;
    });
    const [chartData, setChartData] = useState()

    function HandleSelect(number) {
        const currentDate = new Date();

        if(selectedDate.getFullYear() >= currentDate.getFullYear()&&number!=-1) { return}
        setSelectedDate(new Date(selectedDate.setFullYear(selectedDate.getFullYear() + number)));

    }

    useEffect(() => {

        

        const fetchGroupedMonthExpenses = async () => {
            try {
                
                var expenses=await GetGroupedExpensesByMonthApi(selectedDate.getFullYear())
                setChartData(expenses);
                
            } catch (error) {
                console.error("Error fetching month expenses:", error);
            }
        };
        fetchGroupedMonthExpenses()
        
    }, [selectedDate]);


    return (
        <Card className="  h-full w-full  border-none">
            <div className="flex flex-row justify-between">
                <div>
                    <ButtonArrowLeft  onClick={() => {HandleSelect(-1)}} ></ButtonArrowLeft>
                    <ButtonArrowRight onClick={() => {HandleSelect(1)}}></ButtonArrowRight>
                </div>
            <CardDescription className=" font-bold mr-2 mb-0 pb-0">Expenses of ${selectedDate.getFullYear()} be month</CardDescription>
            </div>
            <CardContent className="h-[85%] w-full p-0 m-0   ">

                <ChartContainer
                    config={chartConfig}
                    className="   w-full h-full"
                >
                    <RadialBarChart data={chartData} innerRadius={10} outerRadius={120} >
                        <ChartTooltip
                            cursor={false}


                            content={<ChartTooltipContent
                             hideLabel nameKey="month" labelKey={'price'}/>}

                        />
                        <PolarGrid gridType="circle" />
                        <RadialBar dataKey="price" background>
                            <LabelList
                                position="insideEnd"
                                dataKey="month"
                                className="fill-[#FFFFFF] font-bold"
                                fontSize={14}
                            />
                        </RadialBar>
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>

        </Card>
    )
}
export default RadialComponent;