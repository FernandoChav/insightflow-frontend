import React from "react";

const COMMON_EMOJIS = [
  "📄",
  "📝",
  "🚀",
  "💡",
  "✅",
  "📅",
  "📊",
  "🔥",
  "⭐",
  "📁",
  "👋",
  "🎉",
  "💻",
  "🎨",
  "🛠️",
  "🧠",
];

interface Props {
  currentIcon: string;
  onChange: (icon: string) => void;
}

export const EmojiSelector = ({ currentIcon, onChange }: Props) => {
  return (
    <div className="relative group inline-block">
      <button className="text-7xl hover:bg-gray-100 rounded-xl p-2 transition-colors cursor-pointer">
        {currentIcon || "📄"}
      </button>

      {/* Menú desplegable al hacer hover */}
      <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 shadow-xl rounded-xl p-3 grid grid-cols-4 gap-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        {COMMON_EMOJIS.map((emoji) => (
          <button
            key={emoji}
            onClick={() => onChange(emoji)}
            className="text-2xl hover:bg-gray-100 p-2 rounded hover:scale-110 transition-transform"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};
