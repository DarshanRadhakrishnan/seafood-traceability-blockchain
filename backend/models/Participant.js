const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
  walletAddress: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  role: {
    type: String,
    enum: ["boat", "vendor", "warehouse", "logistics", "retail"],
    required: true,
  },
  certificates: [String], // sustainability or ZKP hashes
});

module.exports = mongoose.model("Participant", participantSchema);
