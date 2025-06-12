import React from 'react'
import './StreetPage.scss'
import Gallery  from '../../components/Gallery/Gallery'
import Nav from '../../components/Nav/Nav'
function StreetPage() {
  return (
    <div>StreetPage
        <Nav/>
        <Gallery category={'street'}/>
        
    </div>
  )
}

export default StreetPage