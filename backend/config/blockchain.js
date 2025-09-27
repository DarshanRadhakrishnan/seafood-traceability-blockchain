const { ethers } = require("ethers");
const contractABI = require("../contracts/SupplyChain.json").abi;

const provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC);

// Wallet from private key
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Contract instance
const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  contractABI,
  wallet
);

module.exports = contract;
