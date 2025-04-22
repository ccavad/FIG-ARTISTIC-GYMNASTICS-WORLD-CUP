// src/components/views/StartlistView.jsx
import React from "react";
import { Box, VStack, HStack, Text, Flex, Button } from "@chakra-ui/react";
import FilterBar from "../ui/FilterBar";
import CountryFlag from "../ui/CountryFlag";
import ApparatusIcon from "../ui/ApparatusIcon";
import useStore from "../../store/store";

const StartlistView = () => {
  const { filteredAthletes } = useStore();

  // Group athletes by apparatus
  const groupedByApparatus = filteredAthletes.reduce((acc, athlete) => {
    if (!acc[athlete.apparatus]) {
      acc[athlete.apparatus] = [];
    }
    acc[athlete.apparatus].push(athlete);
    return acc;
  }, {});

  return (
    <Box>
      <FilterBar />

      {Object.entries(groupedByApparatus).length > 0 ? (
        <VStack spacing={6} align="stretch">
          {Object.entries(groupedByApparatus).map(([apparatus, athletes]) => (
            <Box key={apparatus}>
              <Flex
                alignItems="center"
                mb={3}
                bg="brand.background.tertiary"
                p={3}
                borderRadius="md"
              >
                <ApparatusIcon type={apparatus} size="md" />
                <Text ml={3} fontWeight="bold">
                  {mapApparatusToName(apparatus)}
                </Text>
              </Flex>

              <VStack spacing={3} align="stretch">
                {athletes.map((athlete) => (
                  <Flex
                    key={athlete.id}
                    bg="brand.background.secondary"
                    p={4}
                    borderRadius="md"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <HStack spacing={3}>
                      <CountryFlag countryCode={athlete.country} />
                      <Text fontWeight="medium">{athlete.bib}</Text>
                      <Text>{athlete.fullName}</Text>
                    </HStack>

                    <Box>
                      {athlete.status === "wait" && (
                        <Button variant="wait" size="sm">
                          Wait
                        </Button>
                      )}
                      {athlete.status === "go" && (
                        <Button variant="go" size="sm">
                          Go
                        </Button>
                      )}
                      {athlete.status === "completed" && (
                        <Text fontWeight="bold">{athlete.scores.total}</Text>
                      )}
                    </Box>
                  </Flex>
                ))}
              </VStack>
            </Box>
          ))}
        </VStack>
      ) : (
        <Box
          p={8}
          textAlign="center"
          bg="brand.background.secondary"
          borderRadius="md"
        >
          <Text color="brand.text.secondary">No startlist available</Text>
        </Box>
      )}
    </Box>
  );
};

// Helper function to map apparatus code to full name
const mapApparatusToName = (code) => {
  const apparatusMap = {
    floor: "Floor Exercise",
    pommel: "Pommel Horse",
    rings: "Rings",
    vault: "Vault",
    pbars: "Parallel Bars",
    hbar: "Horizontal Bar",
  };

  return apparatusMap[code] || code;
};

export default StartlistView;
