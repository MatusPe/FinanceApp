
import './App.css'
import {Button} from "@/components/ui/button.tsx";
import {GoogleIcon} from "@/assets/IconReact.jsx";
import {Login} from "@/components/MyComponent/Login/Login.jsx";
import {Registration} from "@/components/MyComponent/Login/Registration.jsx";

import {useState} from "react";

function FirstPage() {
    const [showComponent, setshowComponent] = useState(true);

    const handleclick = () => {

        setshowComponent(!showComponent);
    }
    return (
        <div className="flex items-center justify-center w-full h-full bg-custom-grid  bg-black min-h-screen">
           
            <div
                className="p-[0px] rounded-lg shadow-2xl w-96 border-[0px] border-green-500"
                style={{
                    backgroundImage: "linear-gradient(to right, rgba(34, 197, 94, 0.3), rgba(22, 163, 74, 1))",
                }}
            >

                {showComponent&&(<Login setshowComponent={handleclick}></Login>)}
                {!showComponent&&(<Registration setshowComponent={handleclick}></Registration>)}
            </div>

        </div>

    );
}

export default FirstPage;