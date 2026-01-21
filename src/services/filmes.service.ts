import { api } from './api';
import type { Filme } from '../types/Filme';
import type { PageResponse } from '@/types/PageResponse';

export const listarFilmesPaginado = async (
  page: number = 0,
  size: number = 10
): Promise<PageResponse<Filme>> => {
  const { data } = await api.get<PageResponse<Filme>>('/api/filmes', {
    params: { page, size },
  });

  return data;
};

export const listarFilmes = async (): Promise<Filme[]> => {
  const { data } = await api.get<Filme[]>('/api/filmes');
  return data;
};

export const listarFilmesPorId = async (id: number): Promise<Filme> => {
  const { data } = await api.get<Filme>(`/api/filmes/${id}`);
  return data;
};

export const listarFilmesSearch = async (
  texto: string,
  page = 0,
  size = 8
) => {
  const { data } = await api.get('/api/filmes/search', {
    params: { texto, page, size },
  });

  return data;
};


export const criarFilme = async (filme: Filme): Promise<Filme> => {
  const { data } = await api.post<Filme>('/api/filmes', filme);
  return data;
};

export const atualizarFilme = async (
  id: number,
  filme: Filme
): Promise<Filme> => {
  const { data } = await api.put<Filme>(`/api/filmes/${id}`, filme);
  return data;
};

export const excluirFilme = async (id: number): Promise<void> => {
  await api.delete(`/api/filmes/${id}`);
};
