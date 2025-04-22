// src/components/layout/Layout.jsx
import React from "react";
import { Box, Container } from "@chakra-ui/react";
import Header from "./Header";
import Navigation from "./Navigation";

const Layout = ({ children }) => {
  return (
    <Box minH="100vh" bg="brand.background.primary">
      <Header />
      <Navigation />
      <Container maxW="container.xl" px={4} py={4}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
