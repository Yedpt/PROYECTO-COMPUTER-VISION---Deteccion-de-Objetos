import KPI from "./KPI";

export default function ExecutiveOverview({ data }) {
  if (!data) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
      <KPI title="Total análisis" value={data.total_analyses} />
      <KPI title="Vídeos" value={data.total_videos} />
      <KPI title="Imágenes" value={data.total_images} />
      <KPI title="Marcas" value={data.total_brands} />
      <KPI title="Top Brand" value={data.top_brand || "-"} />
    </div>
  );
}
