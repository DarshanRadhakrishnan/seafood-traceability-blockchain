const mongoose = require("mongoose");

const lotSchema = new mongoose.Schema({
  lotId: { type: String, required: true, unique: true },
  dnaReport: String,
  geoTag: String,
  certificates: [String],
  recallStatus: { type: Boolean, default: false },
});

module.exports = mongoose.model("Lot", lotSchema);
