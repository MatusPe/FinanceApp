import * as React from "react";
import { TrendingUp } from "lucide-react";

import '@/app/globals.css'

import {Label, LabelList, Legend, Pie, PieChart} from "recharts";

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
        if (data.type == "Transaction") {
            const selectedData = data.expenseTransactions.map(transaction => ({
                name: transaction.name,
                price: transaction.price,
                fill: "rgba(103, 58, 183, 1)",
            }));
            setchartData(selectedData);
            
        } else {
            const selectedData = data.cashTransactions.map(transaction => ({
                name: transaction.name,
                price: transaction.price,
                fill: "rgba(103, 58, 183, 1)",
            }));
            setchartData(selectedData);
            

        }
    }, [data]);

    
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

                        <Pie
                            data={chartData}
                            dataKey="price"
                            nameKey="name"
                            innerRadius={"70%"}
                            outerRadius={"90%"}
                            strokeWidth={2}
                        >

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

                                    const total = chartData.reduce((sum, entry) => sum + entry.Price, 0);

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
