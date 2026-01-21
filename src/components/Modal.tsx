'use client';

import React from 'react';
import '@/styles/modal.css';

type Props = {
  aberto: boolean;
  titulo?: string;
  onFechar: () => void;
  children: React.ReactNode;
};

export default function Modal({ aberto, titulo, onFechar, children }: Props) {
  if (!aberto) return null;

  return (
    <div className="modal-backdrop" onClick={onFechar}>
      <div
        className="modal-container"
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3>{titulo}</h3>
          <button className="modal-close" onClick={onFechar}>
            ✕
          </button>
        </div>

        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
 