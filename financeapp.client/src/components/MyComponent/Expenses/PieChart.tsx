import * as React from "react";
import { TrendingUp } from "lucide-react";
import {useEffect, useState} from "react";

import '@/app/globals.css'

import {Cell, Label, LabelList, Legend, Pie, PieChart} from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer, ChartLegend, ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { SelectItem } from "@radix-ui/react-select";
import {Select, SelectContent, SelectTrigger, SelectValue} from "@/components/ui/select";
import {GetExpensesByMouthApi} from "../Services/ApiService.jsx";






const chartConfig = {
    price: { label: "Price:" },
    Tesla: { label: "Tesla:", color: "rgba(0, 209, 255, 1)" },
    Ford: { label: "Ford:", color: "rgba(29, 29, 29, 1)" },
    Toyota: { label: "Toyota:", color: "rgba(163, 0, 214, 1)" },
    Chevrolet: { label: "Chevrolet:", color: "rgba(76, 175, 80, 1)" },
    BMW: { label: "BMW:", color: "rgba(255, 64, 129, 1)" },
    Nissan: { label: "Nissan:", color: "rgba(158, 158, 158, 1)" },
    Audi: { label: "Audi:", color: "rgba(0, 200, 83, 1)" },
    "Mercedes-Benz": { label: "Mercedes-Benz: \u00A0 ", color: "rgba(244, 67, 54, 1)" },
    Volkswagen: { label: "Volkswagen:", color: "rgba(96, 125, 139, 1)" },
    Hyundai: { label: "Hyundai:", color: "rgba(156, 39, 176, 1)" },
} satisfies ChartConfig;



const month={
    Jan: "1",
    Feb: "2",
    Mar: "3",
    Apr: "4",
    May: "5",
    Jun: "6",
    Jul: "7",
    Aug: "8",
    Sep: "9",
    Oct: "10",
    Nov: "11",
    Dec: "12",
}

export function PieChartComponent() {
    


    const [activeMonth, setActiveMonth] = React.useState((new Date().getMonth()+1).toString());
    const [activeYear, setActiveYear] = React.useState(new Date().getFullYear());
    const [charData, setchardata]=React.useState();
    const [totalPrice,setTotalPrice]=useState(0);
    
    
    useEffect(() => {

        const fetchMonthExpenses = async () => {
            try {
                // Fetch the expenses data
                const monthExpenses = await GetExpensesByMouthApi(activeMonth, new Date().getFullYear());
                console.log(monthExpenses, "this is data");

                // Set the data for the chart (assuming 'monthExpenses' is the data you want to use)
                setchardata(monthExpenses);
                setTotalPrice(monthExpenses.reduce((acc, curr) => acc + curr.price, 0))
            } catch (error) {
                console.error("Error fetching month expenses:", error);
            }
        };
        fetchMonthExpenses()
        
        
    }, [activeMonth]);

    return (
        <Card className="flex h-full w-full flex-col   border-none">
            <CardHeader className="items-center pb-0 flex-row">

                <Select value={activeMonth} onValueChange={setActiveMonth}>
                    <SelectTrigger
                        className="mr-auto h-6 w-[130px] rounded-3xl pl-2.5   text-white bg-black border-2 border-green-500"

                    >

                        <SelectValue placeholder="Select month" className="text-red-950 ">{new Date(activeMonth).toLocaleString('en-US', { month: 'short' })}</SelectValue>
                    </SelectTrigger>
                    <SelectContent align="end" className="rounded-xl bg-black border-2 border-green-500" >
                        {Object.entries(month).map(([key, value]) => {
                            return (<SelectItem
                                key={key}
                                value={value}
                                className="rounded-lg [&_span]:flex bg-black text-white hover:bg-gradient-to-r  from-[#3A3535] to-[#1F1B1B] hover:rounded-3xl pl-4 m-1"
                                >
                                <div className="flex items-center gap-2 text-xs">

                                    {key}
                                </div>
                            </SelectItem>);
                        })}
                    </SelectContent>
                </Select>
                <CardTitle className="text-white">Monthly spending by Category</CardTitle>

            </CardHeader>
            <CardContent className=" h-[90%] w-full flex-grow   ">
                <ChartContainer
                    config={chartConfig}
                    className=" m-0 p-0  w-full  h-full flex-grow"
                >

                    <PieChart className="flex-col  m-0 p-0   ">
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel/>}
                        />

                        

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
                            
                        </defs>

                        <Pie
                            data={charData}
                            dataKey="price"
                            nameKey="category"
                            innerRadius={"70%"}
                            outerRadius={"90%"}
                            strokeWidth={2}
                            fill="url(#gradient1)"
                        >
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
                            

                            <Label
                                content={({viewBox}) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"

                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    style={{fill: 'white'}}
                                                    className="fill-foreground text-2xl font-bold "
                                                >
                                                    ${totalPrice.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    style={{fill: 'white'}}
                                                    className="fill-muted-foreground"
                                                >
                                                    Total
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                            <LabelList
                                dataKey="price"
                                className="fill-background"
                                stroke="none"
                                fontSize={10}
                                fontWeight={'bold'}

                                style={{fill: 'white'}}
                                formatter={(value) => {

                                    const total = charData.reduce((sum, entry) => sum + entry.price, 0);

                                    const percentage = ((value / total) * 100).toFixed(2);
                                    return `${percentage}%`;
                                }}


                            />

                        </Pie>
                        <Legend
                            layout="vertical"
                            align="right"
                            verticalAlign="middle"
                            wrapperStyle={{paddingLeft: 20}}
                            iconType="circle"
                        />


                    </PieChart>


                </ChartContainer>


            </CardContent>

        </Card>
    );
}
