import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// === Participants ===
export const registerParticipant = (data) => API.post("/participants", data);
export const getParticipants = () => API.get("/participants");

// === Lots ===
export const createLot = (data) => API.post("/lots", data);
export const getLot = (lotId) => API.get(`/lots/${lotId}`);
export const validateLot = (data) => API.post("/lots/validate", data);
export const recallLot = (data) => API.post("/lots/recall", data);
export const addCheckpoint = (data) => API.post("/lots/checkpoint", data);

// === Consumer ===
export const getConsumerLot = (lotId) => API.get(`/consumer/${lotId}`);

// === Analytics ===
export const getViolations = () => API.get("/analytics/violations");
export const getRecalls = () => API.get("/analytics/recalls");
export const getViolationsByLocation = () => API.get("/analytics/violations-by-location");
export const getLotAnalytics = (lotId) => API.get(`/analytics/lot/${lotId}`);
