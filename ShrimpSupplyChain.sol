// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/*
Rich Products: Frozen Food Supply Chain
Smart Contract for Lot Traceability, DNA Tagging, Temperature Monitoring,
Geo-Tagging, and Automated Recall.
*/

contract ShrimpSupplyChain {

    address public admin;

    constructor() {
        admin = msg.sender;
    }

    // Events
    event LotRegistered(uint lotId, string productCode, address indexed vendor);
    event LotUpdated(uint lotId, string status, string details);
    event RecallTriggered(uint lotId, string reason);

    // Lot Status Enum
    enum LotStatus { Created, InTransit, Delivered, Recalled }

    // Lot Structure
    struct Lot {
        uint lotId;
        string productCode;
        address fisher;
        address vendor;
        address warehouse;
        uint timestamp;
        string dnaTag; // simulated digital DNA
        string geoTag; // location info
        uint temperature; // in Celsius
        LotStatus status;
        bool exists;
    }

    // Mapping of lotId to Lot
    mapping(uint => Lot) public lots;

    // Modifier to restrict functions to admin
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    // Modifier to check if lot exists
    modifier lotExists(uint _lotId) {
        require(lots[_lotId].exists, "Lot does not exist");
        _;
    }

    // -----------------------------
    // 1. Register a new lot
    // -----------------------------
    function registerLot(
        uint _lotId,
        string memory _productCode,
        address _fisher,
        address _vendor,
        address _warehouse,
        string memory _dnaTag,
        string memory _geoTag
    ) public onlyAdmin {
        require(!lots[_lotId].exists, "Lot already registered");
        
        lots[_lotId] = Lot({
            lotId: _lotId,
            productCode: _productCode,
            fisher: _fisher,
            vendor: _vendor,
            warehouse: _warehouse,
            timestamp: block.timestamp,
            dnaTag: _dnaTag,
            geoTag: _geoTag,
            temperature: 0,
            status: LotStatus.Created,
            exists: true
        });

        emit LotRegistered(_lotId, _productCode, _vendor);
    }

    // -----------------------------
    // 2. Update lot information
    // -----------------------------
    function updateLot(
        uint _lotId,
        uint _temperature,
        LotStatus _status,
        string memory _details
    ) public lotExists(_lotId) {
        // Only registered vendors/warehouse/admin can update
        require(
            msg.sender == lots[_lotId].vendor || 
            msg.sender == lots[_lotId].warehouse || 
            msg.sender == admin, 
            "Not authorized"
        );

        lots[_lotId].temperature = _temperature;
        lots[_lotId].status = _status;

        // Auto-trigger recall if temperature breaches 0-10°C
        if (_temperature > 10 || _temperature < 0) {
            lots[_lotId].status = LotStatus.Recalled;
            emit RecallTriggered(_lotId, "Temperature breach detected");
        }

        emit LotUpdated(_lotId, statusToString(_status), _details);
    }

    // -----------------------------
    // 3. Get lot details for consumers
    // -----------------------------
    function getLotDetails(uint _lotId) public view lotExists(_lotId) returns (
        uint, string memory, string memory, string memory, uint, string memory
    ) {
        Lot memory l = lots[_lotId];
        return (
            l.lotId,
            l.productCode,
            l.dnaTag,
            l.geoTag,
            l.temperature,
            statusToString(l.status)
        );
    }

    // -----------------------------
    // 4. Trigger manual recall
    // -----------------------------
    function triggerRecall(uint _lotId, string memory _reason) public onlyAdmin lotExists(_lotId) {
        lots[_lotId].status = LotStatus.Recalled;
        emit RecallTriggered(_lotId, _reason);
    }

    // -----------------------------
    // Helper function: Enum to string
    // -----------------------------
    function statusToString(LotStatus _status) internal pure returns (string memory) {
        if (_status == LotStatus.Created) return "Created";
        if (_status == LotStatus.InTransit) return "InTransit";
        if (_status == LotStatus.Delivered) return "Delivered";
        if (_status == LotStatus.Recalled) return "Recalled";
        return "";
    }

    // -----------------------------
    // 5. Placeholder for Zero-Knowledge Proof verification
    // -----------------------------
    function verifyZKP(bytes memory /*proof*/) public pure returns (bool) {
        // Placeholder logic
        return true;
    }
}
