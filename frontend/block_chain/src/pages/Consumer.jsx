import { Box, Heading, Text } from "@chakra-ui/react";

export default function Consumer() {
  return (
    <Box p={6}>
      <Heading>Consumer Portal</Heading>
      <Text mt={4}>
        Validate your product lot authenticity using DNA hash and geolocation.
      </Text>
    </Box>
  );
}
