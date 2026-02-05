import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload) return null;

  return (
    <div className="bg-[#0F1324] border border-white/10 rounded-lg px-4 py-2 text-sm shadow-xl">
      <p className="text-gray-200 font-semibold mb-1">
        {label}
      </p>
      {payload.map((p, i) => (
        <p
          key={i}
          className="text-gray-400"
          style={{ color: p.color }}
        >
          {p.name}: <strong>{p.value}</strong>
        </p>
      ))}
    </div>
  );
}

export default function BrandMediaChart({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="bg-[#151A2C] border border-white/5 rounded-2xl p-8">
      <h2 className="text-xl font-semibold mb-2">
        📊 Distribución por formato
      </h2>
      <p className="text-sm text-gray-400 mb-6">
        Comparativa entre apariciones en imágenes y vídeos
      </p>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} barGap={6}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.05)"
          />

          <XAxis
            dataKey="brand"
            tick={{ fill: "#9CA3AF", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{ fill: "#9CA3AF", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip content={<CustomTooltip />} />

          <Legend
            wrapperStyle={{
              color: "#D1D5DB",
              fontSize: 12,
            }}
          />

          <Bar
            dataKey="videos"
            name="Vídeos"
            stackId="a"
            fill="#6366F1"
            radius={[6, 6, 0, 0]}
            animationDuration={800}
          />

          <Bar
            dataKey="images"
            name="Imágenes"
            stackId="a"
            fill="#EC4899"
            radius={[6, 6, 0, 0]}
            animationDuration={800}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
