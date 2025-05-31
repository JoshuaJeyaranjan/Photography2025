import React from 'react'
import './PortraitPage.scss'
import Gallery from '../../components/Gallery/Gallery'
import Nav from '../../components/Nav/Nav'


function PortraitPage() {
  return (
    <div>PortraitPage
        <Nav/>
        <Gallery category={'portrait'}/>
    </div>
  )
}

export default PortraitPage