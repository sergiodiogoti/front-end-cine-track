'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import type { Filme } from '../types/Filme';
import {
  listarFilmesPaginado,
  criarFilme,
  atualizarFilme,
  excluirFilme,
  listarFilmesSearch,
} from '../services/filmes.service';

type FilmesContextType = {
  filmes: Filme[];

  // CRUD
  salvar: (filme: Filme) => Promise<void>;
  remover: (id: number) => Promise<void>;
  editar: (filme: Filme | null) => void;
  editando: Filme | null;

  // Paginação
  page: number;
  totalPages: number;
  proximaPagina: () => void;
  paginaAnterior: () => void;

  // Busca
  termoBusca: string;
  setTermoBusca: (valor: string) => void;
  executarBusca: () => Promise<void>;
};

const FilmesContext = createContext<FilmesContextType | null>(null);

export function FilmesProvider({ children }: { children: React.ReactNode }) {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [editando, setEditando] = useState<Filme | null>(null);

  // Paginação
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Busca
  const [termoBusca, setTermoBusca] = useState('');

  const buscarPagina = async (p: number) => {

    if (termoBusca.trim()) {
      const data = await listarFilmesSearch(termoBusca, p, 8);

      setFilmes(data);

      setTotalPages(1);
      return;
    }

    const response = await listarFilmesPaginado(p, 8);
    setFilmes(response.content);
    setTotalPages(response.totalPages);
  };

  useEffect(() => {
    let ativo = true;

    (async () => {
      if (!ativo) return;
      await buscarPagina(page);
    })();

    return () => {
      ativo = false;
    };
  }, [page, termoBusca]);


  const executarBusca = async () => {
    setPage(0);
    await buscarPagina(0);
  };

  const salvar = async (filme: Filme) => {
    if (filme.id) {
      await atualizarFilme(filme.id, filme);
    } else {
      await criarFilme(filme);
    }

    await buscarPagina(page);
    setEditando(null);
  };

  const remover = async (id: number) => {
    if (!confirm('Deseja remover este filme?')) return;

    await excluirFilme(id);
    await buscarPagina(page);
  };

  const editar = (filme: Filme | null) => {
    setEditando(filme);
  };

  const proximaPagina = () => {
    setPage(p => (p + 1 < totalPages ? p + 1 : p));
  };

  const paginaAnterior = () => {
    setPage(p => (p > 0 ? p - 1 : p));
  };

  return (
    <FilmesContext.Provider
      value={{
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
      }}
    >
      {children}
    </FilmesContext.Provider>
  );
}

export function useFilmes() {
  const ctx = useContext(FilmesContext);
  if (!ctx) {
    throw new Error('useFilmes deve estar dentro do FilmesProvider');
  }
  return ctx;
}
