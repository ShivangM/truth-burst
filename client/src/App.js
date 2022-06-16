import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import Room from './components/Room';

function App() {
  return (
    <div className="bg-[#FFE3A9] h-screen w-screen">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/room" element={<Room/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
