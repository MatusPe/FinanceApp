import React, { useState } from "react";
import {
    Sidebar,
    SidebarBody,
    SidebarLink,
    DesktopSidebar,
    MobileSidebar,
} from "../../ui/sidebar.tsx"; // Replace with your file path
import { IconHome, IconSettings, IconUser, IconLogout } from "@tabler/icons-react";
import {useLocation} from "react-router-dom";

import {Expenses} from "@/assets/overall/OverAllSVG.jsx"

const SidebarDemo = () => {
    const [open, setOpen] = useState(false);


    const [currentside, setCurrentside] = useState();

    const links = [
        {
            label: "Home",
            href: "/home",
            icon: <IconHome className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
        },
        {
            label: "Profile",
            href: "/profile",
            icon: <IconUser className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
        },
        {
            label: "Settings",
            href: "/settings",
            icon: <IconSettings className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
        },
        {
            label: "Expenses",
            href: "/Expenses",
            icon: <img className={'h-5 w-5'} src={'src/assets/overall/ExpensesIcon.svg'}/>,
        },
        {
            label: "Loan",
            href: "/Loan",
            icon: <img className={'h-5 w-5'} src={'src/assets/overall/Loan.svg'}/>,
        },
        {
            label: "Budget",
            href: "/Budget",
            icon: <img className={'h-5 w-5'} src={'src/assets/overall/Budget.svg'}/>,
        },
        {
            label: "Investment",
            href: "/investment",
            icon: <img className={'h-5 w-5'} src={'src/assets/overall/Investment.svg'}/>,
        },

        {
            label: "Logout",
            href: "/logout",
            icon: <IconLogout className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
        },
    ];

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-neutral-900">
            <Sidebar open={open} setOpen={setOpen}>
                <DesktopSidebar >
                    <SidebarBody className={`bg-gradient-to-br from-gray-800 to-black   ${!open ? 'items-center' : 'items-start'}`} >
                        <div className="flex flex-col gap-4 text-white fill-white" >
                            {links.map((link, idx) => {

                                return(
                                <SidebarLink key={idx} link={link}  className={` transition-transform duration-300 ease-in-out filter invert brightness-0 sepia saturate-[500%] hue-rotate-[120deg]`}/>
                                );
                                }
                            )}
                        </div>
                    </SidebarBody>
                </DesktopSidebar>

            </Sidebar>

        </div>
    );
};

export default SidebarDemo;

