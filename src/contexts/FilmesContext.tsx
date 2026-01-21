'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
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
  salvar: (filme: Filme) => Promise<void>;
  remover: (id: number) => Promise<void>;
  editar: (filme: Filme | null) => void;
  editando: Filme | null;

  page: number;
  totalPages: number;
  proximaPagina: () => void;
  paginaAnterior: () => void;

  termoBusca: string;
  setTermoBusca: (valor: string) => void;
  executarBusca: () => Promise<void>;
};

const FilmesContext = createContext<FilmesContextType | null>(null);

export function FilmesProvider({ children }: { children: React.ReactNode }) {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [editando, setEditando] = useState<Filme | null>(null);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [termoBusca, setTermoBusca] = useState('');
  const [emBusca, setEmBusca] = useState(false);


  const carregandoRef = useRef(false);

  const carregarLista = async (p: number) => {
    const response = await listarFilmesPaginado(p, 8);
    setFilmes(response.content);
    setTotalPages(response.totalPages);
  };


  const carregarBusca = async (p: number) => {
    const data = await listarFilmesSearch(termoBusca, p, 8);
    setFilmes(data);
    setTotalPages(1);
  };

  useEffect(() => {
    if (carregandoRef.current) return;

    carregandoRef.current = true;

    (async () => {
      if (emBusca) {
        await carregarBusca(page);
      } else {
        await carregarLista(page);
      }
      carregandoRef.current = false;
    })();
  }, [page]);


  const executarBusca = async () => {
    const ativo = !!termoBusca.trim();
    setEmBusca(ativo);
    setPage(0);

    if (ativo) {
      await carregarBusca(0);
    } else {
      await carregarLista(0);
    }
  };

  const salvar = async (filme: Filme) => {
    if (filme.id) {
      await atualizarFilme(filme.id, filme);
    } else {
      await criarFilme(filme);
    }

    if (emBusca) {
      await carregarBusca(page);
    } else {
      await carregarLista(page);
    }

    setEditando(null);
  };

  const remover = async (id: number) => {
    if (!confirm('Deseja remover este filme?')) return;

    await excluirFilme(id);

    if (emBusca) {
      await carregarBusca(page);
    } else {
      await carregarLista(page);
    }
  };

  const editar = (filme: Filme | null) => setEditando(filme);

  const proximaPagina = () => {
    setPage(p => p + 1);
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
