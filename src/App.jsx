import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'

import { CartProvider } from './context/CartContext.jsx'
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
import PrintsPage from './pages/PrintsPage/PrintsPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import CartPage from './pages/CartPage/CartPage'
import CheckoutPage from './pages/CheckoutPage/CheckoutPage'
import TermsPage from './pages/TermsPage/TermsPage'
import FAQPage from './pages/FAQPage/FAQPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage/PrivacyPolicyPage'
import CustomerServicePage from './pages/CustomerServicePage/CustomerServicePage'
import LoginPage from './pages/LoginPage/LoginPage'
import SignupPage from './pages/SignupPage/SignupPage'

import AdminPage from './pages/AdminPage/AdminPage.jsx'
import AdminOrdersPage from './pages/AdminOrdersPage/AdminOrdersPage.jsx'

function App() {


  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path='/' element={ <PortraitPage/>} /> 
          <Route path='/home' element={ <PortraitPage/>} /> 
          <Route path='/contact' element={ <ContactPage/>} /> 
          <Route path='/order' element={ <OrderPage/>} /> 
          <Route path='/portrait' element={ <PortraitPage/>} /> 
          <Route path='/street' element={ <StreetPage/>} /> 
          <Route path="/photo/:id" element={<PhotoPage />} />
          <Route path='/payment-cancelled' element={ <CancelPage/>} /> 
          <Route path='/payment-success' element={ <SuccessPage/>} />
          <Route path='/about' element={ <AboutPage/>} /> 
          <Route path='/prints' element={ <PrintsPage/>} />   
          <Route path='/cart' element={ <CartPage/>} /> 
          <Route path='/checkout' element={ <CheckoutPage/>} />  
          <Route path='/privacy-policy' element={ <PrivacyPolicyPage/>} />
          <Route path='/terms' element={ <TermsPage/>} /> 
          <Route path='/faq' element={ <FAQPage/>} /> 
          <Route path='/customer-care' element={ <CustomerServicePage/>} />
          <Route path='/login' element={ <LoginPage/>} />
          <Route path='/signup' element={ <SignupPage/>} /> 
          <Route path='/admin' element={ <AdminPage/>} />
          <Route path='/admin/orders' element={ <AdminOrdersPage/>} />
          
          <Route path='*' element={ <NotFoundPage/>} />   
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
