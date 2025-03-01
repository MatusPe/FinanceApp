

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import FirstPage from "@/App.jsx";
import {Button} from "@/components/ui/button";
import {LogoutAPI} from "@/components/MyComponent/Services/AuthServices.jsx"
import { useNavigate } from "react-router-dom";
function HeaderApp(){

    const navigate = useNavigate();
    
    const handleClick = () => {
        console.log("clicked");
        LogoutAPI().then((res)=> {
            if(res){
                navigate("/");
            }
        })
    }
    return (


        <div className="w-[100%] h-[10vh] border-2 border-green-500 bg-gradient-to-r from-[#3A3535] to-[#1F1B1B] p-2 flex flex-row justify-center max-h-[70px] min-h-[50px]">


            <div className="w-full h-full flex justify-start items-center ml-2 ">
                <img src="src/assets/logo.svg" alt="Obrázok" className="object-contain h-full  filter invert brightness-0 sepia saturate-[500%] hue-rotate-[120deg]"/>
            </div>
            <NavigationMenu className="mr-2 ml-30">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger
                            className="bg-black text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all duration-300  hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-1">Products</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <NavigationMenuLink>Link</NavigationMenuLink>
                        </NavigationMenuContent>

                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger
                            className="bg-black text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all duration-300  hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-1">Item
                            One</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <NavigationMenuLink>Link</NavigationMenuLink>
                        </NavigationMenuContent>

                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger
                            className="bg-black text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all duration-300  hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-1">Item
                            One</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <NavigationMenuLink>Link</NavigationMenuLink>
                        </NavigationMenuContent>

                    </NavigationMenuItem>

                    <NavigationMenuItem >
                        <Button onClick={()=>handleClick()}
                            className="  bg-green-600   text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all duration-300  hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-1">Log out</Button>
                        <NavigationMenuContent>
                            <NavigationMenuLink>Link</NavigationMenuLink>
                        </NavigationMenuContent>

                    </NavigationMenuItem>
                </NavigationMenuList>

            </NavigationMenu></div>)
}

export default HeaderApp;