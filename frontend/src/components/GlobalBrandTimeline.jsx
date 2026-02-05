import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

export default function GlobalBrandTimeline({ data }) {
  if (!data || data.length === 0) return null;

  const brands = Object.keys(data[0]).filter(
    (k) => k !== "date"
  );

  const colors = [
    "#6366F1",
    "#EC4899",
    "#22D3EE",
    "#FACC15",
    "#A78BFA",
    "#34D399",
  ];

  return (
    <div className="mt-16 bg-[#0F1324] border border-white/10 rounded-2xl p-8">
      <h2 className="text-xl font-semibold mb-2">
        🌍 Impacto global de marcas
      </h2>
      <p className="text-sm text-gray-400 mb-6">
        Evolución histórica acumulada por día
      </p>

      <ResponsiveContainer width="100%" height={360}>
        <LineChart data={data}>
          <CartesianGrid stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="date"
            tick={{ fill: "#9CA3AF", fontSize: 12 }}
          />
          <YAxis tick={{ fill: "#9CA3AF", fontSize: 12 }} />
          <Tooltip />
          <Legend />

          {brands.map((brand, idx) => (
            <Line
              key={brand}
              type="monotone"
              dataKey={brand}
              stroke={colors[idx % colors.length]}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
