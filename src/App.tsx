import { Navigate, Route, Routes } from 'react-router-dom'
import EMICalculatorPage from './pages/EMICalculatorPage.tsx'
import FDCalculatorPage from './pages/FDCalculatorPage.tsx'
import HomePage from './pages/HomePage.tsx'
import SIPCalculatorPage from './pages/SIPCalculatorPage.tsx'
import CalculatorToolsPage  from './pages/CalculatorToolsPage.tsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/calculator-tools/fd-calculator" element={<FDCalculatorPage />} />
      <Route path="/calculator-tools/sip-calculator" element={<SIPCalculatorPage />} />
      <Route path="/calculator-tools/emi-calculator" element={<EMICalculatorPage />} />
      <Route path="calculator-tools" element = {<CalculatorToolsPage/>}/>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
