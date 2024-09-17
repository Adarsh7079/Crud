
import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Submit from './components/Submit';
import User from './components/User';
import axios from 'axios'
const App = () => {
  
  return (
   <div>
        <Routes>
          <Route path="/" element={<Submit/>}/>
          <Route path="/all" element={<User/>}/>
      
        
      </Routes>
   </div>
  )
}

export default App