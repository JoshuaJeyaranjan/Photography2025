import React, { useState, useEffect } from 'react'
import './PrintsPage.scss'
import Gallery from '../../components/Gallery/Gallery'
import Nav from '../../components/Nav/Nav'
import Footer from '../../components/Footer/Footer'
import BackToTop from '../../components/BacktoTop/BacktoTop'

const PrintsPage = () => {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 350); // Loader visible for 250ms

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);
  return (
    <>
       {isLoading && (
        <div className="page-loader">
          {/* You can put a simple spinner or a subtle logo here if desired */}
          {/* For now, it's just a full-screen overlay */}
        </div>
      )}
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