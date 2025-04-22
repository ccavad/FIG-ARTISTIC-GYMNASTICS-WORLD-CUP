// src/components/layout/Header.jsx
import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  IconButton,
  useBreakpointValue,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Button,
} from "@chakra-ui/react";
import { ArrowBackIcon, HamburgerIcon } from "@chakra-ui/icons";
import useStore from "../../store/store";

const Header = () => {
  const { eventInfo, activeTab, setActiveTab } = useStore();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tabs = [
    { id: "live", label: "Live" },
    { id: "startlist", label: "Startlist" },
    { id: "schedule", label: "Schedule" },
    { id: "results", label: "Results" },
    { id: "medals", label: "Medals" },
  ];

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Box bg="brand.background.primary" py={4} px={4}>
      <Flex alignItems="center">
        {/* Back button */}
        <IconButton
          icon={<ArrowBackIcon />}
          variant="ghost"
          aria-label="Go back"
          mr={4}
        />

        {/* Event title and location */}
        <Box>
          <Heading size="md" mb={1}>
            {eventInfo.name}
          </Heading>
          <Flex color="brand.text.secondary" fontSize="sm">
            <Text>{eventInfo.location}</Text>
            <Text mx={2}>|</Text>
            <Text>{`${eventInfo.dates.start} - ${eventInfo.dates.end}`}</Text>
          </Flex>
        </Box>

        {/* Mobile menu icon */}
        {isMobile && (
          <IconButton
            icon={<HamburgerIcon />}
            variant="ghost"
            aria-label="Menu"
            ml="auto"
            onClick={handleMenuToggle}
          />
        )}
      </Flex>

      {/* Mobile Navigation Drawer */}
      <Drawer
        isOpen={isMenuOpen}
        placement="right"
        onClose={handleMenuToggle}
        size="xs"
      >
        <DrawerOverlay />
        <DrawerContent bg="brand.background.secondary">
          <DrawerCloseButton color="brand.text.primary" />
          <DrawerHeader
            borderBottomWidth="1px"
            borderColor="brand.border.primary"
          >
            Navigation
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch" mt={4}>
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant="ghost"
                  justifyContent="flex-start"
                  leftIcon={
                    tab.id === "live" ? (
                      <Box
                        as="span"
                        w="8px"
                        h="8px"
                        borderRadius="full"
                        bg="red.500"
                      />
                    ) : undefined
                  }
                  color={
                    activeTab === tab.id
                      ? "brand.primary"
                      : "brand.text.primary"
                  }
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMenuOpen(false);
                  }}
                >
                  {tab.label}
                </Button>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Header;
