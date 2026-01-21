'use client';

import type { Filme } from '@/types/Filme';
import { useAuth } from '@/contexts/AuthContext';
import '@/styles/buttons.css';
import { FaPlus, FaEdit, FaTrash, FaArrowLeft, FaArrowRight } from 'react-icons/fa';


type Props = {
  dados: Filme[];
  aoEditar: (filme: Filme) => void;
  aoExcluir: (id: number) => Promise<void>;
};

const th = {
  padding: '10px',
  textAlign: 'left' as const,
  fontWeight: 600,
};

const td = {
  padding: '10px',
  fontSize: 14,
};


export default function TabelaFilmes({ dados, aoEditar, aoExcluir }: Props) {
  const { hasRole } = useAuth();
  const isAdmin = hasRole('ADMIN');

  if (dados.length === 0) {
    return <p>Nenhum filme cadastrado.</p>;
  }

  return (
    <table
  style={{
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: 12,
  }}
>
  <thead>
    <tr style={{ background: '#f1f5f9' }}>
      <th style={th}>Título</th>
      <th style={th}>Gênero</th>
      <th style={th}>Ano</th>
      <th style={th}>Nota</th>
      <th style={th}>Sinópse</th>
      {isAdmin && <th style={th}>Ações</th>}
    </tr>
  </thead>

  <tbody>
    {dados.map(filme => (
      <tr key={filme.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
        <td style={td}>{filme.titulo}</td>
        <td style={td}>{filme.genero}</td>
        <td style={td}>{filme.ano}</td>
        <td style={td}>{filme.nota}</td>
        <td style={td}>{filme.sinopse}</td>

        {isAdmin && (
          <td style={td}>
            <button className="btn btn-warn" onClick={() => aoEditar(filme)}>
              <FaEdit size={14}/>
              </button>
            <button
              className="btn btn-danger"
              onClick={() => filme.id && aoExcluir(filme.id)}
              style={{ marginLeft: 8 }}>
              <FaTrash size={14}/>
            </button>
          </td>
        )}
      </tr>
    ))}
  </tbody>
</table>

  );
}
