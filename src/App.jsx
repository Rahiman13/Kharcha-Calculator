import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'animate.css';

import Home from "./components/Home";
import Form from './components/login_forms/form';
import Statistics from './components/statistics/statistics';
import Landing from './components/Landing_page';
import Admin from './components/Admin/admin';
import Users from './components/Admin/Users';
import Expenses from './components/Admin/Expenses';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Form />} />
          <Route path="/home" element={<Home />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/admin-dashboard" element={<Admin />} />
          <Route path="/users" element={<Users />} />
          <Route path="/expenses" element={<Expenses />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
