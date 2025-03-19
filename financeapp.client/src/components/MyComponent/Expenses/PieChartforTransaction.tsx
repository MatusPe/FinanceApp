import * as React from "react";
import { TrendingUp } from "lucide-react";

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
import {useMemo, useState, useEffect, useRef} from "react";








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


export function PieChartforTransactionComponent({data}) {
    const [chartData, setchartData]=useState([])

    useEffect(() => {
        console.log(data, 'this')
        var selectedData=[];
        if (data.type == "Transaction") {
            selectedData = data.expenseTransactions.map(transaction => ({
                name: transaction.name,
                price: transaction.price,
                
            }));
            console.log('hiihh');
            console.log(selectedData);
            setchartData(selectedData);
            
        } else {
            selectedData = data.cashTransactions.map(transaction => ({
                name: transaction.name,
                price: transaction.price,
                
            }));
            console.log('hiihh');
            setchartData(selectedData);
            

        }

        
        console.log(selectedData, 'this is selecteddata');
        
        if (selectedData.length > 11) {
            // Take the first 11 and create an 'Other' category with the sum of the rest
            const mainData = selectedData.slice(0, 11);
            const otherData = selectedData.slice(11);

            // Sum the prices of the remaining categories
            const otherSum = otherData.reduce((acc, item) => acc + item.price, 0);

            // Add the "Other" category with the sum
            mainData.push({
                name: "Other",
                price: otherSum,
                  // You can change the color if you want
            });

            setchartData(mainData);
        } else {
            // If there are 11 or fewer categories, just set the data as is
            setchartData(selectedData);
        }
        
    }, [data]);

    useEffect(() => {
        console.log(chartData, 'thisis chart data')

    }, [chartData]);
    
    

    
    const totalPrice = (chartData || []).reduce((acc, curr) => acc + curr.price, 0);
    console.log(chartData);
    return (
        <Card className="flex h-full w-full flex-col   border m-0 p-0 border-none">
            <CardHeader className="items-center pb-0 flex-row">
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
                                <stop offset="0%" stopColor="#00d27e" stopOpacity={1} />  
                                <stop offset="50%" stopColor="#00b0ff" stopOpacity={1} />  
                                <stop offset="100%" stopColor="#005ac1" stopOpacity={1}/>
                            </linearGradient>
                            <linearGradient id="GreenToLightBlueBridge" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#4caf50" stopOpacity={1} />  
                                <stop offset="50%" stopColor="#80e0e0" stopOpacity={1} />  
                                <stop offset="100%" stopColor="#00bcd4" stopOpacity={1} /> 
                            </linearGradient>
                            <linearGradient id="BlueDream" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#3f51b5" stopOpacity={1} />  
                                <stop offset="100%" stopColor="#00bcd4" stopOpacity={1} /> 
                            </linearGradient>
                            <linearGradient id="darkBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="#00bcd4" stop-opacity="1" />
                                <stop offset="90%" stop-color="#0000ff" stop-opacity="1" />
                            </linearGradient>

                        </defs>

                        <Pie
                            data={chartData}
                            dataKey="price"
                            nameKey="name"
                            innerRadius={"70%"}
                            outerRadius={"90%"}
                            strokeWidth={2}
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
                            <Cell fill="url(#darkBlue)" />
                            

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

                                    const total = chartData.reduce((sum, entry) => sum + entry.price, 0);

                                    const percentage = ((value / total) * 100).toFixed(2);
                                    return `${percentage}%`;
                                }}


                            />

                        </Pie>
                        


                    </PieChart>


                </ChartContainer>


            </CardContent>

        </Card>
    );
}
