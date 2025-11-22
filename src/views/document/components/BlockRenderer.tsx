import React from "react";
import { Block } from "@/types/documents";

interface Props {
  block: Block;
}

export const BlockRenderer = ({ block }: Props) => {
  // Extraemos el texto de forma segura (por si viene undefined)
  const text = (block.data?.text as string) || "";
  const checked = (block.data?.checked as boolean) || false;

  switch (block.type) {
    case "h1":
      return (
        <h1 className="text-3xl font-bold text-gray-900 mt-6 mb-4">{text}</h1>
      );

    case "h2":
      return (
        <h2 className="text-2xl font-semibold text-gray-800 mt-5 mb-3 border-b pb-1">
          {text}
        </h2>
      );

    case "h3":
      return (
        <h3 className="text-xl font-medium text-gray-800 mt-4 mb-2">{text}</h3>
      );

    case "paragraph":
    case "text": // Algunos seeders pueden tener 'text' o 'paragraph'
      return (
        <p className="text-gray-700 leading-relaxed mb-3 min-h-6">{text}</p>
      );

    case "todo":
      return (
        <div className="flex items-start gap-3 my-2 group">
          <div
            className={`mt-1 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
              checked
                ? "bg-blue-500 border-blue-500 text-white"
                : "border-gray-300 hover:bg-gray-50"
            }`}
          >
            {checked && (
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>
          <span
            className={`${
              checked ? "text-gray-400 line-through" : "text-gray-700"
            }`}
          >
            {text}
          </span>
        </div>
      );

    case "bullet-list":
      return (
        <li className="flex gap-2 items-start mb-2 ml-4">
          <span className="text-gray-400 mt-1.5">•</span>
          <span className="text-gray-700">{text}</span>
        </li>
      );

    default:
      return (
        <div className="text-red-400 text-xs bg-red-50 p-2 rounded">
          Bloque desconocido: {block.type}
        </div>
      );
  }
};
