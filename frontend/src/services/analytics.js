import axios from "axios";

const API_URL = "http://localhost:8000";

export const getAnalyticsOverview = () =>
  axios.get(`${API_URL}/analytics/overview`);

export const getExecutiveBrands = () =>
  axios.get(`${API_URL}/analytics/brands/executive`);
