import FirstPage from "@/App.jsx";
import SidebarDemo from "@/components/MyComponent/Expenses/SiderBar.jsx";

import { UserRoundPen } from 'lucide-react';
import { Switch } from "@/components/ui/switch"

import { Label } from "@/components/ui/label"


import {BasicDatePicker, ProfileTable} from '@/components/profil/Privatdata.jsx'
import {ContactTable} from "@/components/profil/KontaktData.jsx";

function ProfileOptionPage() {

    return (<div>
        <div className="flex flex-row h-full w-full"><SidebarDemo></SidebarDemo>



            <div className="flex flex-row gap-4 p-10 bg-[#24232a] w-full h-screen overflow-hidden justify-center flex items-center">
                <ProfileTable/>
                <ContactTable></ContactTable>






            </div>
        </div>
    </div>)
}

export default ProfileOptionPage;


