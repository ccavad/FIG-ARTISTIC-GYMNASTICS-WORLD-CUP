// src/components/ui/ScoreCard.jsx
import React from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Icon,
  HStack,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import CountryFlag from "./CountryFlag";
import ApparatusIcon from "./ApparatusIcon";
import useStore from "../../store/store";

// Motion variants for animations
const cardVariants = {
  hover: {
    y: -5,
    transition: { duration: 0.2 },
  },
};

const expandVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.3 },
      opacity: { duration: 0.2, delay: 0.1 },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.3 },
      opacity: { duration: 0.2 },
    },
  },
};

const scoreChangeVariants = {
  highlight: {
    color: "#00C851",
    scale: 1.2,
    transition: { duration: 0.3 },
  },
  normal: {
    color: "#FFFFFF",
    scale: 1,
    transition: { duration: 0.3, delay: 0.2 },
  },
};

const ScoreCard = ({ athlete }) => {
  const { expandedAthleteId, toggleExpandAthlete } = useStore();
  const isExpanded = expandedAthleteId === athlete.id;

  // Get appropriate button variant based on status
  const getButtonVariant = (status) => {
    switch (status) {
      case "wait":
        return "wait";
      case "go":
        return "go";
      default:
        return "ghost";
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        bg="brand.background.secondary"
        borderRadius="md"
        overflow="hidden"
        mb={4}
      >
        {/* Header section */}
        <Flex
          p={4}
          justifyContent="space-between"
          alignItems="center"
          onClick={() => toggleExpandAthlete(athlete.id)}
          cursor="pointer"
          position="relative"
        >
          <HStack spacing={3}>
            <motion.div
              whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
            >
              <ApparatusIcon type={athlete.apparatus} />
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }}>
              <CountryFlag countryCode={athlete.country} />
            </motion.div>
            <Text fontWeight="bold" fontSize="md">
              {athlete.name}
            </Text>
          </HStack>

          <HStack spacing={3}>
            <motion.div
              key={athlete.scores.total} // Key changes trigger animation
              initial="highlight"
              animate="normal"
              variants={scoreChangeVariants}
            >
              <Text>{athlete.scores.total}</Text>
            </motion.div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Icon as={ChevronDownIcon} color="brand.text.secondary" />
            </motion.div>
          </HStack>
        </Flex>

        {/* Expanded details with AnimatePresence for smooth enter/exit */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              variants={expandVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Box p={4} bg="brand.background.tertiary">
                <Divider mb={4} borderColor="brand.border.primary" />

                <Flex justifyContent="space-between" mb={3}>
                  <motion.div whileHover={{ y: -3 }}>
                    <Text color="brand.text.secondary">
                      D: {athlete.scores.D}
                    </Text>
                  </motion.div>
                  <motion.div whileHover={{ y: -3 }}>
                    <Text color="brand.text.secondary">
                      E: {athlete.scores.E}
                    </Text>
                  </motion.div>
                  <motion.div whileHover={{ y: -3 }}>
                    <Text color="brand.text.secondary">
                      P: {athlete.scores.P}
                    </Text>
                  </motion.div>
                </Flex>

                <HStack spacing={4} mb={3}>
                  <VStack align="flex-start" spacing={1}>
                    <Text color="brand.text.secondary" fontSize="sm">
                      App
                    </Text>
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <Text fontWeight="bold">{athlete.appScore}</Text>
                    </motion.div>
                  </VStack>

                  <VStack align="flex-start" spacing={1}>
                    <Text color="brand.text.secondary" fontSize="sm">
                      AA
                    </Text>
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <Text fontWeight="bold">{athlete.aaScore}</Text>
                    </motion.div>
                  </VStack>

                  <VStack align="flex-start" spacing={1}>
                    <Text color="brand.text.secondary" fontSize="sm">
                      Team
                    </Text>
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <Text fontWeight="bold">{athlete.teamScore}</Text>
                    </motion.div>
                  </VStack>
                </HStack>

                {athlete.status === "wait" || athlete.status === "go" ? (
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button
                      variant={getButtonVariant(athlete.status)}
                      size="sm"
                      width="100%"
                    >
                      {athlete.status === "wait" ? "Wait" : "Go"}
                    </Button>
                  </motion.div>
                ) : null}
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </motion.div>
  );
};

export default ScoreCard;
