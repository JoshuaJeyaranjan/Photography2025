import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'

import './App.css'
import HomePage from './pages/HomePage/HomePage'
import ContactPage from './pages/ContactPage/ContactPage'
import OrderPage from './pages/OrderPage/OrderPage'
import PortraitPage from './pages/PortraitPage/PortraitPage'
import StreetPage from './pages/StreetPage/StreetPage'
import PhotoPage from './pages/PhotoPage/PhotoPage'
import CancelPage from './pages/CancelPage/CancelPage'
import SuccessPage from './pages/SuccessPage/SuccessPage'
import AboutPage from './pages/AboutPage/AboutPage'



function App() {


  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={ <HomePage/>} /> 
    <Route path='/home' element={ <HomePage/>} /> 
    <Route path='/contact' element={ <ContactPage/>} /> 
    <Route path='/order' element={ <OrderPage/>} /> 
    <Route path='/portrait' element={ <PortraitPage/>} /> 
    <Route path='/street' element={ <StreetPage/>} /> 
    <Route path="/photo/:id" element={<PhotoPage />} />
    <Route path='/payment-cancelled' element={ <CancelPage/>} /> 
    <Route path='/payment-success' element={ <SuccessPage/>} />
    <Route path='/about' element={ <AboutPage/>} /> 

    </Routes>
    </BrowserRouter>
  )
}

export default App
