import { useEffect, useState, useCallback, useRef } from "react";
import {
  Video,
  Image,
  Tags,
  Trophy,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from "lucide-react";
import { getAnalyticsOverview } from "../services/analytics";
import useAnalyticsSocket from "../hooks/useAnalyticsSocket";
import useCountUp from "../hooks/useCountUp";

function TrendIcon({ trend }) {
  if (trend === "up")
    return <ArrowUpRight className="text-green-400" size={16} />;
  if (trend === "down")
    return <ArrowDownRight className="text-red-400" size={16} />;
  return <Minus className="text-gray-500" size={16} />;
}

export default function ExecutiveStats({ refreshKey }) {
  const [stats, setStats] = useState(null);
  const [prevStats, setPrevStats] = useState(null);
  const [pulse, setPulse] = useState(false);
  const firstLoad = useRef(true);

  const fetchOverview = useCallback(async () => {
    const res = await getAnalyticsOverview();

    setStats((currentStats) => {
      setPrevStats(currentStats);
      return res.data;
    });

    if (!firstLoad.current) {
      setPulse(true);
      setTimeout(() => setPulse(false), 600);
    }

    firstLoad.current = false;
  }, []);

  useEffect(() => {
    fetchOverview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  useAnalyticsSocket(fetchOverview);

  const animatedVideos = useCountUp(stats?.total_videos || 0);
  const animatedImages = useCountUp(stats?.total_images || 0);
  const animatedBrands = useCountUp(stats?.total_brands || 0);

  if (!stats) {
    return (
      <div className="mb-16 text-center text-gray-400">
        Cargando resumen ejecutivo…
      </div>
    );
  }

  const trend = (key) => {
    if (!prevStats) return "stable";
    if (stats[key] > prevStats[key]) return "up";
    if (stats[key] < prevStats[key]) return "down";
    return "stable";
  };

  const cards = [
    {
      label: "Vídeos analizados",
      value: animatedVideos,
      icon: Video,
      color: "text-indigo-400",
      trend: trend("total_videos"),
    },
    {
      label: "Imágenes analizadas",
      value: animatedImages,
      icon: Image,
      color: "text-pink-400",
      trend: trend("total_images"),
    },
    {
      label: "Marcas detectadas",
      value: animatedBrands,
      icon: Tags,
      color: "text-cyan-400",
      trend: trend("total_brands"),
    },
    {
      label: "Top Brand global",
      value: stats.top_brand || "—",
      icon: Trophy,
      color: "text-yellow-400",
      trend: "stable",
    },
  ];

  return (
    <div className="mb-24">
      <h2 className="text-3xl font-bold mb-8">
        📈 Executive Overview
      </h2>

      <div className="grid md:grid-cols-4 gap-6">
        {cards.map((c, idx) => (
          <div
            key={idx}
            className={`
              rounded-2xl bg-[#151A2C] border border-white/5 p-6
              flex items-center gap-4 transition-all
              ${pulse ? "ring-2 ring-indigo-500/40" : ""}
            `}
          >
            <div className={`p-3 rounded-xl bg-black/30 ${c.color}`}>
              <c.icon size={22} />
            </div>

            <div className="flex-1">
              <p className="text-sm text-gray-400 flex items-center gap-2">
                {c.label}
                <TrendIcon trend={c.trend} />
              </p>

              <p className="text-2xl font-bold">
                {c.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
