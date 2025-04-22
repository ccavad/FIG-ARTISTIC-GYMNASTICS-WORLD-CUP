// src/components/ui/ResponsiveScoreCard.jsx
import React from "react";
import {
  Box,
  Flex,
  Text,
  HStack,
  VStack,
  Badge,
  Grid,
  GridItem,
  useBreakpointValue,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import CountryFlag from "./CountryFlag";
import ApparatusIcon from "./ApparatusIcon";
import { formatScore } from "../../utils/scoreFormatter";
import useStore from "../../store/store";

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
  hover: {
    y: -5,
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)",
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
    color: "#0096FF",
    scale: 1,
    transition: { duration: 0.5, delay: 0.2 },
  },
};

const badgeVariants = {
  hover: {
    scale: 1.1,
    transition: { duration: 0.2 },
  },
};

const ResponsiveScoreCard = ({ athlete }) => {
  const { expandedAthleteId, toggleExpandAthlete } = useStore();
  const isExpanded = expandedAthleteId === athlete.id;
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Color for status badges
  const getStatusColor = (status) => {
    switch (status) {
      case "wait":
        return "orange.400";
      case "go":
        return "green.400";
      case "completed":
        return "brand.primary";
      default:
        return "gray.400";
    }
  };

  if (isMobile) {
    // Mobile layout
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        layout
      >
        <Box
          bg="brand.background.secondary"
          borderRadius="md"
          overflow="hidden"
          mb={4}
        >
          <Flex
            p={4}
            justifyContent="space-between"
            alignItems="center"
            onClick={() => toggleExpandAthlete(athlete.id)}
            cursor="pointer"
          >
            <HStack spacing={3}>
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
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

            <Flex alignItems="center">
              <motion.div
                key={athlete.scores.total}
                initial="highlight"
                animate="normal"
                variants={scoreChangeVariants}
              >
                <Text fontWeight="bold" fontSize="md" mr={2}>
                  {formatScore(athlete.scores.total, 3)}
                </Text>
              </motion.div>
              <motion.div variants={badgeVariants} whileHover="hover">
                <Badge colorScheme={getStatusColor(athlete.status)}>
                  {athlete.status.toUpperCase()}
                </Badge>
              </motion.div>
            </Flex>
          </Flex>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                variants={expandVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Box p={4} bg="brand.background.tertiary">
                  <Grid templateColumns="repeat(3, 1fr)" gap={4} mb={4}>
                    <VStack align="flex-start">
                      <Text color="brand.text.secondary" fontSize="sm">
                        D
                      </Text>
                      <motion.div whileHover={{ scale: 1.1, y: -2 }}>
                        <Text fontWeight="bold">
                          {formatScore(athlete.scores.D, 3)}
                        </Text>
                      </motion.div>
                    </VStack>
                    <VStack align="flex-start">
                      <Text color="brand.text.secondary" fontSize="sm">
                        E
                      </Text>
                      <motion.div whileHover={{ scale: 1.1, y: -2 }}>
                        <Text fontWeight="bold">
                          {formatScore(athlete.scores.E, 3)}
                        </Text>
                      </motion.div>
                    </VStack>
                    <VStack align="flex-start">
                      <Text color="brand.text.secondary" fontSize="sm">
                        P
                      </Text>
                      <motion.div whileHover={{ scale: 1.1, y: -2 }}>
                        <Text fontWeight="bold">
                          {formatScore(athlete.scores.P, 3)}
                        </Text>
                      </motion.div>
                    </VStack>
                  </Grid>

                  <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                    <VStack align="flex-start">
                      <Text color="brand.text.secondary" fontSize="sm">
                        App
                      </Text>
                      <motion.div whileHover={{ scale: 1.1, y: -2 }}>
                        <Text fontWeight="bold">
                          {formatScore(athlete.appScore, 3)}
                        </Text>
                      </motion.div>
                    </VStack>
                    <VStack align="flex-start">
                      <Text color="brand.text.secondary" fontSize="sm">
                        AA
                      </Text>
                      <motion.div whileHover={{ scale: 1.1, y: -2 }}>
                        <Text fontWeight="bold">
                          {formatScore(athlete.aaScore, 3)}
                        </Text>
                      </motion.div>
                    </VStack>
                    <VStack align="flex-start">
                      <Text color="brand.text.secondary" fontSize="sm">
                        Team
                      </Text>
                      <motion.div whileHover={{ scale: 1.1, y: -2 }}>
                        <Text fontWeight="bold">
                          {formatScore(athlete.teamScore, 3)}
                        </Text>
                      </motion.div>
                    </VStack>
                  </Grid>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </motion.div>
    );
  }

  // Desktop layout
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      layout
    >
      <Box
        bg="brand.background.secondary"
        borderRadius="md"
        overflow="hidden"
        mb={4}
      >
        <Grid
          templateColumns="40px 80px 150px 1fr 100px 100px 100px 80px"
          gap={2}
          p={4}
          alignItems="center"
          _hover={{ bg: "brand.background.tertiary" }}
          cursor="pointer"
          onClick={() => toggleExpandAthlete(athlete.id)}
        >
          <GridItem>
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <ApparatusIcon type={athlete.apparatus} />
            </motion.div>
          </GridItem>
          <GridItem>
            <HStack>
              <motion.div whileHover={{ scale: 1.1 }}>
                <CountryFlag countryCode={athlete.country} />
              </motion.div>
              <Text fontSize="sm">{athlete.country}</Text>
            </HStack>
          </GridItem>
          <GridItem>
            <Text>{athlete.bib}</Text>
          </GridItem>
          <GridItem>
            <Text fontWeight="medium">{athlete.fullName}</Text>
          </GridItem>
          <GridItem>
            <motion.div whileHover={{ y: -2 }}>
              <Text>D: {formatScore(athlete.scores.D, 3)}</Text>
            </motion.div>
          </GridItem>
          <GridItem>
            <motion.div whileHover={{ y: -2 }}>
              <Text>E: {formatScore(athlete.scores.E, 3)}</Text>
            </motion.div>
          </GridItem>
          <GridItem>
            <motion.div whileHover={{ y: -2 }}>
              <Text>P: {formatScore(athlete.scores.P, 3)}</Text>
            </motion.div>
          </GridItem>
          <GridItem textAlign="right">
            <motion.div variants={badgeVariants} whileHover="hover">
              <Badge
                colorScheme={getStatusColor(athlete.status)}
                variant="solid"
                py={1}
                px={2}
              >
                {athlete.status.toUpperCase()}
              </Badge>
            </motion.div>
          </GridItem>
        </Grid>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              variants={expandVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Box p={4} bg="brand.background.tertiary">
                <Grid templateColumns="repeat(3, 1fr)" gap={8}>
                  <HStack>
                    <Text color="brand.text.secondary" mr={2}>
                      App:
                    </Text>
                    <motion.div
                      key={athlete.appScore}
                      initial="highlight"
                      animate="normal"
                      variants={scoreChangeVariants}
                    >
                      <Text fontWeight="bold">
                        {formatScore(athlete.appScore, 3)}
                      </Text>
                    </motion.div>
                    {athlete.rank?.app && (
                      <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
                        <Badge colorScheme="blue" ml={2}>
                          #{athlete.rank.app}
                        </Badge>
                      </motion.div>
                    )}
                  </HStack>
                  <HStack>
                    <Text color="brand.text.secondary" mr={2}>
                      AA:
                    </Text>
                    <motion.div
                      key={athlete.aaScore}
                      initial="highlight"
                      animate="normal"
                      variants={scoreChangeVariants}
                    >
                      <Text fontWeight="bold">
                        {formatScore(athlete.aaScore, 3)}
                      </Text>
                    </motion.div>
                    {athlete.rank?.aa && (
                      <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
                        <Badge colorScheme="blue" ml={2}>
                          #{athlete.rank.aa}
                        </Badge>
                      </motion.div>
                    )}
                  </HStack>
                  <HStack>
                    <Text color="brand.text.secondary" mr={2}>
                      Team:
                    </Text>
                    <motion.div
                      key={athlete.teamScore}
                      initial="highlight"
                      animate="normal"
                      variants={scoreChangeVariants}
                    >
                      <Text fontWeight="bold">
                        {formatScore(athlete.teamScore, 3)}
                      </Text>
                    </motion.div>
                    {athlete.rank?.team && (
                      <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
                        <Badge colorScheme="blue" ml={2}>
                          #{athlete.rank.team}
                        </Badge>
                      </motion.div>
                    )}
                  </HStack>
                </Grid>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </motion.div>
  );
};

export default ResponsiveScoreCard;
