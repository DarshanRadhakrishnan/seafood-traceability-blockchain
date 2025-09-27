const Lot = require("../models/Lot");
const contract = require("../config/blockchain");

// Create new lot
exports.createLot = async (req, res) => {
  try {
    const { lotId, shipperId, receiverId, temp, dnaHash, geoTag } = req.body;

    // 1. Write to blockchain
    const tx = await contract.recordLot(
      lotId,
      shipperId,
      receiverId,
      temp,
      dnaHash
    );
    await tx.wait();

    // 2. Save off-chain info
    const lot = new Lot({ lotId, geoTag });
    await lot.save();

    res.json({ message: "Lot created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get lot info
exports.getLot = async (req, res) => {
  try {
    const { lotId } = req.params;

    // Get off-chain data
    const lotOffChain = await Lot.findOne({ lotId });

    // Get on-chain data
    const lotOnChain = await contract.lots(lotId); // Example mapping in contract

    res.json({ onChain: lotOnChain, offChain: lotOffChain });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
