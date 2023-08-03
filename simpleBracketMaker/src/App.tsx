import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavigationBar from "./NavigationBar";
import HomePage from "./HomePage";
import PlayerPage from "./PlayerPage";

function App() {
  return (
    <>
      <NavigationBar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/players" element={<PlayerPage/>}/>
      </Routes>
    </>
  )
}

export default App;