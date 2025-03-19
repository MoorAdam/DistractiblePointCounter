import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import './App.css'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Boards from "./pages/Boards.js"

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Boards/>}/>
    </Routes>
  </BrowserRouter>
)
