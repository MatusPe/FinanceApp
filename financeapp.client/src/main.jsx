import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HeaderApp from './Header.jsx'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./LoginPage.jsx";
import SidebarDemo from "./components/MyComponent/Expenses/SiderBar.jsx";
import ExpensesPage from "@/ExpensesPage.jsx";
import LoanPage from "@/LoanPage.jsx";
import BudgetPage from "@/BudgetPage.jsx";
import ProfileOptionPage from "@/ProfileOptionPage.jsx";
import {InvestmentPage} from "@/InvestmentPage.jsx";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"





createRoot(document.getElementById('root')).render(

    
        <Router>
            <ToastContainer />
            <HeaderApp /> {/* This can be consistent across pages */}
            <Routes>

                <Route path="/" element={<LoginPage />} />
                <Route path="/Expenses" element={<ExpensesPage />} />
                <Route path="/Loan" element={<LoanPage />} />
                <Route path="/Budget" element={<BudgetPage />} />
                <Route path="/profile" element={<ProfileOptionPage />} />
                <Route path="/investment" element={<InvestmentPage />} />


            </Routes>
        </Router>

    ,
)
