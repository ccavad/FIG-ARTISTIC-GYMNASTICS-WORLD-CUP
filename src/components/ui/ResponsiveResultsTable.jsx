// src/components/ui/ResponsiveResultsTable.jsx
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
  VStack,
  Badge,
  useBreakpointValue,
} from "@chakra-ui/react";
import CountryFlag from "./CountryFlag";
import { formatScore } from "../../utils/scoreFormatter";

const ResponsiveResultsTable = ({ results }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (isMobile) {
    // Mobile layout
    return (
      <Box>
        {results.map((result) => (
          <Box
            key={result.id}
            bg="brand.background.secondary"
            borderRadius="md"
            mb={4}
            overflow="hidden"
          >
            <Flex alignItems="center" p={4}>
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
                mr={3}
              >
                {result.rank}
              </Box>

              <CountryFlag countryCode={result.country} size="md" />
              <Text ml={3} fontWeight="medium">
                {result.name}
              </Text>
            </Flex>

            <Box p={4} pt={0}>
              <Text color="brand.text.secondary" fontSize="sm" mb={2}>
                Bib: {result.bib}
              </Text>

              <Grid
                templateColumns="repeat(3, 1fr)"
                gap={2}
                mb={3}
                fontSize="sm"
              >
                <VStack align="flex-start" spacing={1}>
                  <Text color="brand.text.secondary">D</Text>
                  <Text>{formatScore(result.scores.D, 3)}</Text>
                </VStack>
                <VStack align="flex-start" spacing={1}>
                  <Text color="brand.text.secondary">E</Text>
                  <Text>{formatScore(result.scores.E, 3)}</Text>
                </VStack>
                <VStack align="flex-start" spacing={1}>
                  <Text color="brand.text.secondary">Pen</Text>
                  <Text>{formatScore(result.scores.Pen, 3)}</Text>
                </VStack>
              </Grid>

              <Flex justifyContent="space-between" alignItems="center">
                <Text color="brand.text.secondary">Total:</Text>
                <Text fontWeight="bold" color="brand.primary" fontSize="xl">
                  {formatScore(result.score, 3)}
                </Text>
              </Flex>
            </Box>
          </Box>
        ))}
      </Box>
    );
  }

  // Desktop layout
  return (
    <Box overflowX="auto">
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
          {results.map((result) => (
            <React.Fragment key={result.id}>
              <Tr>
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
                    {result.rank}
                  </Box>
                </Td>
                <Td>
                  <HStack spacing={2}>
                    <CountryFlag countryCode={result.country} />
                    <Text>{result.country}</Text>
                  </HStack>
                </Td>
                <Td>{result.bib}</Td>
                <Td>{result.name}</Td>
                <Td isNumeric>{formatScore(result.scores.D, 3)}</Td>
                <Td isNumeric>{formatScore(result.scores.E, 3)}</Td>
                <Td isNumeric>{formatScore(result.scores.Pen, 3)}</Td>
                <Td isNumeric fontWeight="bold" color="brand.primary">
                  {formatScore(result.scores.total, 3)}
                </Td>
              </Tr>
              <Tr>
                <Td colSpan={7} bg="brand.background.tertiary" py={1}></Td>
                <Td
                  isNumeric
                  bg="brand.background.tertiary"
                  py={1}
                  fontWeight="bold"
                  color="brand.primary"
                >
                  <Text fontSize="sm">Score</Text>
                  <Text>{formatScore(result.score, 3)}</Text>
                </Td>
              </Tr>
            </React.Fragment>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

// Helper component for mobile layout
const Grid = ({ children, templateColumns, gap, mb, fontSize }) => {
  return (
    <Flex
      sx={{
        display: "grid",
        gridTemplateColumns: templateColumns,
        gap: `${gap * 4}px`,
        marginBottom: mb ? `${mb * 4}px` : 0,
        fontSize: fontSize,
      }}
    >
      {children}
    </Flex>
  );
};

export default ResponsiveResultsTable;
