import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import useAnalyticsSocket from "../hooks/useAnalyticsSocket";

const COLORS = ["#6366F1", "#EC4899", "#22D3EE", "#F59E0B"];

export default function BrandAnalyticsDashboard({ refreshKey }) {
  const [data, setData] = useState([]);
  const [totalVideos, setTotalVideos] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:8000/analytics/top-brands"
      );
      setData(res.data.brands || []);
      setTotalVideos(res.data.total_videos || 0);
    } catch (err) {
      console.error("Error loading analytics", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics, refreshKey]);

  useAnalyticsSocket(fetchAnalytics);

  if (loading) {
    return (
      <div className="text-center text-gray-400 py-16">
        Cargando métricas globales…
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="text-center text-gray-400 py-16">
        No hay datos suficientes aún.
      </div>
    );
  }

  return (
    <div className="mt-20 bg-[#151A2C] border border-white/5 rounded-2xl p-10 transition-all">
      <h3 className="text-2xl font-bold mb-2">
        🏆 Brand Analytics Dashboard
      </h3>

      <p className="text-gray-400 mb-8">
        Ranking global basado en <strong>{totalVideos}</strong> vídeos analizados
      </p>

      {/* CONTEXTO GLOBAL */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="rounded-xl bg-black/30 border border-white/10 p-5">
          <p className="text-sm text-gray-400">📼 Vídeos analizados</p>
          <p className="text-3xl font-bold text-indigo-400">
            {totalVideos}
          </p>
        </div>

        <div className="rounded-xl bg-black/30 border border-white/10 p-5">
          <p className="text-sm text-gray-400">🏷️ Marcas detectadas</p>
          <p className="text-3xl font-bold">{data.length}</p>
        </div>

        <div className="rounded-xl bg-black/30 border border-white/10 p-5">
          <p className="text-sm text-gray-400">⚡ Estado</p>
          <p className="text-green-400 text-sm mt-1">
            Dashboard en tiempo real
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* BAR */}
        <div>
          <h4 className="text-lg font-semibold mb-4">
            📊 Ranking por detecciones
          </h4>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="brand" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip />
              <Bar dataKey="detections" radius={[6, 6, 0, 0]}>
                {data.map((_, idx) => (
                  <Cell
                    key={idx}
                    fill={COLORS[idx % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE */}
        <div>
          <h4 className="text-lg font-semibold mb-4">
            🥧 Share de presencia en vídeo
          </h4>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="time_seconds"
                nameKey="brand"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={4}
              >
                {data.map((_, idx) => (
                  <Cell
                    key={idx}
                    fill={COLORS[idx % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TABLE */}
      <div className="mt-12">
        <h4 className="text-lg font-semibold mb-4">
          📋 Resumen ejecutivo
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-300">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-2 text-left">Marca</th>
                <th className="py-2 text-left">Detecciones</th>
                <th className="py-2 text-left">Tiempo (s)</th>
                <th className="py-2 text-left">Vídeos</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr
                  key={idx}
                  className="border-b border-white/5"
                >
                  <td className="py-2 font-medium">
                    {row.brand}
                  </td>
                  <td className="py-2">{row.detections}</td>
                  <td className="py-2">{row.time_seconds}</td>
                  <td className="py-2">{row.videos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
