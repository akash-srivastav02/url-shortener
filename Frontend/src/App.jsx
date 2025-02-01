import React from 'react'
import Hero from './components/Hero'
import Footer from './components/Footer'

function App() {
  return (
    <>
    <div className="min-h-screen flex flex-col bg-gray-900">
    <div className="flex-1">
    <Hero/>
    </div>
    <Footer/>
    </div>
    </>
  )
}

export default App