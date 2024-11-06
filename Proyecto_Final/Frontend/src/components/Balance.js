import React, { useState, useEffect } from 'react';

function AccountBalance() {
  const [saldo, setSaldo] = useState(null); // Estado para el saldo de la cuenta
  const [error, setError] = useState(null); // Estado para manejar errores de conexión

  useEffect(() => {
    
    const token = localStorage.getItem('jwtToken');
    const clienteId = localStorage.getItem('clienteId'); 

    if (!token || !clienteId) {
      setError('No se encontró un token de autenticación o ID de cliente. Inicia sesión nuevamente.');
      return;
    }

    // Construye la URL del WebSocket con el token
    const socketUrl = `ws://localhost:8080/ws/balance?token=${token}`;

    // Crea una nueva conexión WebSocket
    const socket = new WebSocket(socketUrl);

    // Evento de conexión establecida
    socket.onopen = () => {
      console.log('Conexión WebSocket establecida');

      // Envía el clienteId al WebSocket para solicitar el saldo de la cuenta
      socket.send(JSON.stringify({ action: 'getBalance', cuenta_cliente_id: clienteId }));
    };

    // Evento de recepción de mensajes
    socket.onmessage = (event) => {
        try {
          const data = event.data.startsWith('{') ? JSON.parse(event.data) : { saldo: parseFloat(event.data.replace('Saldo actual: ', '')) };
          
          if (data.saldo !== undefined) {
            setSaldo(data.saldo); // Actualiza el saldo con los datos recibidos
          }
        } catch (error) {
          console.error('Error al analizar el mensaje de WebSocket:', error);
        }
    };

    // Evento de error de conexión
    socket.onerror = (error) => {
      console.error('Error en la conexión WebSocket:', error);
      setError('No se pudo conectar al servicio de saldo en tiempo real.');
    };

    // Evento de cierre de conexión
    socket.onclose = () => {
      console.log('Conexión WebSocket cerrada');
    };

    // Cierra la conexión cuando el componente se desmonte
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="account-balance-container">
      <h2>Saldo de la Cuenta</h2>
      {error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : saldo !== null ? (
        <div style={{ fontSize: '1.5em', color: 'green' }}>
          Saldo actual: ${saldo}
        </div>
      ) : (
        <div>Cargando saldo...</div>
      )}
    </div>
  );
}

export default AccountBalance;
