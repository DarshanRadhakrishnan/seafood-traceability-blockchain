import { useState, useEffect } from "react";
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
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

// Import API helpers (make sure api/index.js exports these)
import { registerParticipant, getParticipants } from "../../api";

export default function Participants() {
  const [form, setForm] = useState({
    walletAddress: "",
    name: "",
    role: "",
  });
  const [participants, setParticipants] = useState([]);

  // Fetch participants list
  const fetchParticipants = async () => {
    try {
      const { data } = await getParticipants();
      setParticipants(data);
    } catch (error) {
      console.error("Error fetching participants:", error.message);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerParticipant(form);
      setForm({ walletAddress: "", name: "", role: "" });
      fetchParticipants();
    } catch (error) {
      console.error("Error registering participant:", error.message);
    }
  };

  return (
    <Box p={6} bg="gray.50" rounded="xl" shadow="md" mb={8}>
      <Heading size="lg" mb={4} color="teal.600">
        Participants Management
      </Heading>

      {/* Registration Form */}
      <form onSubmit={handleSubmit}>
        <VStack spacing={3} align="stretch" mb={4}>
          <FormControl>
            <FormLabel>Wallet Address</FormLabel>
            <Input
              placeholder="Wallet Address"
              value={form.walletAddress}
              onChange={(e) =>
                setForm({ ...form, walletAddress: e.target.value })
              }
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel>Role</FormLabel>
            <Input
              placeholder="Role (boat/vendor/warehouse/logistics)"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              required
            />
          </FormControl>

          <Button type="submit" colorScheme="teal">
            Register
          </Button>
        </VStack>
      </form>

      <Divider my={4} />

      {/* Participants List */}
      <Heading size="md" mb={2}>
        All Participants
      </Heading>
      {participants.length === 0 ? (
        <Text color="gray.500">No participants found.</Text>
      ) : (
        <List spacing={2}>
          {participants.map((p) => (
            <ListItem key={p._id} display="flex" alignItems="center">
              <ListIcon as={CheckCircleIcon} color="teal.500" />
              <Text fontSize="sm">
                <b>{p.name}</b> ({p.role}) — {p.walletAddress}
              </Text>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
