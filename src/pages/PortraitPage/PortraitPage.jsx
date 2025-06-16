import React from 'react'
import './PortraitPage.scss'
import Gallery from '../../components/Gallery/Gallery'
import Nav from '../../components/Nav/Nav'
import Footer from '../../components/Footer/Footer'
import BackToTop from '../../components/BacktoTop/BacktoTop'



function PortraitPage() {
  return (
    <>
     <Nav/>
    <main>
       
        <Gallery category={'portrait'}/>
        
        <Footer/>
        <BackToTop/>
    </main>
    </>
  )
}

export default PortraitPage