import React from 'react'
import './PrintsPage.scss'
import Gallery from '../../components/Gallery/Gallery'
import Nav from '../../components/Nav/Nav'
import Footer from '../../components/Footer/Footer'
import BackToTop from '../../components/BacktoTop/BacktoTop'

const PrintsPage = () => {
  return (
    <>
    
    <Nav/>
    <main>
       
        <Gallery category={'prints'}/>
        
        <Footer/>
        <BackToTop/>
    </main>
    </>
  )
}

export default PrintsPage