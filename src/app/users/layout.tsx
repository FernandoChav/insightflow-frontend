export default function UsersLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <div>
      <h1>Usuarios</h1>
      <div>{children}</div>
    </div>
  );
}