import React, { useState } from 'react';
import '../css/Transaction.css';

function Transaction() {
  const [cuentaOrigen, setCuentaOrigen] = useState('');
  const [cuentaDestino, setCuentaDestino] = useState('');
  const [valor, setValor] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Estado para el mensaje de éxito
  const [error, setError] = useState(null); // Estado para manejar errores

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
        try {
          const data = await response.json();
          console.log('Transacción exitosa:', data);
          setSuccessMessage('Operación exitosa'); // Muestra el mensaje de éxito
          setError(null); // Limpia cualquier error anterior
          // Opcionalmente, limpia los campos del formulario
          setCuentaOrigen('');
          setCuentaDestino('');
          setValor('');
        } catch (jsonError) {
          console.error('La respuesta no es JSON válido:', jsonError);
        }
      } else {
        const errorText = await response.text();
        console.error('Error en la respuesta del servidor:', errorText);
        setError(errorText); // Muestra el error al usuario
        setSuccessMessage(''); // Limpia el mensaje de éxito
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Hubo un problema con el servidor. Intenta nuevamente.');
      setSuccessMessage(''); // Limpia el mensaje de éxito
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
      </form>
      {successMessage && <div style={{ color: 'green', marginTop: '10px' }}>{successMessage}</div>} {/* Mensaje de éxito */}
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>} {/* Mensaje de error */}
    </div>
  );
}

export default Transaction;
