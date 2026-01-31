'use client';

import { useState } from 'react';
import { FilmesProvider, useFilmes } from '@/contexts/FilmesContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import TabelaFilmes from '@/components/TabelaFilmes';
import FormularioFilme from '@/components/FormularioFilme';
import Modal from '@/components/Modal';
import type { Filme } from '@/types/Filme';
import '@/styles/buttons.css';
import CardFilmes from '@/components/CardFilmes';
import { useAuth } from '@/contexts/AuthContext';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';

function Conteudo() {
  const {
    filmes,
    salvar,
    remover,
    editar,
    editando,
    page,
    totalPages,
    proximaPagina,
    paginaAnterior,
    termoBusca,
    setTermoBusca,
    executarBusca,
    limparBusca, 
  } = useFilmes();

  const [modalAberto, setModalAberto] = useState(false);
  const { hasRole, loading } = useAuth();

  if (loading) return null;

  const isAdmin = hasRole('ADMIN');

  const abrirEdicao = (filme: Filme) => {
    editar(filme);
    setModalAberto(true);
  };

  const abrirNovo = () => {
    editar(null);
    setModalAberto(true);
  };

  const buscar = async () => {
    if (!termoBusca.trim()) {
      limparBusca();
      return;
    }
    await executarBusca();
  };

  return (
    <>
      <div className="app-card">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <h2>🎬 Filmes</h2>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Buscar por título, gênero ou sinopse"
              value={termoBusca}
              onChange={e => setTermoBusca(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && buscar()}
              style={{
                height: 40,
                padding: '0 12px',
                borderRadius: 6,
                border: '1px solid #ccc',
                minWidth: 280,
              }}
            />

            <button
              className="btn"
              style={{ height: 40 }}
              onClick={buscar}
              title="Buscar no Elasticsearch"
            >
              <HiOutlineMagnifyingGlass size={18} />
            </button>
          </div>

          {isAdmin && (
            <button
              style={{ height: 40 }}
              onClick={abrirNovo}
              className="btn btn-action"
            >
              + Novo Filme
            </button>
          )}
        </div>

        {isAdmin ? (
          <TabelaFilmes
            dados={filmes}
            aoEditar={abrirEdicao}
            aoExcluir={remover}
          />
        ) : (
          <CardFilmes dados={filmes} />
        )}

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 16,
          }}
        >
          <button
            className="btn"
            disabled={page === 0}
            onClick={paginaAnterior}
          >
            Anterior
          </button>

          <span>
            Página {page + 1} de {totalPages}
          </span>

          <button
            className="btn"
            disabled={page + 1 >= totalPages}
            onClick={proximaPagina}
          >
            Próxima
          </button>
        </div>
      </div>

      <Modal
        aberto={modalAberto}
        titulo={editando ? 'Editar Filme' : 'Cadastrar Filme'}
        onFechar={() => {
          setModalAberto(false);
          editar(null);
        }}
      >
        <FormularioFilme
          aoEnviar={async filme => {
            await salvar(filme);
            setModalAberto(false);
            editar(null);
          }}
          editando={editando}
        />
      </Modal>
    </>
  );
}

export default function PaginaFilmes() {
  return (
    <ProtectedRoute>
      <FilmesProvider>
        <Conteudo />
      </FilmesProvider>
    </ProtectedRoute>
  );
}
