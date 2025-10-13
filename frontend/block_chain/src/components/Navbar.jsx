import { Flex, Box, Link as ChakraLink, Heading } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/participants", label: "Participants" },
    { path: "/lots", label: "Lots" },
    { path: "/analytics", label: "Analytics" },
    { path: "/consumer", label: "Consumer" },
  ];

  return (
    <Flex
      bg="blue.600"
      p={4}
      align="center"
      justify="space-between"
      color="white"
      shadow="md"
    >
      <Heading size="md">TraceChain</Heading>
      <Flex gap={6}>
        {navItems.map((item) => (
          <ChakraLink
            key={item.path}
            as={Link}
            to={item.path}
            fontWeight={location.pathname === item.path ? "bold" : "normal"}
            _hover={{ textDecoration: "underline" }}
          >
            {item.label}
          </ChakraLink>
        ))}
      </Flex>
    </Flex>
  );
}
