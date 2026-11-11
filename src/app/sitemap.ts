import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { TRATAMENTOS } from "@/lib/tratamentos";

const ATUALIZADO = "2026-11-10";

export default function sitemap(): MetadataRoute.Sitemap {
  const paginas = ["", "/tratamentos", "/sobre", "/contato"].map((p) => ({
    url: `${SITE.url}${p}`,
    lastModified: ATUALIZADO,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.8,
  }));
  const tratamentos = TRATAMENTOS.map((t) => ({
    url: `${SITE.url}/tratamentos/${t.slug}`,
    lastModified: ATUALIZADO,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...paginas, ...tratamentos];
}
