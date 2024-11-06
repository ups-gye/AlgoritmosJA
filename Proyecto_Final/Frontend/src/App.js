import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './components/Dashboard';
import Transaction from './components/Transaction';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transaccion" element={<Transaction />} /> {/* Verifica esta ruta */}
      </Routes>
    </Router>
  );
}

export default App;
