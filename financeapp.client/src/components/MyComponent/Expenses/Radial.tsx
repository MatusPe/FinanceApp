

import { TrendingUp } from "lucide-react"

import {Cell, LabelList, PolarGrid, RadialBar, RadialBarChart} from "recharts"

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
                console.log(expenses, 'tel me this is data');
                
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
                    className="w-full h-full"
                >
                    <RadialBarChart data={chartData} innerRadius={20} outerRadius={150}  >
                        <defs>
                            <linearGradient id="PurpleDream" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#6a11cb" stopOpacity={1} />
                                <stop offset="100%" stopColor="#2575fc" stopOpacity={1} />
                            </linearGradient>

                            <linearGradient id="VioletPurple" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#7f00ff" stopOpacity={1} />
                                <stop offset="100%" stopColor="#9b30ff" stopOpacity={1} />
                            </linearGradient>


                            <linearGradient id="MintBreeze" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#00bfae" stopOpacity={1} />
                                <stop offset="100%" stopColor="#00e676" stopOpacity={1} />
                            </linearGradient>
                            <linearGradient id="ElectricLime" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#00e676" stopOpacity={1} />
                                <stop offset="100%" stopColor="#64dd17" stopOpacity={1} />
                            </linearGradient>
                            <linearGradient id="LimeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#76ff03" stopOpacity={1} />
                                <stop offset="100%" stopColor="#00e676" stopOpacity={1} />
                            </linearGradient>
                            <linearGradient id="PurpleDreamGreenGlow" x1="0%" y1="0%" x2="100%" y2="100%">

                                <stop offset="0%" stopColor="#00e676" stopOpacity={1} />
                                <stop offset="100%" stopColor="#6a11cb" stopOpacity={1} />
                            </linearGradient>
                            <linearGradient id="DeepPurpleViolet" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#5D3F6E" stopOpacity={1} />
                                <stop offset="100%" stopColor="#8A2BE2" stopOpacity={1} />
                            </linearGradient>
                            <linearGradient id="OceanBlueToGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#00d27e" stopOpacity={1} />  {/* Fresh Green */}
                                <stop offset="50%" stopColor="#00b0ff" stopOpacity={1} />  {/* Bright Blue */}
                                <stop offset="100%" stopColor="#005ac1" stopOpacity={1}/>
                            </linearGradient>
                            <linearGradient id="GreenToLightBlueBridge" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#4caf50" stopOpacity={1} />  {/* Vibrant Green */}
                                <stop offset="50%" stopColor="#80e0e0" stopOpacity={1} />  {/* Light Blue */}
                                <stop offset="100%" stopColor="#00bcd4" stopOpacity={1} /> {/* Soft Cyan */}
                            </linearGradient>
                            <linearGradient id="BlueDream" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#3f51b5" stopOpacity={1} />  {/* Deep Blue */}
                                <stop offset="100%" stopColor="#00bcd4" stopOpacity={1} /> {/* Light Cyan Blue */}
                            </linearGradient>

                            <linearGradient id="SunsetGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#FF7E5F" stopOpacity="1" />
                                <stop offset="100%" stopColor="#FEB47B" stopOpacity="1" />
                            </linearGradient>

                            <linearGradient id="OceanMist" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#00c6ff" stopOpacity="1" />
                                <stop offset="100%" stopColor="#0072ff" stopOpacity="1" />
                            </linearGradient>

                        </defs>

                        

                        <ChartTooltip
                            cursor={false}


                            content={<ChartTooltipContent
                             hideLabel nameKey="month" labelKey={'price'}/>}

                        />
                        <PolarGrid gridType="circle" />
                        <RadialBar dataKey="price" background >
                            <Cell fill="url(#PurpleDream)" />
                            <Cell fill="url(#VioletPurple)" />
                            <Cell fill="url(#DeepPurpleViolet)" />
                            <Cell fill="url(#PurpleDreamGreenGlow)" />
                            <Cell fill="url(#MintBreeze)" />
                            <Cell fill="url(#ElectricLime)" />
                            <Cell fill="url(#LimeGlow)" />
                            <Cell fill="url(#GreenToLightBlueBridge)" />
                            <Cell fill="url(#OceanBlueToGreen)" />
                            <Cell fill="url(#BlueDream)" />
                            <Cell fill="url(#SunsetGlow)" />
                            <Cell fill="url(#OceanMist)" />
                            
                            <LabelList
                                position="insideEnd"
                                dataKey="category"
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