import { useEffect, useState, useCallback } from "react";
import {
  getAnalyticsOverview,
  getExecutiveBrands
} from "../services/analytics";

import ExecutiveOverview from "../components/ExecutiveOverview";
import BrandImpactChart from "../components/BrandImpactChart";
import BrandMediaChart from "../components/BrandMediaChart";

export default function ExecutiveDashboard() {
  const [overview, setOverview] = useState(null);
  const [brands, setBrands] = useState([]);

  const loadData = useCallback(async () => {
    const [o, b] = await Promise.all([
      getAnalyticsOverview(),
      getExecutiveBrands()
    ]);

    setOverview(o.data);
    setBrands(b.data);
  }, []);

  useEffect(() => {
    loadData();

    const ws = new WebSocket("ws://localhost:8000/ws/analytics");
    ws.onmessage = loadData;

    return () => ws.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-6 space-y-8">
      <ExecutiveOverview data={overview} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BrandImpactChart data={brands} />
        <BrandMediaChart data={brands} />
      </div>
    </div>
  );
}
