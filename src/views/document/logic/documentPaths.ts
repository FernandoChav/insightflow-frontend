import { documentsService } from "@/services/api/documents";

/**
 * USE CASE: Obtener IDs para generación estática.
 * Responsabilidad: Orquestar la obtención de datos y adaptarlos al formato que Next.js necesita.
 * Cumple SRP: Solo se encarga de la lógica de "qué rutas generar".
 */
export async function getDocumentStaticParams() {
  const FALLBACK_PARAMS = [{ id: "doc-seed-001" }];

  try {
    // Aquí podrías incluso inyectar el workspaceId si quisieras hacerlo más dinámico
    const response = await documentsService.getByWorkspace("ws-seed-001");

    if (response.success && response.data.length > 0) {
      // Adaptamos la respuesta del dominio (Document) al formato de infraestructura (Next.js Params)
      return response.data.map((doc) => ({
        id: doc.id,
      }));
    }
  } catch {
    console.warn("Failed to fetch dynamic paths during build. Using fallback.");
  }

  return FALLBACK_PARAMS;
}
