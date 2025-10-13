import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Divider,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import { getAnalytics, getLotAnalytics } from "../../api";

export default function Analytics() {
  const [violations, setViolations] = useState([]);
  const [error, setError] = useState("");

  const fetchAnalytics = async () => {
    try {
      const { data } = await getAnalytics();
      setViolations(data);
      setError("");
    } catch (err) {
      setError("Failed to fetch analytics: " + err.message);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <Box p={6} bg="gray.50" rounded="xl" shadow="md" mb={8}>
      <Heading size="lg" mb={4} color="purple.600">
        Analytics
      </Heading>

      {error && (
        <Text color="red.500" mb={3}>
          {error}
        </Text>
      )}

      <Divider my={4} />

      <Heading size="md" mb={2}>
        Temperature Violations
      </Heading>

      {violations.length === 0 ? (
        <Text color="gray.500">No violations detected.</Text>
      ) : (
        <List spacing={2}>
          {violations.map((v, idx) => (
            <ListItem key={idx}>
              <ListIcon as={WarningIcon} color="red.500" />
              Lot <b>{v.lotId}</b> exceeded threshold at{" "}
              <b>{v.location}</b> with temperature:{" "}
              <b>{v.temperature}°C</b>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
