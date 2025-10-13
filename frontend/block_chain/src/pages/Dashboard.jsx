import Participants from "../components/enterprise/Participants";
import Lots from "../components/enterprise/Lots";
import Analytics from "../components/enterprise/Analytics";
import { Box, Heading } from "@chakra-ui/react";

export default function Dashboard() {
  return (
    <Box p={8} bg="gray.100" minH="100vh">
      <Heading mb={6} color="teal.700">
        Enterprise Dashboard
      </Heading>
      <Participants />
      <Lots />
      <Analytics />
    </Box>
  );
}
