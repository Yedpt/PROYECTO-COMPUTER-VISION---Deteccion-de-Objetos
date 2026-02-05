import { Trophy, Image, Video, Target } from "lucide-react";

export default function AnalysisExecutivePanel({
  imageResult,
  videoResult,
}) {
  if (!imageResult && !videoResult) return null;

  const imageBrands =
    imageResult?.detections?.map((d) => d.class_name) || [];

  const uniqueImageBrands = [...new Set(imageBrands)];

  const videoBrands =
    videoResult?.metrics?.map((m) => m.class_name) || [];

  const topVideoBrand = videoResult?.summary?.top_brand;

  return (
    <div className="mt-20 grid md:grid-cols-4 gap-6">
      {/* IMAGE */}
      <div className="bg-[#151A2C] border border-white/5 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <Image className="text-pink-400" />
          <h4 className="font-semibold">Imagen</h4>
        </div>
        <p className="text-2xl font-bold">
          {imageResult ? imageResult.num_detections : 0}
        </p>
        <p className="text-sm text-gray-400">
          detecciones · {uniqueImageBrands.length} marcas
        </p>
      </div>

      {/* VIDEO */}
      <div className="bg-[#151A2C] border border-white/5 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <Video className="text-indigo-400" />
          <h4 className="font-semibold">Vídeo</h4>
        </div>
        <p className="text-2xl font-bold">
          {videoResult ? videoResult.metrics.length : 0}
        </p>
        <p className="text-sm text-gray-400">
          marcas significativas
        </p>
      </div>

      {/* TOP BRAND */}
      <div className="bg-[#151A2C] border border-white/5 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <Trophy className="text-yellow-400" />
          <h4 className="font-semibold">Marca dominante</h4>
        </div>
        <p className="text-xl font-bold">
          {topVideoBrand || "—"}
        </p>
        <p className="text-sm text-gray-400">
          último vídeo analizado
        </p>
      </div>

      {/* TOTAL BRANDS */}
      <div className="bg-[#151A2C] border border-white/5 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <Target className="text-emerald-400" />
          <h4 className="font-semibold">Marcas totales</h4>
        </div>
        <p className="text-2xl font-bold">
          {
            new Set([
              ...uniqueImageBrands,
              ...videoBrands,
            ]).size
          }
        </p>
        <p className="text-sm text-gray-400">
          en este análisis
        </p>
      </div>
    </div>
  );
}
