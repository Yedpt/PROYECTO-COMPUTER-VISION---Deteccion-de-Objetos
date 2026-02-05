import {
  Image,
  Video,
  Camera,
  Eye,
  BarChart3,
  Zap,
  Layers,
  Monitor,
  FileDown,
} from "lucide-react";
import { useRef, useState } from "react";
import FeatureCard from "../components/FeatureCard";
import WebcamStream from "../components/WebcamStream";
import { predictImage, predictVideo } from "../services/api";
import BrandAnalyticsDashboard from "../components/BrandAnalyticsDashboard";
import ExecutiveStats from "../components/ExecutiveStats";
import AnalysisExecutivePanel from "../components/AnalysisExecutivePanel";
import BrandMediaChart from "../components/BrandMediaChart";
import BrandImpactTimeline from "../components/BrandImpactTimeline";
import GlobalBrandTimeline from "../components/GlobalBrandTimeline";
import GlobalBrandTimelineWrapper from "../components/GlobalBrandTimelineWrapper";  


export default function Home() {
  const imageInputRef = useRef();
  const videoInputRef = useRef();

  const [showWebcam, setShowWebcam] = useState(false);

  const [videoLoading, setVideoLoading] = useState(false);
  const [videoResult, setVideoResult] = useState(null);

  const [imageLoading, setImageLoading] = useState(false);
  const [imageResult, setImageResult] = useState(null);

   // 🔥 CLAVE
  const [analyticsRefreshKey, setAnalyticsRefreshKey] = useState(0);

  /* ---------- IMAGE ---------- */
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageLoading(true);
    setImageResult(null);

    try {
      const res = await predictImage(file);
      console.log("IMAGE RESULT:", res.data);
      setImageResult(res.data);
    // 🔥 fuerza refresh analytics
      setAnalyticsRefreshKey((k) => k + 1);
    } catch (err) {
      console.error(err);
      alert("Error analizando la imagen");
    } finally {
      setImageLoading(false);
    }
  };

  /* ---------- VIDEO ---------- */
  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setVideoLoading(true);
    setVideoResult(null);

    try {
      const res = await predictVideo(file);
      console.log("VIDEO RESULT:", res.data);
      setVideoResult(res.data);
    // 🔥 fuerza refresh analytics
      setAnalyticsRefreshKey((k) => k + 1);
    } catch (err) {
      console.error(err);
      alert("Error procesando el vídeo");
    } finally {
      setVideoLoading(false);
    }
  };

  return (
    <div className="px-8 py-20 max-w-7xl mx-auto">
      {/* HERO */}
      <div className="text-center mb-24">
        <span className="inline-block mb-4 px-4 py-1 text-sm rounded-full bg-indigo-500/10 text-indigo-400">
          🚀 Free AI-Powered Brand Detection
        </span>

        <h1 className="text-5xl font-bold mb-6">
          Detect Brand Logos with AI
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto">
          Upload images or videos, or use your camera in real-time to identify
          brand logos using advanced computer vision technology.
        </p>
      </div>

      {/* MAIN ACTION CARDS */}
      <div className="grid md:grid-cols-3 gap-8 mb-28">
        <FeatureCard
          icon={Image}
          title="Analyze Image"
          description="Upload an image to detect brand logos instantly."
          onClick={() => imageInputRef.current.click()}
          color="text-pink-400"
          bg="from-pink-500/30 to-purple-500/30"
        />

        <FeatureCard
          icon={Video}
          title="Analyze Video"
          description="Process videos to track brand appearances over time."
          onClick={() => videoInputRef.current.click()}
          color="text-violet-400"
          bg="from-violet-500/30 to-indigo-500/30"
        />

        <FeatureCard
          icon={Camera}
          title="Real-time Detection"
          description="Use your camera for live brand logo detection."
          onClick={() => setShowWebcam(true)}
          color="text-cyan-400"
          bg="from-cyan-500/30 to-blue-500/30"
        />
      </div>

      {/* INPUTS */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleImageUpload}
      />

      <input
        ref={videoInputRef}
        type="file"
        accept="video/*"
        hidden
        onChange={handleVideoUpload}
      />

      {/* IMAGE LOADING */}
      {imageLoading && (
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-pink-500/10 text-pink-400">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            <span>Analizando imagen…</span>
          </div>
        </div>
      )}

      {/* IMAGE RESULT */}
      {imageResult && (
        <div className="mt-16 bg-[#151A2C] border border-white/5 rounded-2xl p-8">
          <h3 className="text-xl font-semibold mb-4">
            🖼️ Resultados del análisis de imagen
          </h3>

          <p className="text-gray-300 mb-2">
            <strong>Total detecciones:</strong>{" "}
            {imageResult.num_detections}
          </p>

          <ul className="text-gray-400 space-y-1 text-sm">
            {imageResult.detections.map((det, idx) => (
              <li key={idx}>
                • {det.class_name} — conf{" "}
                {(det.confidence * 100).toFixed(1)}%
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* WEBCAM */}
      {showWebcam && (
        <WebcamStream onClose={() => setShowWebcam(false)} />
      )}

      {/* VIDEO LOADING */}
      {videoLoading && (
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-indigo-500/10 text-indigo-400">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            <span>
              Analizando vídeo, esto puede tardar unos segundos…
            </span>
          </div>
        </div>
      )}

      {/* VIDEO RESULT */}
      {videoResult && (
        <div className="mt-20 bg-[#151A2C] border border-white/5 rounded-2xl p-8">
          <h3 className="text-xl font-semibold mb-6">
            📊 Resultados del análisis de vídeo
          </h3>

          {/* 🆕 SUMMARY EJECUTIVO */}
          {videoResult.summary && (
            <div className="mb-8 p-5 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
              <p className="text-sm text-indigo-300">
                🏆 Marca dominante:{" "}
                <strong>{videoResult.summary.top_brand}</strong>{" "}
                ({videoResult.summary.top_brand_percentage}% del vídeo)
              </p>
              <p className="text-sm text-gray-400">
                Duración: {videoResult.summary.video_duration}s ·
                Marcas detectadas: {videoResult.summary.total_brands}
              </p>
            </div>
          )}

          <p className="text-sm text-gray-400 mb-6">
            Se muestran únicamente marcas con presencia significativa
            en el vídeo para evitar falsos positivos.
          </p>

          {videoResult.metrics?.length === 0 && (
            <p className="text-gray-400 text-sm mb-6">
              ⚠️ No se detectaron marcas con presencia significativa.
            </p>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {videoResult.metrics?.map((m, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-black/30 border border-white/10 p-5"
              >
                <h4 className="font-semibold text-lg mb-2">
                  🏷️ {m.class_name}
                </h4>

                <ul className="text-sm text-gray-300 space-y-1">
                  <li>
                    <strong>Detecciones:</strong>{" "}
                    {m.detections}
                  </li>
                  <li>
                    <strong>Tiempo en pantalla:</strong>{" "}
                    {m.time_seconds}s
                  </li>
                  <li>
                    <strong>Presencia en vídeo:</strong>{" "}
                    {m.percentage}%
                  </li>
                  {/* 🆕 IMPACTO */}
                  <li>
                    <strong>Impacto:</strong>{" "}
                    <span className="text-indigo-400">
                      {m.impact}
                    </span>
                  </li>
                </ul>

                <div className="mt-3 w-full h-2 rounded-full bg-white/10">
                  <div
                    className="h-2 rounded-full bg-indigo-500"
                    style={{ width: `${m.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm text-gray-400">
            🎬 Vídeo procesado con bounding boxes y métricas por marca.
          </p>
        </div>
      )}

              {/* 🧠 ANALYSIS EXECUTIVE DASHBOARD */}
        <AnalysisExecutivePanel
          imageResult={imageResult}
          videoResult={videoResult}
        />

        {/* 📊 BRAND MEDIA CHART (ANÁLISIS ACTUAL) */}
        {videoResult && (
          <div className="mt-16">
            <BrandMediaChart
              data={(() => {
                const imageCounts = {};

                imageResult?.detections?.forEach((d) => {
                  imageCounts[d.class_name] =
                    (imageCounts[d.class_name] || 0) + 1;
                });

                return videoResult.metrics.map((m) => ({
                  brand: m.class_name,
                  videos: m.detections,
                  images: imageCounts[m.class_name] || 0,
                }));
              })()}
            />
          </div>
        )}

                {/* ⏱️ BRAND IMPACT TIMELINE (POR VÍDEO) */}
        {videoResult?.timeline && (
          <BrandImpactTimeline data={videoResult.timeline} />
        )}


      
            {/* 🌍 GLOBAL BRAND TIMELINE */}
      <GlobalBrandTimelineWrapper refreshKey={analyticsRefreshKey} />


    

          {/* 🧠 EXECUTIVE OVERVIEW */}
      <ExecutiveStats refreshKey={analyticsRefreshKey} />

      {/* 🔥 GLOBAL ANALYTICS DASHBOARD */}
       <BrandAnalyticsDashboard refreshKey={analyticsRefreshKey} />


      {/* FEATURES */}
      <div className="mt-32">
        <h2 className="text-3xl font-bold text-center mb-4">
          Powerful Features for Brand Analysis
        </h2>

        <p className="text-gray-400 text-center mb-16">
          Everything you need to track and analyze brand presence
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={Eye}
            title="AI Object Detection"
            description="YOLO-based detection with high accuracy and confidence scoring."
            color="text-indigo-400"
            bg="from-indigo-500/30 to-purple-500/30"
            clickable={false}
          />

          <FeatureCard
            icon={BarChart3}
            title="Comprehensive Analytics"
            description="Track appearance time, frequency, and visibility metrics."
            color="text-pink-400"
            bg="from-pink-500/30 to-rose-500/30"
            clickable={false}
          />

          <FeatureCard
            icon={Zap}
            title="Real-time Processing"
            description="Low-latency inference with live visual feedback."
            color="text-yellow-400"
            bg="from-yellow-500/30 to-orange-500/30"
            clickable={false}
          />

          <FeatureCard
            icon={Layers}
            title="Multi-Brand Tracking"
            description="Detect and track multiple brands simultaneously."
            color="text-cyan-400"
            bg="from-cyan-500/30 to-blue-500/30"
            clickable={false}
          />

          <FeatureCard
            icon={Monitor}
            title="Live Camera Detection"
            description="Stream detections directly from your webcam."
            color="text-emerald-400"
            bg="from-emerald-500/30 to-green-500/30"
            clickable={false}
          />

          <FeatureCard
            icon={FileDown}
            title="Export Reports"
            description="Generate downloadable detection summaries."
            color="text-orange-400"
            bg="from-orange-500/30 to-red-500/30"
            clickable={false}
          />
        </div>
      </div>
    </div>
  );
}
