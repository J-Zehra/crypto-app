import React, { useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Coins } from './pages/Coins/Coins';
import { News } from './pages/News';
import { Navbar } from './components/Navbar';
import { theme } from './miscellaneous/theme';
import { MainPage } from './pages/MainPage';
import { CryptoDetails } from './pages/Coins/CryptoDetails';

export const App = () => {

  const [active, setActive] = useState(0);

  return (
    <ChakraProvider theme={theme}>
        <Router>
          <Navbar active={active} setActive={setActive}/>
          <Routes>
            <Route path='/' element={<MainPage setActive={setActive}/>}/>
            <Route path='/coins' element={<Coins setActive={setActive}/>}/>
            <Route path='/crypto-details/:id' element={<CryptoDetails/>}/>
            <Route path='/news' element={<News setActive={setActive}/>}/>
          </Routes>
        </Router>
    </ChakraProvider>
  )
}
