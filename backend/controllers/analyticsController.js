const Lot = require("../models/Lot");

// Temperature violation analytics
exports.getTemperatureViolations = async (req, res) => {
  try {
    const threshold = 5; // max safe temp in °C
    const lots = await Lot.find();

    const violations = [];

    lots.forEach(lot => {
      lot.checkpoints.forEach(cp => {
        if (cp.temperature > threshold) {
          violations.push({
            lotId: lot.lotId,
            location: cp.location,
            temp: cp.temperature,
            timestamp: cp.timestamp
          });
        }
      });
    });

    res.json({
      violationCount: violations.length,
      violations
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
