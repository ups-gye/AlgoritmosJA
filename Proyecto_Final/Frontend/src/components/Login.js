import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';

const API_URL = "http://localhost:8080/api/auth/login"; // URL de login

function Login() {
  const [usuario_name, setEmail] = useState('');
  const [usuario_password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario_name, usuario_password }),
      });
      
      if (response.ok) {
        const { token, usuarioId, clienteId, usuarioName } = await response.json();

        // Guarda los datos en localStorage
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('usuarioId', usuarioId);
        localStorage.setItem('clienteId', clienteId);
        localStorage.setItem('usuarioName', usuarioName);

        // Redirige a la página deseada
        navigate('/dashboard');
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Hubo un problema con el servidor. Intenta nuevamente.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="image-container"> 
            <img
                src="/images/logo.jpg"
                alt="Logo"
                style={{
                    top: '10px',
                    left: '5px',
                    height: '20%',
                    width: '50%',
                    borderRadius: '100%'
                }}
            />
        </div>  
        <div>
          <label>Usuario:</label>
          <input
            type="text"
            value={usuario_name}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={usuario_password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
    </div>
  );
}

export default Login;
