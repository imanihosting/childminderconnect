import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/home/Hero'
import SubscriptionTeaser from './components/home/SubscriptionTeaser'
import KeyFeatures from './components/home/KeyFeatures'
import Testimonials from './components/home/Testimonials'
import Footer from './components/Footer'
import About from './pages/About'
import FindChildminders from './pages/find/FindChildminders'

const Home = () => {
  return (
    <>
      <Hero />
      <SubscriptionTeaser />
      <KeyFeatures />
      <Testimonials />
    </>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/find" element={<FindChildminders />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App