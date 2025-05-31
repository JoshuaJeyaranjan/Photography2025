import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import HomePage from './pages/HomePage/HomePage'
import ContactPage from './pages/ContactPage/ContactPage'
import OrderPage from './pages/OrderPage/OrderPage'
import PortraitPage from './pages/PortraitPage/PortraitPage'
import StreetPage from './pages/StreetPage/StreetPage'

function App() {


  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={ <HomePage/>} /> 
    <Route path='/contact' element={ <ContactPage/>} /> 
    <Route path='/order' element={ <OrderPage/>} /> 
    <Route path='/portrait' element={ <PortraitPage/>} /> 
    <Route path='/street' element={ <StreetPage/>} /> 
    </Routes>
    </BrowserRouter>
  )
}

export default App
