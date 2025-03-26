import SidebarDemo from "@/components/MyComponent/Expenses/SiderBar.jsx";
import {ProfileTable} from "@/components/profil/Privatdata.jsx";
import {ContactTable} from "@/components/profil/KontaktData.jsx";
import {useEffect, useRef, useState} from "react";
import { Building2 } from 'lucide-react';
import {LineComponentInvestment} from "@/components/MyComponent/Investment/Linechart.tsx";
import * as React from "react";
import { Search } from "lucide-react";
import {MultipleComponent} from "@/components/MyComponent/Investment/multipleline.tsx";
import {RadialComponent} from "@/components/MyComponent/Investment/Radialchart.tsx";
import Header from "@/Header.jsx";
import {PieComponent} from "@/components/MyComponent/Investment/CategoryPieChart.tsx";
import {BarComponent} from "@/components/MyComponent/Investment/BarchartCustom.tsx";
import {
    InvestmentGetUserAccountApi,
    InvestmentGetUserOrderDataApi, InvestmentGetUserpositionApi
} from "@/components/MyComponent/Services/ApiServiceInvestment.jsx";

import * as signalR from "@microsoft/signalr";




export const InvestmentPage = ()=>{
    const [Money, setMoney] = useState(true)
    const [percentualMoney, setPercentualMoney] = useState(false)
    const [header, setHeader] = useState(true)

    const [GetData, setGetData] = useState(0)
    
    const [Balance, setBalance] = useState(0)
    
    const [bestMonth, setBestMonth] = useState("Unknown");
    const [worstMonth, setWorstMonth] = useState("Unknown");
    const [multylinedata, setMultylinedata] = useState([])
    const [keydata, setKeydata] = useState([])
    const [investmentbymonth, setInvestmentbymonth] = useState([]);
    
    const [pieData, setPieData] = useState([])
    
    const [total, setTotal] = useState(0)
    const [topstockData, setTopstockData] = useState([])
    const [topstock, setTopstock] = useState(true)
    const [searchstock, setSearchstock] = useState("")

    const getBestAndWorstMonth = (getData) => {
        if (getData.length === 0) return;

        // Find the month with the highest and lowest totalProfitLoss
        const bestMonth = getData.reduce((best, current) =>
            current.totalProfitLoss > best.totalProfitLoss ? current : best
        );
        console.log(bestMonth, 'this is best data')
        setBestMonth(bestMonth)

        const worstMonth = getData.reduce((worst, current) =>
            current.totalProfitLoss < worst.totalProfitLoss ? current : worst
        );
        console.log(worstMonth, 'this is wors data')
        setWorstMonth(worstMonth)

        
    };

    const [messages, setMessages] = useState([]);
    const [connection, setConn] = useState(true);
    const connectionRef = useRef(null);

    useEffect(() => {
        if (connectionRef.current) return;

        if(connection===true){
            console.log('init connection')
            const connection = new signalR.HubConnectionBuilder()
                .configureLogging(signalR.LogLevel.Information)  // add this for diagnostic clues
                .withUrl("https://localhost:44301/hubs/alpaca", {

                }).withAutomaticReconnect()
                .build();


            connection.start()
                .then(() => {
                    console.log("Connected to SignalR Hub");
                    connection.invoke("StartListening");

                    connection.on("ReceiveMessage", (message) => {
                        console.log("Received:", message);
                        setMessages((prev) => [...prev, message]);
                        connectionRef.current = connection;
                    });
                })
                .catch((err) => {
                    console.error("Error while starting connection:", err);
                });
        }
        
        setConn(false)    

        
    }, []);


    
    const Handle =()=>{
        setMoney(!Money)
        setPercentualMoney(!percentualMoney)
    }

    const Handlemultiple=()=>{
        setHeader(!header)
    }
    
    useEffect(()=>{
        
        InvestmentGetUserAccountApi().then(r => {
            console.log(r, 'this is more then usefull data')
            setGetData(r.data)
            setBalance(r.data[r.data.length - 1])
            getBestAndWorstMonth(r.data)
        })

        InvestmentGetUserOrderDataApi().then(r => {
            console.log(r, 'this is investment data')
            const filteredData = r.data.investmentOrders.map(order => {
                let result = { month: order.month };

                order.orders.forEach(stock => {
                    if (r.data.stock.includes(stock.symbol)) {
                        result[stock.symbol] = stock.profitLossValue;
                    }
                });
                setInvestmentbymonth((previous) => [
                    ...previous,  // Keep the existing state
                    { month: order.month, invested: order.total }  // Add the new month object
                ]);
                
                
                return result;
            });

            const totalSum = r.data.investmentOrders.reduce((accumulator, order) => {
                return accumulator + order.total;
            }, 0);
            setTotal(totalSum);

            
            
            setMultylinedata(filteredData)
            setKeydata(r.data.stock)
        })

        InvestmentGetUserpositionApi().then(r => {
            console.log(r, 'this is position investment data')
            setPieData(r.data)
            const highestPlpc = r.data.reduce((max, current) => {
                return (current.unrealized_plpc > max.unrealized_plpc) ? current : max;
            }, r.data[0]);
            console.log(highestPlpc, 'highest data')
            setTopstockData(highestPlpc)
        })
    }, [])
    
    useEffect(()=>{
        console.log(total,'totalfuck yeaa')
    }, [total])
    
    useEffect(()=>{
        console.log(investmentbymonth, 'this is aba')
    }, [investmentbymonth])
    useEffect(()=>{
        console.log(multylinedata)
    }, [multylinedata])
    
    
    const handleTopClick=(top)=>{
        if(top==="profit"){
            setTopstock(false)
            const highestPlpc = pieData.reduce((max, current) => {
                return (current.unrealized_pl > max.unrealized_pl) ? current : max;
            }, pieData[0]);
            setTopstockData(highestPlpc)
            
            
            
        }else if(top==="percentual"){
            setTopstock(true)
            const highestPlpc = pieData.reduce((max, current) => {
                return (current.unrealized_plpc > max.unrealized_plpc) ? current : max;
            }, pieData[0]);
            setTopstockData(highestPlpc)
        }
    }
    const maxInvestment = investmentbymonth.length > 0
        ? investmentbymonth.reduce((max, current) => {
            return (current.invested > max.invested) ? current : max;
        }, investmentbymonth[0]).month
        : 0;

    
    
    useEffect(()=>{
        console.log(topstockData, 'atata')
    }, [topstockData])
    return(<div>
        <div className="flex flex-row h-full w-full"><SidebarDemo></SidebarDemo>



            <div className="flex flex-row gap-4 p-4 bg-[#24232a] w-full h-screen overflow-hidden ">

                <div className={'w-[25%] h-full bg-gradient-to-r from-[#3A3535] flex flex-col to-[#1F1B1B] rounded-[9px] p-4'}>
                    <h1 className={'text-white text-[32px]'}>Balance</h1>
                    <div className={'w-full h-[50px] flex flex-row  justify-between gap-4'}>
                        <div className={'w-[75%] bg-[#1f1f1f] border-2  shadow-md shadow-black border-green-500 text-[20px] font-bold text-green-500 items-center justify-center flex'}>{Balance.totalEquity}$</div>
                        <div className={'w-[25%] bg-green-500 border-2 shadow-md shadow-black border-green-500 text-[20px] font-bold items-center justify-center flex text-white font-bold'}>{Balance.totalProfitLossPct}%</div>

                    </div>

                    <h1 className={'text-white text-[32px] mt-10'}>Total Invested</h1>
                    <div className={'w-full h-[50px] flex flex-row  justify-between gap-4'}>
                        <div className={'w-[100%] bg-[#1f1f1f] border-2  shadow-md shadow-black border-green-500 text-[20px] font-bold text-green-500 items-center justify-center flex'}>{(total).toFixed(2)}</div>


                    </div>

                    <div className={'flex flex-col'}>
                        <h1 className={'text-white text-[20px] mt- flex justify-center items-center mt-10'}>Top Stock</h1>
                        <div className={'w-full h-[50px] flex flex-row  justify-between gap-4 text-[15px] text-white'}>
                            <button onClick={()=>handleTopClick("profit")} className={'h-[25px] m-0 p-0 hover:scale-150 transition-transform duration-300 hover:border-b-2'}>Pure profit</button>
                            <button onClick={()=>handleTopClick("percentual")} className={'h-[25px] m-0 p-0 hover:scale-150 transition-transform duration-300 hover:border-b-2'}>Percentuale</button>
                        </div>
                    </div>

                    <div className={'flex flex-col  '}>
                    
                        <Stock {...topstockData} top={topstock} />



                    </div>
                    <div className={'flex flex-col h-full w-full flex-grow  overflow-hidden relative '}>

                        <button
                            className=" absolute right-0 top-6 border-2 border-green-500 h-8 w-8 bg-black text-center justify-center text-white font-bold  rounded-lg shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-1 rounded-r-2xl mt-1 ml-0.5 rounded-bl-2xl"

                            aria-hidden="true"
                            onClick={() => {Handle()}}
                        >&gt;
                        </button>

                        <button
                            className=" absolute right-9 top-6 border-2 border-green-500 rounded-br-2xl h-8 w-8 mt-1 ml-1 text-center bg-black text-white font-bold rounded-lg shadow-lg transition-all duration-300  hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-1 rounded-l-2xl" aria-hidden="true"

                            onClick={() => {Handle()}}>
                            &lt;</button>


                        {Money&&(<LineComponentInvestment header={'Money Profit'} getData={GetData}></LineComponentInvestment>)}
                        {percentualMoney&&(<LineComponentInvestment header={'Most Profitable'} getData={GetData}></LineComponentInvestment>)}

                    </div>




                </div>

                <div className={'w-[75%] h-full flex flex-col gap-4'}>
                    <div className={' flex flex-col w-full h-[25%] bg-gradient-to-r from-[#3A3535] to-[#1F1B1B] rounded-[9px] '}>
                        <div className="w-[200px] h-[30px] flex items-center gap-2 bg-[#1f1f1f] border-2 shadow-black border-green-500 p-2 rounded-xl shadow-lg mt-1 ml-1">
                            <Search className="text-green-400 w-5 h-5 " />
                            <input
                                type="text"
                                className="w-full bg-transparent outline-none text-white placeholder-gray-500"
                                placeholder="Search..."
                                onChange={(e)=>setSearchstock(e.target.value)}


                            />
                        </div>


                        <InvestmentStocks GetData={pieData} searchData={searchstock}></InvestmentStocks>
                    </div>
                    <div className={' flex-grow flex flex-row bg-gradient-to-r from-[#3A3535] to-[#1F1B1B] rounded-[9px]  overflow-hidden'}>

                        <div className={'w-[70%] h-full flex flex-col gap-0 '}>
                            <div className={' h-[55%] relative  '}>
                                <button
                                    className=" absolute right-5 top-6 border-2 border-green-500 h-8 w-8 bg-black text-center justify-center text-white font-bold  rounded-lg shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-1 rounded-r-2xl mt-1 ml-0.5 rounded-bl-2xl"
                                    aria-hidden="true"
                                    onClick={() => {Handlemultiple()}}
                                    >&gt;
                                </button>

                                <button
                                    className=" absolute right-14 top-6 border-2 border-green-500 rounded-br-2xl h-8 w-8 mt-1 ml-1 text-center bg-black text-white font-bold rounded-lg shadow-lg transition-all duration-300  hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-1 rounded-l-2xl" aria-hidden="true"

                                    onClick={() => {Handlemultiple()}}>
                                    &lt;
                                </button>

                                <MultipleComponent header={header} getData={multylinedata} keydata={keydata}></MultipleComponent>

                            </div>
                            <div className={'flex flex-row  flex-grow  overflow-hidden '}>
                                <div className={'flex flex-grow w-[25%] p-3  items-center justify-center'}>
                                    <RadialComponent getData={pieData}></RadialComponent>
                                </div>
                                <div className={'flex flex-grow w-[25%] p-3 justify-center items-center'}>
                                    <PieComponent getData={pieData}></PieComponent>
                                </div>
                            </div>

                        </div>
                        <div className={'flex flex-grow flex-col relative'}>


                            
                            <BarComponent investmentbymonth={investmentbymonth}></BarComponent>
                            <div className={'flex flex-grow p-6 flex-col  gap-3 pr-4 pb-4  items-center justify-center'}>
                                <div className={'flex flex-row w-full h-[50%] gap-3 overflow-hidden items-center justify-center max-h-[165px] max-w-[340px]'}>
                                    <div className={' min-h-[100px] min-w-[100px] max-h-[165px] max-w-[165px] min flex-col flex bg-[#1f1f1f] w-[50%] h-full border-green-500 border   justify-center'}>

                                        <h1 className={'text-white mt-2 ml-2'}>Top mouth</h1>
                                        <h1 className={' mt-3 text-green-500 text-[25px] flex items-center justify-center w-full  font-bold '}>{bestMonth.month}</h1>
                                        <h1 className={'text-white font-bold ml-2'}>{new Date().getFullYear()}</h1>
                                    </div>

                                    <div className={'min-h-[100px] min-w-[100px] max-h-[165px] max-w-[165px] flex flex-col bg-[#1f1f1f] w-[50%] h-full border-green-500 border  justify-center'}>

                                        <h1 className={'text-white mt-2 ml-2'}>High Investment</h1>
                                        <h1 className={' mt-3 text-green-500 text-[25px] flex items-center justify-center w-full  font-bold '}>{maxInvestment}</h1>
                                        <h1 className={'text-white font-bold ml-2'}>{new Date().getFullYear()}</h1>
                                    </div>
                                </div>

                                <div className={'flex flex-row w-full h-[50%] gap-3 items-center justify-center  max-h-[165px] max-w-[340px]'}>
                                    <div className={'min-h-[100px] min-w-[100px] max-h-[165px] max-w-[165px] flex flex-col bg-[#1f1f1f] w-[50%] h-full border-green-500 border justify-center'}>

                                        <h1 className={'text-white mt-2 ml-2'}>Worst stocks</h1>
                                        <h1 className={'mt-3 text-green-500 text-[25px] flex items-center justify-center w-full  font-bold '}>
                                            {pieData.reduce((max, current) => {
                                                return (current.unrealized_pl < max.unrealized_pl) ? current : max;
                                            }, pieData[0].symbol||"unknow")}
                                        </h1>
                                        <h1 className={'text-white font-bold ml-2'}>{new Date().getFullYear()}</h1>
                                    </div>

                                    <div className={' min-h-[100px] min-w-[100px] max-h-[165px] max-w-[165px] flex flex-col bg-[#1f1f1f] w-[50%] h-full border-green-500 border  justify-center'}>

                                        <h1 className={'text-white mt-2 ml-2'}>Worst mouth</h1>
                                        <h1 className={'mt-3 text-green-500 text-[25px] flex items-center justify-center w-full  font-bold '}>{worstMonth.month}</h1>
                                        <h1 className={'text-white font-bold ml-2'}>{new Date().getFullYear()}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>





            </div>


        </div>

    </div>)
}

export const InvestmentStocks = ({GetData, searchData})=>{


    const filteredData = GetData.filter(item =>
        item.symbol && item.symbol.toLowerCase().includes(searchData.toLowerCase())
    );

    const containerRef = useRef(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const [showScrollButton, setShowScrollButton] = useState(false); // Store the interval ID to clear it when necessary
    const [showScrollButtonleft, setShowScrollButtonleft] = useState(true);
    const scrollIntervalRef = useRef(null);


    const handlerScroll = (number) => {
        if (isScrolling) return; // Prevent multiple intervals
        setIsScrolling(true);

        scrollIntervalRef.current = setInterval(() => {
            if (!containerRef.current) return;

            containerRef.current.scrollLeft += number;

            // Stop scrolling if we reach the start or end
            if (containerRef.current.scrollLeft <= 0 ||
                containerRef.current.scrollLeft >= containerRef.current.scrollWidth - containerRef.current.clientWidth) {
                stopScrolling();
            }
        }, 16);
    };

    const stopScrolling = async () => {
        console.log('this is stop');
        if (scrollIntervalRef.current) {
            clearInterval(scrollIntervalRef.current);
            setIsScrolling(false);

            console.log(isScrolling);
            console.log('isScrolling');
        }
        console.log(isScrolling);
    };
    const handleScroll = () => {
        if (!containerRef.current) return;

        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;

        // Update button visibility based on scroll position
        setShowScrollButton(scrollLeft > 0);  // Show left button when scrolled
        setShowScrollButtonleft(scrollLeft < scrollWidth - clientWidth);
    };



    useEffect(() => {
        const container = containerRef.current;
        container.addEventListener('scroll', handleScroll);
        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);


    const data = [
        { CurrentInvested: 1000, Zisk: 200, Stocks: "Apple", CurrentPriceOnTheMarket: 120, Color: "#30D5C8" },
        { CurrentInvested: 1500, Zisk: -100, Stocks: "Microsoft", CurrentPriceOnTheMarket: 90, Color: "#FF6F61" },
        { CurrentInvested: 2000, Zisk: 500, Stocks: "Tesla", CurrentPriceOnTheMarket: 125, Color: "#A7E400" },
        { CurrentInvested: 500, Zisk: -50, Stocks: "Amazon", CurrentPriceOnTheMarket: 90, Color: "#30D5C8" },
        { CurrentInvested: 500, Zisk: -50, Stocks: "Amazon", CurrentPriceOnTheMarket: 90, Color: "#C1D9D1" },
        { CurrentInvested: 500, Zisk: -50, Stocks: "Amazon", CurrentPriceOnTheMarket: 90, Color: "#BFAFAF" },
        { CurrentInvested: 500, Zisk: -50, Stocks: "Amazon", CurrentPriceOnTheMarket: 90, Color: "#BFD4D9" },
        { CurrentInvested: 500, Zisk: -50, Stocks: "Amazon", CurrentPriceOnTheMarket: 90, Color: "#A9B9D9" },
    ];

    return(<div className={' relative w-full h-full'}><div ref={containerRef} className={'flex flex-row  p-2 w-full overflow-scroll overflow-hidden h-full items-center '} style={{
        // Hiding the scrollbar with inline styles
        scrollbarWidth: 'none', // Firefox
        msOverflowStyle: 'none', // IE and Edge
    }}>
        {filteredData.map((row, index) => (
            <Stock key={index} {...row} top={true}/>
        ))}

        {showScrollButtonleft && (<button onMouseDown={()=>handlerScroll(20)} // Start scrolling when mouse is pressed
                onMouseUp={stopScrolling} onTouchStart={() => handlerScroll(-20)} // Handle touch start
                                          onTouchEnd={stopScrolling} className={'absolute right-10 font-bold shadow-md shadow-black  text-green-500 text-[40px] bg-gradient-to-r from-[#3A3535] to-[#1F1B1B] border-green-500 border bg-black w-[52px] h-[52px] flex items-center justify-center rounded-[9px] pb-2'} // Stop scrolling when mouse is released
        >&gt;</button>)}

        {showScrollButton && (
            <button
                onMouseDown={()=>handlerScroll(-20)}
                onMouseUp={stopScrolling} onTouchStart={() => handlerScroll(-20)} // Handle touch start
                onTouchEnd={stopScrolling}
                className="absolute left-10 text-green-500  border text-[40px] border-green-500  shadow-md shadow-black font-bold bg-gradient-to-r from-[#3A3535] to-[#1F1B1B] w-[52px] h-[52px] flex items-center justify-center rounded-[9px] pb-2"
            >
                &lt;
            </button>
        )}
    </div>

    </div>)

}
const Stock=({market_value, unrealized_plpc, symbol, current_price, Color, unrealized_pl , top})=>{

    console.log(unrealized_plpc, 'unrealized_plpc');
    
    return (<div className={`min-w-[25%] h-full border border-green-500 p-4 mx-2 rounded-[9px]  flex flex-row justify-between shadow-black shadow-lg`} style={{ backgroundColor: Color}}>
        <div className={'flex-col flex justify-between'}>
            <div className={'flex-row flex border border-green-500 p-2 rounded-[9px] bg-black shadow-lg shadow-black'}>
                <Building2 color={'#22c55e'}/>
                <h1 className={'text-green-500'}>{symbol}</h1>
            </div>
            <div className={'flex flex-col font-bold text-white '}><h1 className={'text-gray-500 text-[20px]'}>Invested</h1><h1 className={'text-[20px]'}>${Math.round(market_value*100)/100}</h1></div>
        </div>
        <div className={'flex flex-col justify-between items-end'}>
            <div className={'flex flex-col font-bold text-white'}>
                <h1 className={'text-gray-500 text-[15px] '} style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)' }}>Profit</h1>
                <h1 className={'text-[25px] font-extrabold text-[#00FF00] '} style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)'}} >{top==true?`${((unrealized_plpc * 100)).toFixed(2)}%`:`$${((unrealized_pl)).toFixed(2)}`}</h1>
            </div>
            <div className={'flex flex-col font-bold text-white items-end'}><h1 className={'text-gray-500 text-[15px]'}>Current value</h1><h1 className={'text-[15px]'}>${Math.round(current_price*100)/100}</h1></div>

        </div>

    </div>)

}

