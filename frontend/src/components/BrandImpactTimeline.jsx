import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

/* -----------------------------
   Utils: Moving Average
----------------------------- */
function movingAverage(data, key, windowSize = 3) {
  return data.map((entry, index) => {
    const start = Math.max(0, index - windowSize + 1);
    const slice = data.slice(start, index + 1);

    const avg =
      slice.reduce((sum, d) => sum + (d[key] || 0), 0) /
      slice.length;

    return {
      ...entry,
      [key]: Number(avg.toFixed(2)),
    };
  });
}

export default function BrandImpactTimeline({ data }) {
  if (!data || data.length === 0) return null;

  const brands = Object.keys(data[0]).filter(
    (k) => k !== "second"
  );

    const PALETTE = [
    "#6366F1",
    "#EC4899",
    "#22D3EE",
    "#FACC15",
    "#34D399",
    "#A78BFA",
    "#FB7185",
  ];

  const getColor = (index) => PALETTE[index % PALETTE.length];


  // 🎯 Suavizar datos por marca
  let smoothData = [...data];

  brands.forEach((brand) => {
    smoothData = movingAverage(smoothData, brand, 3);
  });

  return (
    <div className="mt-20 bg-[#151A2C] border border-white/5 rounded-2xl p-8">
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          ⏱️ Impacto de marca en el tiempo
        </h2>
        <p className="text-sm text-gray-400">
          Evolución suavizada de apariciones por segundo
        </p>
      </div>

      {/* LEGEND */}
      <div className="flex flex-wrap gap-4 mb-6">
        {brands.map((brand, idx) => (
        <Line
          key={brand}
          type="monotone"
          dataKey={brand}
          stroke={getColor(idx)}
          strokeWidth={2.5}
          dot={false}
          animationDuration={900}
        />
      ))}
      </div>

      {/* CHART */}
      <ResponsiveContainer width="100%" height={340}>
        <LineChart data={smoothData}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.05)"
          />

          <XAxis
            dataKey="second"
            tick={{ fill: "#9CA3AF", fontSize: 12 }}
            label={{
              value: "Tiempo (segundos)",
              position: "insideBottom",
              offset: -5,
              fill: "#9CA3AF",
            }}
          />

          <YAxis
            tick={{ fill: "#9CA3AF", fontSize: 12 }}
            label={{
              value: "Impacto",
              angle: -90,
              position: "insideLeft",
              fill: "#9CA3AF",
            }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#0F172A",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              color: "#E5E7EB",
            }}
            labelStyle={{
              color: "#A5B4FC",
              fontWeight: "bold",
            }}
          />

         {brands.map((brand, idx) => (
          <Line
            key={brand}
            type="monotone"
            dataKey={brand}
            stroke={getColor(idx)}
            strokeWidth={2.5}
            dot={false}
            animationDuration={900}
          />
        ))}

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
