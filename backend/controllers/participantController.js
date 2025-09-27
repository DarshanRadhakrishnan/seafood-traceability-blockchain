const Participant = require("../models/Participant");
const contract = require("../config/blockchain");

// Register new participant
exports.registerParticipant = async (req, res) => {
  try {
    const { walletAddress, name, role, certificates } = req.body;

    // 1. Write to blockchain (assuming contract has registerParticipant)
    const tx = await contract.registerParticipant(walletAddress, name, role);
    await tx.wait();

    // 2. Save off-chain data
    const participant = new Participant({
      walletAddress,
      name,
      role,
      certificates,
    });
    await participant.save();

    res.json({ message: "Participant registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all participants
exports.getParticipants = async (req, res) => {
  try {
    const participants = await Participant.find();
    res.json(participants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single participant
exports.getParticipant = async (req, res) => {
  try {
    const participant = await Participant.findById(req.params.id);
    if (!participant) return res.status(404).json({ error: "Not found" });
    res.json(participant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
