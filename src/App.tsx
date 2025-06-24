import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import NewSale from './pages/NewSale';
import CreditManagement from './pages/CreditManagement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/new-sale" element={<NewSale />} />
        <Route path="/credit-management" element={<CreditManagement />} />
      </Routes>
    </Router>
  );
}

export default App;

