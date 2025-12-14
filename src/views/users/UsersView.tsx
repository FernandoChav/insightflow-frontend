"use client";
import { useUsers } from "./hooks/useUsers";
import { User } from "@/types/users";
import { useState } from "react";

const UsersView = () => {
    const { users, loading, error, addUser, editUser, removeUser } = useUsers();
    const [newUser, setNewUser] = useState({ fullName: '', email: '', username: '', birthDate: '', address: '', phoneNumber: '' });
    const [editingUser, setEditingUser] = useState<User | null>(null);

    if (loading) return <div className="p-6">Loading users...</div>;
    if (error) return <div className="p-6">Error: {error}</div>;

    const handleAddUser = () => {
        if (newUser.fullName && newUser.email && newUser.username) {
            addUser({ ...newUser, status: 'active' });
            setNewUser({ fullName: '', email: '', username: '', birthDate: '', address: '', phoneNumber: '' });
        }
    };

    const handleEditUser = () => {
        if (editingUser) {
            editUser(editingUser.id, {
                fullName: editingUser.fullName,
                email: editingUser.email,
                username: editingUser.username,
                birthDate: editingUser.birthDate,
                address: editingUser.address,
                phoneNumber: editingUser.phoneNumber
            });
            setEditingUser(null);
        }
    };

    return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Usuarios</h1>
      
      {/* Formulario para agregar usuario */}
      <div className="mb-4 p-4 bg-white border rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Agregar Usuario</h2>
        <input className="border p-2 mr-2" placeholder="Nombre completo" value={newUser.fullName} onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })} />
        <input className="border p-2 mr-2" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
        <input className="border p-2 mr-2" placeholder="Username" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} />
        <input className="border p-2 mr-2" placeholder="Fecha nacimiento (YYYY-MM-DD)" value={newUser.birthDate} onChange={(e) => setNewUser({ ...newUser, birthDate: e.target.value })} />
        <input className="border p-2 mr-2" placeholder="Dirección" value={newUser.address} onChange={(e) => setNewUser({ ...newUser, address: e.target.value })} />
        <input className="border p-2 mr-2" placeholder="Teléfono" value={newUser.phoneNumber} onChange={(e) => setNewUser({ ...newUser, phoneNumber: e.target.value })} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleAddUser}>
          Agregar
        </button>
      </div>

      {/* Formulario para editar usuario */}
      {editingUser && (
        <div className="mb-4 p-4 bg-yellow-100 border rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Editar Usuario</h2>
          <input className="border p-2 mr-2" placeholder="Nombre completo" value={editingUser.fullName} onChange={(e) => setEditingUser({ ...editingUser, fullName: e.target.value })} />
          <input className="border p-2 mr-2" placeholder="Email" value={editingUser.email} onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} />
          <input className="border p-2 mr-2" placeholder="Username" value={editingUser.username} onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })} />
          <input className="border p-2 mr-2" placeholder="Fecha nacimiento (YYYY-MM-DD)" value={editingUser.birthDate} onChange={(e) => setEditingUser({ ...editingUser, birthDate: e.target.value })} />
          <input className="border p-2 mr-2" placeholder="Dirección" value={editingUser.address} onChange={(e) => setEditingUser({ ...editingUser, address: e.target.value })} />
          <input className="border p-2 mr-2" placeholder="Teléfono" value={editingUser.phoneNumber} onChange={(e) => setEditingUser({ ...editingUser, phoneNumber: e.target.value })} />
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2" onClick={handleEditUser}>
            Guardar
          </button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={() => setEditingUser(null)}>
            Cancelar
          </button>
        </div>
      )}

      <ul className="mt-4 space-y-2">
        {users.map((user: User) => (
          <li key={user.id} className="flex items-center justify-between bg-gray-100 p-4 rounded">
            <span>{user.fullName} - {user.email} - {user.status}</span>
            <div>
              <button className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 ml-2" onClick={() => setEditingUser(user)}>Editar</button> {' '}
              <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" onClick={() => removeUser(user.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default UsersView;
