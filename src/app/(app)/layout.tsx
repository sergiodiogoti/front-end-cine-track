'use client';

import { useAuth } from '@/contexts/AuthContext';
import '@/styles/app.css';
import '@/styles/buttons.css';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout } = useAuth();

  return (
    <>
      <nav
        style={{
          height: 60,
          background: 'linear-gradient(90deg, #2563eb, #2563eb)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
        }}
      >
        <strong style={{ fontSize: 25, fontWeight: 'bold' }}>🎬 CineTrack</strong>

        <div style={{ display: 'flex', gap: 16 }}>


<button
  onClick={logout} 
  className="btn btn-danger"
>
  Logout
</button>                      
        </div>
      </nav>

      <div className="app-container">{children}</div>
    </>
  );
}
