import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

/* ---------- IMAGE ---------- */
export const predictImage = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return api.post("/predict", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

/* ---------- VIDEO ---------- */
export const predictVideo = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return api.post("/predict/video", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

/* ---------- REAL TIME STREAM ---------- */
export const streamWebcamUrl = () =>
  "http://localhost:8000/stream/webcam";

export const getGlobalBrandTimeline = () =>
  api.get("/analytics/brands/timeline");


export default api;
