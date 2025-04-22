// src/components/ui/ResultsTable.jsx
import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Box,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import CountryFlag from "./CountryFlag";

// Animation variants for table rows
const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05, // Staggered delay based on index
      duration: 0.4,
      ease: "easeOut",
    },
  }),
  hover: {
    backgroundColor: "rgba(50, 50, 65, 0.3)",
    transition: { duration: 0.2 },
  },
};

// Animation variants for score values
const scoreVariants = {
  initial: { color: "#0096FF", scale: 1.1 },
  animate: {
    color: "#FFFFFF",
    scale: 1,
    transition: { duration: 0.7 },
  },
};

// Animation for rank box
const rankVariants = {
  hover: {
    scale: 1.1,
    transition: { duration: 0.2 },
  },
};

const ResultsTable = ({ results }) => {
  return (
    <Box overflowX="auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th width="60px">Rank</Th>
              <Th>Team</Th>
              <Th>Bib</Th>
              <Th>Name</Th>
              <Th isNumeric>D</Th>
              <Th isNumeric>E</Th>
              <Th isNumeric>Pen</Th>
              <Th isNumeric>Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            <AnimatePresence>
              {results.map((result, index) => (
                <React.Fragment key={result.id}>
                  <motion.tr
                    custom={index}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <Td>
                      <motion.div variants={rankVariants} whileHover="hover">
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
                          {result.rank}
                        </Box>
                      </motion.div>
                    </Td>
                    <Td>
                      <motion.div whileHover={{ scale: 1.1 }}>
                        <CountryFlag countryCode={result.country} />
                      </motion.div>
                    </Td>
                    <Td>{result.bib}</Td>
                    <Td>{result.name}</Td>
                    <Td isNumeric>{result.scores.D}</Td>
                    <Td isNumeric>{result.scores.E}</Td>
                    <Td isNumeric>{result.scores.Pen}</Td>
                    <Td isNumeric fontWeight="bold" color="brand.primary">
                      <motion.span
                        key={result.scores.total}
                        variants={scoreVariants}
                        initial="initial"
                        animate="animate"
                      >
                        {result.scores.total}
                      </motion.span>
                    </Td>
                  </motion.tr>
                  <motion.tr
                    custom={index}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0 }}
                  >
                    <Td colSpan={7} bg="brand.background.tertiary" py={1}></Td>
                    <Td
                      isNumeric
                      bg="brand.background.tertiary"
                      py={1}
                      fontWeight="bold"
                      color="brand.primary"
                    >
                      <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          delay: index * 0.05 + 0.2,
                          duration: 0.3,
                        }}
                      >
                        <Text fontSize="sm">Score</Text>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Text>{result.score}</Text>
                        </motion.div>
                      </motion.div>
                    </Td>
                  </motion.tr>
                </React.Fragment>
              ))}
            </AnimatePresence>
          </Tbody>
        </Table>
      </motion.div>
    </Box>
  );
};

export default ResultsTable;
