import DocumentEditor from "@/views/document/DocumentEditor";
import { getDocumentStaticParams } from "@/views/document/logic/documentPaths";

// Esta parte sigue igual (SOLID: delega a la lógica)
export async function generateStaticParams() {
  return await getDocumentStaticParams();
}

// CAMBIO AQUÍ: Definimos params como una Promesa
interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// CAMBIO AQUÍ: El componente es 'async' y desestructuramos con 'await'
export default async function DocumentPage({ params }: PageProps) {
  // Desempaquetamos la promesa antes de usar el ID
  const { id } = await params;

  return <DocumentEditor documentId={id} />;
}
