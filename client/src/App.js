import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import Room from './components/Room';
import TaC from './components/TAC';

function App() {
  return (
    <div className="bg-[#FF5D5D] w-full min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/room" element={<Room />}/>
          <Route exact path="/tnc" element={<TaC />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
