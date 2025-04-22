// src/components/views/MedalsView.jsx
import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  Text,
  Image,
  Flex,
  useBreakpointValue,
  Center,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import CountryFlag from "../ui/CountryFlag";
import FilterBar from "../ui/FilterBar";

// Animation variants
const tableVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
};

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
    },
  }),
};

const medalVariants = {
  hover: {
    scale: 1.2,
    rotate: [0, 10, -10, 0],
    transition: {
      duration: 0.5,
    },
  },
};

const MedalsView = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Mock medals data
  const medalsData = [
    {
      country: "RU",
      countryName: "Russia",
      gold: 3,
      silver: 1,
      bronze: 0,
      total: 4,
    },
    {
      country: "JP",
      countryName: "Japan",
      gold: 2,
      silver: 2,
      bronze: 1,
      total: 5,
    },
    {
      country: "CN",
      countryName: "China",
      gold: 2,
      silver: 0,
      bronze: 2,
      total: 4,
    },
    {
      country: "US",
      countryName: "United States",
      gold: 1,
      silver: 2,
      bronze: 3,
      total: 6,
    },
    {
      country: "GB",
      countryName: "Great Britain",
      gold: 1,
      silver: 0,
      bronze: 2,
      total: 3,
    },
  ];

  // Sort by gold medals, then silver, then bronze
  const sortedMedals = [...medalsData].sort((a, b) => {
    if (a.gold !== b.gold) return b.gold - a.gold;
    if (a.silver !== b.silver) return b.silver - a.silver;
    return b.bronze - a.bronze;
  });

  // Custom medal components with perfect alignment
  const MedalIcon = ({ type }) => {
    const colors = {
      gold: {
        outer: "#FFD700",
        stroke: "#E6C200",
        inner: "#FFEC47",
        star: "#FFB800",
      },
      silver: {
        outer: "#C0C0C0",
        stroke: "#A0A0A0",
        inner: "#E0E0E0",
        star: "#A0A0A0",
      },
      bronze: {
        outer: "#CD7F32",
        stroke: "#B26B2A",
        inner: "#DEA173",
        star: "#B26B2A",
      },
    };

    const color = colors[type];

    return (
      <Box
        display="inline-flex"
        justifyContent="center"
        alignItems="center"
        width="20px"
        height="20px"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="24"
            cy="24"
            r="20"
            fill={color.outer}
            stroke={color.stroke}
            strokeWidth="2"
          />
          <circle cx="24" cy="24" r="16" fill={color.inner} />
          <path
            d="M24 8L27 16H35L29 21L31 29L24 24L17 29L19 21L13 16H21L24 8Z"
            fill={color.star}
          />
        </svg>
      </Box>
    );
  };

  // Custom table cell styles to ensure perfect alignment
  const cellStyles = {
    textAlign: "right",
    paddingRight: "24px",
  };

  return (
    <motion.div variants={tableVariants} initial="hidden" animate="visible">
      <Box>
        <FilterBar />

        <Box overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th width="60px">Rank</Th>
                <Th>Country</Th>
                <Th isNumeric p={0} pr={6}>
                  <Box
                    textAlign="right"
                    height="24px"
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    <motion.div whileHover="hover" variants={medalVariants}>
                      <MedalIcon type="gold" />
                    </motion.div>
                  </Box>
                </Th>
                <Th isNumeric p={0} pr={6}>
                  <Box
                    textAlign="right"
                    height="24px"
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    <motion.div whileHover="hover" variants={medalVariants}>
                      <MedalIcon type="silver" />
                    </motion.div>
                  </Box>
                </Th>
                <Th isNumeric p={0} pr={6}>
                  <Box
                    textAlign="right"
                    height="24px"
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    <motion.div whileHover="hover" variants={medalVariants}>
                      <MedalIcon type="bronze" />
                    </motion.div>
                  </Box>
                </Th>
                <Th isNumeric>Total</Th>
              </Tr>
            </Thead>
            <Tbody>
              <AnimatePresence>
                {sortedMedals.map((country, index) => (
                  <motion.tr
                    key={country.country}
                    custom={index}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, x: 20 }}
                    whileHover={{ backgroundColor: "rgba(40, 40, 55, 0.4)" }}
                  >
                    <Td>
                      <Box
                        bg="brand.primary"
                        color="white"
                        borderRadius="md"
                        width="32px"
                        height="32px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontWeight="bold"
                      >
                        {index + 1}
                      </Box>
                    </Td>
                    <Td>
                      <HStack spacing={3}>
                        <CountryFlag countryCode={country.country} />
                        {!isMobile && <Text>{country.countryName}</Text>}
                      </HStack>
                    </Td>
                    <Td isNumeric p={0} pr={6}>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        style={{ display: "inline-block", fontWeight: "bold" }}
                      >
                        {country.gold}
                      </motion.div>
                    </Td>
                    <Td isNumeric p={0} pr={6}>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        style={{ display: "inline-block" }}
                      >
                        {country.silver}
                      </motion.div>
                    </Td>
                    <Td isNumeric p={0} pr={6}>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        style={{ display: "inline-block" }}
                      >
                        {country.bronze}
                      </motion.div>
                    </Td>
                    <Td isNumeric fontWeight="bold" color="brand.primary">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        style={{ display: "inline-block" }}
                      >
                        {country.total}
                      </motion.div>
                    </Td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </Tbody>
          </Table>
        </Box>
      </Box>
    </motion.div>
  );
};

export default MedalsView;
