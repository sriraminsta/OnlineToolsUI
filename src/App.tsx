import { Navigate, Route, Routes } from 'react-router-dom'
import FooterPage from './features/Layout/Components/FooterPage.tsx'
import MenuPage  from './features/Layout/Components/MenuPage.tsx'
import { routeConfig } from './routes/routeConfig.tsx'


export default function App() {
  return (
     <>
     <MenuPage/>
    <Routes>
      {routeConfig.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={route.element}
        />
      ))}
      {/* fallback */}
       <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    <FooterPage/>
    </>
  )
}
