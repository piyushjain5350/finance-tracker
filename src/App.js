import React from 'react';
import './App.css';
import Header from './Component/Common/Header';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import { Route ,Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Footer from './Component/Common/Footer';


function App() {
  document.title="Financely"
  return (
    <div className="App bg-[var(--white)] h-full">
      <Header/>
      <Routes>
        <Route path='/' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='*' element={<SignUp/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
