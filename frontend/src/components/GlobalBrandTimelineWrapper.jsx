import { useEffect, useState } from "react";
import GlobalBrandTimeline from "./GlobalBrandTimeline";
import { getGlobalBrandTimeline } from "../services/api";

export default function GlobalBrandTimelineWrapper({ refreshKey }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await getGlobalBrandTimeline();
        setData(res.data);
      } catch (err) {
        console.error("Error loading global timeline", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [refreshKey]);

  if (loading) {
    return (
      <div className="mt-20 text-center text-gray-400 text-sm">
        Cargando evolución global de marcas…
      </div>
    );
  }

  return <GlobalBrandTimeline data={data} />;
}
