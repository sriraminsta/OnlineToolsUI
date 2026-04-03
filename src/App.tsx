import {  Route, Routes } from 'react-router-dom'
import EMICalculatorPage from './features/FinancialTools/Components/EMICalculatorPage.tsx'
import FDCalculatorPage from './features/FinancialTools/Components/FDCalculatorPage.tsx'
//import HomePage from './pages/HomePage.tsx'
import SIPCalculatorPage from './features/FinancialTools/Components/SIPCalculatorPage.tsx'
import CalculatorToolsPage  from './pages/CalculatorToolsPage.tsx'
import HomePage from './features/Layout/Components/HomePage.tsx'
import FooterPage from './features/Layout/Components/FooterPage.tsx'
import MenuPage  from './features/Layout/Components/MenuPage.tsx'


export default function App() {
  return (
     <>
     <MenuPage/>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/calculator-tools/fd-calculator" element={<FDCalculatorPage />} />
      <Route path="/calculator-tools/sip-calculator" element={<SIPCalculatorPage />} />
      <Route path="/calculator-tools/emi-calculator" element={<EMICalculatorPage />} />
      <Route path="calculator-tools" element = {<CalculatorToolsPage/>}/>
    </Routes>
    <FooterPage/>
    </>
  )
}
