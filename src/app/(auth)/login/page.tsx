'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import '@/styles/login.css';

export default function LoginPage() {
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(username, password);
    } catch {
      setErro('Usuário ou senha inválidos');
    }finally {
      setLoading(false);
    }
  };


  return (
    <div className="login-container">
      <div className="login-card">
        <h2>🔐 Login</h2>

        <form onSubmit={submit}>
          <input
            placeholder="Usuário"
            value={username}
             disabled={loading}
            onChange={e => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
             disabled={loading}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            {loading ? 'Entrando...' : 'Entrar'}
            </button>
        </form>

        {erro && <div className="login-error">{erro}</div>}
      </div>
    </div>
  );
}
