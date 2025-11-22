import React, { useEffect, useRef } from "react";
import { Block } from "@/types/documents";

interface Props {
  block: Block;

  onUpdate: (data: Record<string, unknown>) => void;
  onDelete: () => void;
}

export const BlockEditor = ({ block, onUpdate, onDelete }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-ajuste de altura para el textarea (UX de escritura fluida)
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [block.data.text]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onUpdate({ text: e.target.value });
  };

  // Renderizado condicional según el tipo
  switch (block.type) {
    case "h1":
      return (
        <div className="group relative flex items-center">
          <input
            value={block.data.text as string}
            onChange={handleChange}
            placeholder="Título 1"
            className="text-3xl font-bold text-gray-900 mt-6 mb-4 w-full bg-transparent border-none focus:outline-none placeholder:text-gray-300"
          />
          <DeleteBtn onClick={onDelete} />
        </div>
      );

    case "h2":
      return (
        <div className="group relative flex items-center">
          <input
            value={block.data.text as string}
            onChange={handleChange}
            placeholder="Título 2"
            className="text-2xl font-semibold text-gray-800 mt-5 mb-3 w-full bg-transparent border-none focus:outline-none placeholder:text-gray-300 border-b pb-1"
          />
          <DeleteBtn onClick={onDelete} />
        </div>
      );

    case "paragraph":
      return (
        <div className="group relative flex items-start">
          <textarea
            ref={textareaRef}
            value={block.data.text as string}
            onChange={handleChange}
            placeholder="Escribe algo..."
            className="text-gray-700 leading-relaxed mb-2 w-full bg-transparent border-none focus:outline-none resize-none overflow-hidden placeholder:text-gray-300"
            rows={1}
          />
          <DeleteBtn onClick={onDelete} />
        </div>
      );

    case "todo":
      return (
        <div className="group relative flex items-center gap-3 my-1">
          <input
            type="checkbox"
            checked={block.data.checked as boolean}
            onChange={(e) => onUpdate({ checked: e.target.checked })}
            className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
          />
          <input
            value={block.data.text as string}
            onChange={handleChange}
            className={`flex-1 bg-transparent border-none focus:outline-none ${
              block.data.checked
                ? "text-gray-400 line-through"
                : "text-gray-700"
            }`}
            placeholder="Tarea por hacer"
          />
          <DeleteBtn onClick={onDelete} />
        </div>
      );

    default:
      return <div className="text-red-400">Bloque no soportado</div>;
  }
};

// Botón de basura pequeñito que solo aparece al pasar el mouse
const DeleteBtn = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="opacity-0 group-hover:opacity-100 ml-2 text-gray-300 hover:text-red-500 transition-all p-1 rounded hover:bg-red-50"
    title="Eliminar bloque"
  >
    ✕
  </button>
);
