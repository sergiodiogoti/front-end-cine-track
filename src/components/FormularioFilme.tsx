'use client';

import { useEffect, useState } from 'react';
import type { Filme } from '@/types/Filme';
import '@/styles/formulario-filme.css';

type Props = {
  aoEnviar: (filme: Filme) => Promise<void>;
  editando: Filme | null;
};

const FILME_INICIAL: Filme = {
  titulo: '',
  genero: '',
  ano: new Date().getFullYear(),
  nota: 0,
  sinopse: '',
};

export default function FormularioFilme({ aoEnviar, editando }: Props) {
  const [form, setForm] = useState<Filme>(FILME_INICIAL);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (editando) {
      setForm(editando);
    } else {
      setForm(FILME_INICIAL);
    }
  }, [editando]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: name === 'ano' || name === 'nota'
        ? Number(value)
        : value,
    }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);

    try {
      await aoEnviar(form);
      setForm(FILME_INICIAL);
    } finally {
      setCarregando(false);
    }
  };

  return (
      <form onSubmit={submit}>
        <div className="form-campo">
          <label>Título</label>
          <input
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-campo">
          <label>Gênero</label>
          <input
            name="genero"
            value={form.genero}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-campo">
          <label>Ano</label>
          <input
            type="number"
            name="ano"
            value={form.ano}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-campo">
          <label>Nota</label>
          <input
            type="number"
            name="nota"
            min={0}
            max={10}
            value={form.nota}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-campo form-full">
          <label>Sinopse</label>
          <textarea
            name="sinopse"
            rows={3}
            value={form.sinopse ?? ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="submit" disabled={carregando}>
            {carregando
              ? 'Salvando...'
              : editando
                ? 'Atualizar'
                : 'Salvar'}
          </button>
        </div>
      </form>
  );
}
