import React from 'react';
import Login from '../components/Login';      // Importa el componente de Login

function LoginPage() {
  return (
    <div>
      <div className="login-page-container">
        <Login />  {/* Componente de Login */}
      </div>
    </div>
  );
}

export default LoginPage;