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
  limparBusca: () => Promise<void>;
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

  //LISTAGEM NORMAL (MYSQL)
  const carregarLista = async (p: number) => {
    const response = await listarFilmesPaginado(p, 8);
    setFilmes(response.content);
    setTotalPages(response.totalPages);
  };

  //BUSCA (ELASTICSEARCH)
  const carregarBusca = async () => {
    const data = await listarFilmesSearch(termoBusca);
    setFilmes(data);
    setTotalPages(1); // busca não pagina (por enquanto)
  };

  //CONTROLE CENTRAL DE CARREGAMENTO
  useEffect(() => {
    if (carregandoRef.current) return;

    carregandoRef.current = true;

    (async () => {
      if (emBusca) {
        await carregarBusca();
      } else {
        await carregarLista(page);
      }
      carregandoRef.current = false;
    })();
  }, [page, emBusca]);

  const executarBusca = async () => {
    const ativo = !!termoBusca.trim();

    if (!ativo) {
      await limparBusca();
      return;
    }

    setEmBusca(true);
    setPage(0);
    await carregarBusca();
  };

  //LIMPA BUSCA E VOLTA PARA MYSQL
  const limparBusca = async () => {
    setEmBusca(false);
    setTermoBusca('');
    setPage(0);
    await carregarLista(0);
  };

  //SALVAR (MYSQL + REINDEXAÇÃO AUTOMÁTICA NO BACKEND)
  const salvar = async (filme: Filme) => {
    if (filme.id) {
      await atualizarFilme(filme.id, filme);
    } else {
      await criarFilme(filme);
    }

    if (emBusca) {
      await carregarBusca();
    } else {
      await carregarLista(page);
    }

    setEditando(null);
  };

  // REMOVER
  const remover = async (id: number) => {
    if (!confirm('Deseja remover este filme?')) return;

    await excluirFilme(id);

    if (emBusca) {
      await carregarBusca();
    } else {
      await carregarLista(page);
    }
  };

  const editar = (filme: Filme | null) => setEditando(filme);

  const proximaPagina = () => {
    if (!emBusca) setPage(p => p + 1);
  };

  const paginaAnterior = () => {
    if (!emBusca) setPage(p => (p > 0 ? p - 1 : p));
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
        limparBusca,
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
