import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route, Link  } from 'react-router-dom'
import BusBoard from './BusBoard.tsx'
import History from './History.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<BusBoard />}/>
      <Route path="/History" element={<History />}/>
    </Routes>`
    </BrowserRouter>
  </StrictMode>,
)
