import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Dashboard.css';

function Dashboard() {
  const [saldo, setSaldo] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSaldo();
  }, []);

  const clienteName = localStorage.getItem('usuarioName');

  const fetchSaldo = () => {
    setError(null);
    const token = localStorage.getItem('jwtToken');
    const clienteId = localStorage.getItem('clienteId'); 

    if (!token || !clienteId) {
      setError('No se encontró un token de autenticación o ID de cliente. Inicia sesión nuevamente.');
      return;
    }


    const socketUrl = `ws://localhost:8080/ws/balance?token=${token}`;
    const socket = new WebSocket(socketUrl);

    socket.onopen = () => {
      socket.send(JSON.stringify({ action: 'getBalance', cuenta_cliente_id: clienteId}));
    };

    socket.onmessage = (event) => {
      try {
        const data = event.data.startsWith('{') ? JSON.parse(event.data) : { saldo: parseFloat(event.data.replace('Saldo actual: ', '')) };
        if (data.saldo !== undefined) {
          setSaldo(data.saldo);
        }
      } catch (error) {
        console.error('Error al analizar el mensaje de WebSocket:', error);
      }
    };

    socket.onerror = (error) => {
      console.error('Error en la conexión WebSocket:', error);
      setError('No se pudo conectar al servicio de saldo en tiempo real.');
    };

    socket.onclose = () => {
      console.log('Conexión WebSocket cerrada');
    };

    return () => {
      socket.close();
    };
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    navigate('/');
  };

  const handleTransactionClick = () => {
    navigate('/transaccion');
  };

  return (
    <div className="dashboard-container">
      <h2>Bienvenido <strong>{clienteName}</strong> a tu Banca Web</h2>
      <div className="balance-card">
        <h3>Saldo de la Cuenta</h3>
        {error ? (
          <div className="error-message">{error}</div>
        ) : saldo !== null ? (
          <div className="balance-amount">${saldo}</div>
        ) : (
          <div>Cargando saldo...</div>
        )}
      </div>
      <div className="buttons-container">
        <button onClick={fetchSaldo} className="button refresh-button">Ver Saldo</button>
        <button onClick={handleTransactionClick} className="button transaction-button">Realizar Transacción</button>
        <button onClick={handleLogout} className="button logout-button">Logout</button>
      </div>
    </div>
  );
}

export default Dashboard;
