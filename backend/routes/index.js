const express = require("express");
const router = express.Router();

// ==================== LOT CONTROLLERS ====================
const { 
  createLot, 
  getLot, 
  validateLot, 
  recallLot, 
  addCheckpoint 
} = require("../controllers/lotController");

router.post("/lots", createLot);              // Create lot
router.get("/lots/:lotId", getLot);           // Get lot (on-chain + off-chain)
router.post("/lots/validate", validateLot);   // Validate lot authenticity
router.post("/lots/recall", recallLot);       // Recall lot
router.post("/lots/checkpoint", addCheckpoint); // Add temperature checkpoint


// ==================== PARTICIPANT CONTROLLERS ====================
const { 
  registerParticipant, 
  getParticipants, 
  getParticipant 
} = require("../controllers/participantController");

router.post("/participants", registerParticipant);   // Register new participant
router.get("/participants", getParticipants);        // List all participants
router.get("/participants/:id", getParticipant);     // Get one participant by ID


// ==================== CONSUMER CONTROLLERS ====================
const { getConsumerLot } = require("../controllers/consumerController");

router.get("/consumer/:lotId", getConsumerLot);      // Consumer-friendly lot view


// ==================== ANALYTICS CONTROLLERS ====================
const { 
  getTemperatureViolations, 
  getRecalls, 
  getViolationsByLocation, 
  getLotAnalytics 
} = require("../controllers/analyticsController");

router.get("/analytics/violations", getTemperatureViolations);
router.get("/analytics/recalls", getRecalls);
router.get("/analytics/violations-by-location", getViolationsByLocation);
router.get("/analytics/lot/:lotId", getLotAnalytics); // NEW
