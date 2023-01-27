import { HashRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import { useState } from 'react';
import { JwtProvider } from "./contexts/JwtContext";

function App() {
  return (
    <>
      <HashRouter pathname='/blog-writer'>
        <JwtProvider>
          <Routes>
            <Route path='/' element={<HomePage />} />
          </Routes>
        </JwtProvider>
      </HashRouter>
    </>
  );
}

export default App;
