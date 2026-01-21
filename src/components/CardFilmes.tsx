'use client';

import type { Filme } from '@/types/Filme';
import '@/styles/cards-filmes.css';

type Props = {
  dados: Filme[];
};

export default function CardFilmes({ dados }: Props) {
  if (dados.length === 0) {
    return <p>Nenhum filme encontrado.</p>;
  }

  return (
    <div className="cards-grid">
      {dados.map(filme => (
        <div key={filme.id} className="card-filme">
          <div className="card-header">
            <h4>{filme.titulo}</h4>
            <span className="nota">⭐ {filme.nota}</span>
          </div>

          <div className="card-body">
            <p><strong>Gênero:</strong> {filme.genero}</p>
            <p><strong>Ano:</strong> {filme.ano}</p>

            {filme.sinopse && (
              <p className="sinopse">{filme.sinopse}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
