import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import './App.css'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Boards from "./pages/Boards.js";
import Episodes from "./pages/Episodes.js";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Episodes/>}/>
      <Route path='/episode' element={<Boards/>}/>
    </Routes>
  </BrowserRouter>
)
