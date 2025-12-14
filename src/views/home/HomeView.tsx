"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function HomeView() {
  const { user, login, logout, error, loading } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [showLogin, setShowLogin] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(form.username, form.password);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white flex flex-col">
      {/* Navbar Simple */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <span>⚡</span> InsightFlow
        </div>
        <div className="text-sm text-gray-500">Taller de Arquitectura</div>
        <div>
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-700">Usuario: {user.username}</span>
              <span className="text-xs bg-gray-200 px-2 py-1 rounded font-mono">ID: {user.id}</span>
              <button className="ml-2 px-2 py-1 text-xs bg-gray-300 rounded hover:bg-gray-400" onClick={logout}>Cerrar sesión</button>
            </div>
          ) : (
            <button className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => setShowLogin((v) => !v)}>
              Iniciar sesión
            </button>
          )}
        </div>
      </nav>

      {/* Hero Section (Centro) */}
      <main className="grow flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-3xl space-y-8">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
            Organiza tu conocimiento <br />
            <span className="text-blue-600">sin límites.</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            La plataforma moderna para gestionar documentos, tareas y equipos.
            Diseñada con microservicios y desplegada en la nube.
          </p>

          {showLogin && !user && (
            <form onSubmit={handleSubmit} className="bg-white border rounded shadow p-6 max-w-sm mx-auto flex flex-col gap-3 items-center">
              <input
                className="border p-2 w-full"
                placeholder="Nombre de usuario"
                value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
                required
              />
              <input
                className="border p-2 w-full"
                type="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded w-full" type="submit" disabled={loading}>
                {loading ? "Ingresando..." : "Iniciar sesión"}
              </button>
              {error && <div className="text-red-600 text-xs mt-2">{error}</div>}
            </form>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Link
              href="/workspace"
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-full text-lg shadow-lg hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
            >
              Ir a Mis Espacios →
            </Link>

            <a
              href="https://github.com/FernandoChav/insightflow-frontend"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-full text-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Ver Código
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} InsightFlow - Universidad Católica del Norte
      </footer>
    </div>
  );
}
