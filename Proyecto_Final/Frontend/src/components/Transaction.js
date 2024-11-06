import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import '../css/Transaction.css';

function Transaction() {
  const [cuentaOrigen, setCuentaOrigen] = useState('');
  const [cuentaDestino, setCuentaDestino] = useState('');
  const [valor, setValor] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Define el hook para la navegación

  const handleBack = () => {
    navigate('/dashboard'); // Navega a la ruta /dashboard
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('jwtToken');

    try {
      const response = await fetch('http://localhost:8080/api/transaccion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          cuentaOrigen,
          cuentaDestino,
          valor,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Transacción exitosa:', data);
        setSuccessMessage('Operación exitosa');
        setError(null);
        setCuentaOrigen('');
        setCuentaDestino('');
        setValor('');
      } else {
        const errorText = await response.text();
        console.error('Error en la respuesta del servidor:', errorText);
        setError(errorText);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Hubo un problema con el servidor. Intenta nuevamente.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="transaction-container">
      <form className="transaction-form" onSubmit={handleSubmit}>
        <h2>Realizar Transacción</h2>
        <div>
          <label>Código Cuenta Origen:</label>
          <input
            type="text"
            value={cuentaOrigen}
            onChange={(e) => setCuentaOrigen(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Código Cuenta Destino:</label>
          <input
            type="text"
            value={cuentaDestino}
            onChange={(e) => setCuentaDestino(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Valor:</label>
          <input
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
          />
        </div>
        <button type="submit">Realizar Transacción</button>
        <button onClick={handleBack} className="back-button">Atrás</button>
      </form>
      {successMessage && <div style={{ color: 'green', marginTop: '10px' }}>{successMessage}</div>}
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
    </div>
  );
}

export default Transaction;
