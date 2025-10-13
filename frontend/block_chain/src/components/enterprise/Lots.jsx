import { useState } from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Divider,
  Text,
} from "@chakra-ui/react";
import {
  createLot,
  addCheckpoint,
  validateLot,
  recallLot,
  getLot,
} from "../../api";

export default function Lots() {
  const [createForm, setCreateForm] = useState({
    lotId: "",
    productCode: "",
    shipperId: "",
    receiverId: "",
    temp: "",
    dnaHash: "",
    geoTag: "",
  });
  const [checkpointForm, setCheckpointForm] = useState({
    lotId: "",
    location: "",
    temperature: "",
  });
  const [validateForm, setValidateForm] = useState({
    lotId: "",
    dnaHash: "",
    geoTag: "",
  });
  const [recallLotId, setRecallLotId] = useState("");
  const [lotDetails, setLotDetails] = useState(null);
  const [error, setError] = useState("");

  // --- Handlers ---
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createLot(createForm);
      setCreateForm({
        lotId: "",
        productCode: "",
        shipperId: "",
        receiverId: "",
        temp: "",
        dnaHash: "",
        geoTag: "",
      });
    } catch (err) {
      setError("Failed to create lot: " + err.message);
    }
  };

  const handleCheckpoint = async (e) => {
    e.preventDefault();
    try {
      await addCheckpoint(checkpointForm);
      setCheckpointForm({ lotId: "", location: "", temperature: "" });
    } catch (err) {
      setError("Failed to add checkpoint: " + err.message);
    }
  };

  const handleValidate = async (e) => {
    e.preventDefault();
    try {
      await validateLot(validateForm);
      setValidateForm({ lotId: "", dnaHash: "", geoTag: "" });
    } catch (err) {
      setError("Validation failed: " + err.message);
    }
  };

  const handleRecall = async (e) => {
    e.preventDefault();
    try {
      await recallLot({ lotId: recallLotId });
      setRecallLotId("");
    } catch (err) {
      setError("Failed to recall lot: " + err.message);
    }
  };

  const fetchLot = async (lotId) => {
    try {
      const { data } = await getLot(lotId);
      setLotDetails(data);
      setError("");
    } catch (err) {
      setError("Failed to fetch lot details: " + err.message);
    }
  };

  return (
    <Box p={6} bg="gray.50" rounded="xl" shadow="md" mb={8}>
      <Heading size="lg" mb={4} color="blue.600">
        Lots Management
      </Heading>

      {error && (
        <Text color="red.500" mb={3}>
          {error}
        </Text>
      )}

      {/* Create Lot */}
      <form onSubmit={handleCreate}>
        <VStack spacing={3} align="stretch" mb={4}>
          <Heading size="sm">Create Lot</Heading>
          {["lotId", "productCode", "shipperId", "receiverId", "temp", "dnaHash", "geoTag"].map(
            (field) => (
              <FormControl key={field}>
                <FormLabel textTransform="capitalize">{field}</FormLabel>
                <Input
                  placeholder={field}
                  value={createForm[field]}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, [field]: e.target.value })
                  }
                  required
                />
              </FormControl>
            )
          )}
          <Button type="submit" colorScheme="blue">
            Create Lot
          </Button>
        </VStack>
      </form>

      <Divider my={4} />

      {/* Add Checkpoint */}
      <form onSubmit={handleCheckpoint}>
        <VStack spacing={3} align="stretch" mb={4}>
          <Heading size="sm">Add Checkpoint</Heading>
          <FormControl>
            <FormLabel>Lot ID</FormLabel>
            <Input
              placeholder="Lot ID"
              value={checkpointForm.lotId}
              onChange={(e) =>
                setCheckpointForm({ ...checkpointForm, lotId: e.target.value })
              }
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Location</FormLabel>
            <Input
              placeholder="Location"
              value={checkpointForm.location}
              onChange={(e) =>
                setCheckpointForm({ ...checkpointForm, location: e.target.value })
              }
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Temperature</FormLabel>
            <Input
              placeholder="Temperature"
              value={checkpointForm.temperature}
              onChange={(e) =>
                setCheckpointForm({
                  ...checkpointForm,
                  temperature: e.target.value,
                })
              }
              required
            />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Add Checkpoint
          </Button>
        </VStack>
      </form>

      <Divider my={4} />

      {/* Validate Lot */}
      <form onSubmit={handleValidate}>
        <VStack spacing={3} align="stretch" mb={4}>
          <Heading size="sm">Validate Lot</Heading>
          {["lotId", "dnaHash", "geoTag"].map((field) => (
            <FormControl key={field}>
              <FormLabel textTransform="capitalize">{field}</FormLabel>
              <Input
                placeholder={field}
                value={validateForm[field]}
                onChange={(e) =>
                  setValidateForm({ ...validateForm, [field]: e.target.value })
                }
                required
              />
            </FormControl>
          ))}
          <Button type="submit" colorScheme="blue">
            Validate Lot
          </Button>
        </VStack>
      </form>

      <Divider my={4} />

      {/* Recall Lot */}
      <form onSubmit={handleRecall}>
        <VStack spacing={3} align="stretch" mb={4}>
          <Heading size="sm">Recall Lot</Heading>
          <FormControl>
            <FormLabel>Lot ID</FormLabel>
            <Input
              placeholder="Lot ID"
              value={recallLotId}
              onChange={(e) => setRecallLotId(e.target.value)}
              required
            />
          </FormControl>
          <Button type="submit" colorScheme="red">
            Recall Lot
          </Button>
        </VStack>
      </form>

      <Divider my={4} />

      {/* Fetch Lot Details */}
      <Heading size="sm">Get Lot Details</Heading>
      <Input
        placeholder="Enter Lot ID"
        onBlur={(e) => fetchLot(e.target.value)}
      />
      {lotDetails && (
        <Box mt={3} p={3} bg="white" rounded="md" shadow="sm">
          <Text fontSize="sm" color="gray.700">
            {JSON.stringify(lotDetails, null, 2)}
          </Text>
        </Box>
      )}
    </Box>
  );
}
