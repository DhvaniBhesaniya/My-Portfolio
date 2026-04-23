import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import BlogPage from './components/BlogPage.jsx'
import './index.css'
import Lenis from 'lenis'

const lenis = new Lenis({
  duration: 0.95,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 0.9,
  touchMultiplier: 1,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// Make lenis available globally for anchor clicks
window.lenis = lenis

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blog" element={<BlogPage />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
)
