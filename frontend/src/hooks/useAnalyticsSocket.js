import { useEffect, useRef } from "react";

export default function useAnalyticsSocket(onUpdate) {
  const socketRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/analytics");
    socketRef.current = ws;

    ws.onopen = () => {
      console.log("🟢 WebSocket analytics conectado");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.event === "analytics_updated") {
          console.log("📡 Analytics updated → refetch");
          onUpdate();
        }
      } catch (err) {
        console.error("WS parse error", err);
      }
    };

    ws.onerror = (err) => {
      console.error("WebSocket error", err);
    };

    ws.onclose = () => {
      console.log("🔴 WebSocket analytics cerrado");
    };

    return () => {
      ws.close();
    };
  }, [onUpdate]);
}
