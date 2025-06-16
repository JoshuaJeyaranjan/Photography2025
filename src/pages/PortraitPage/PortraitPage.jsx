import React, { useState, useEffect } from 'react';
import './PortraitPage.scss'
import Gallery from '../../components/Gallery/Gallery'
import Nav from '../../components/Nav/Nav'
import Footer from '../../components/Footer/Footer'
import BackToTop from '../../components/BacktoTop/BacktoTop'



function PortraitPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 250); // Loader visible for 250ms

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
      <div className={`portrait-page-content ${isLoading ? 'loading' : 'loaded'}`}>
        <Nav/>
        <main>
            <Gallery category={'portrait'}/>
            <Footer/>
            <BackToTop/>
        </main>
      </div>
    </>
  )
}

export default PortraitPage