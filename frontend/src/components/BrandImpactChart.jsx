import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function BrandImpactChart({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">
        Impacto por marca
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="brand" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="impact" name="Impacto total" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
