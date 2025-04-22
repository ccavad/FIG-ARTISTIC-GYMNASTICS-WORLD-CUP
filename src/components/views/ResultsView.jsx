// src/components/views/ResultsView.jsx
import React from "react";
import { Box, Flex, Button, HStack, Text } from "@chakra-ui/react";
import FilterBar from "../ui/FilterBar";
import ResultsTable from "../ui/ResultsTable";
import ApparatusIcon from "../ui/ApparatusIcon";
import useStore from "../../store/store";

const ResultsView = () => {
  const { filteredResults, eventInfo, filters, setFilter } = useStore();
  const [selectedApparatus, setSelectedApparatus] = React.useState("all");

  // Filter options based on the current context
  const apparatusOptions = [
    "all",
    "floor",
    "pommel",
    "rings",
    "vault",
    "pbars",
    "hbar",
  ];
  const categoryOptions = eventInfo.categories;
  const phaseOptions = eventInfo.phases;

  // Filter results by selected apparatus
  const filteredByApparatus =
    selectedApparatus === "all"
      ? filteredResults
      : filteredResults.filter((r) => r.apparatus === selectedApparatus);

  return (
    <Box>
      <FilterBar />

      {/* Apparatus selector */}
      <Flex
        overflowX="auto"
        mb={6}
        p={2}
        bg="brand.background.secondary"
        borderRadius="md"
      >
        <HStack spacing={1} width="100%" justifyContent="space-between">
          {apparatusOptions.map((app) => (
            <Button
              key={app}
              variant={selectedApparatus === app ? "solid" : "ghost"}
              bg={selectedApparatus === app ? "brand.primary" : "transparent"}
              onClick={() => setSelectedApparatus(app)}
              p={3}
              borderRadius="md"
              flex="1"
              minW="auto"
            >
              {app === "all" ? <Text>All</Text> : <ApparatusIcon type={app} />}
            </Button>
          ))}
        </HStack>
      </Flex>

      {/* Category toggles */}
      <HStack spacing={4} mb={4}>
        {categoryOptions.map((category) => (
          <Button
            key={category}
            variant={filters.category === category ? "solid" : "outline"}
            onClick={() => setFilter("category", category)}
            size="sm"
          >
            {category}
          </Button>
        ))}
      </HStack>

      {/* Results table */}
      <ResultsTable results={filteredByApparatus} />
    </Box>
  );
};

export default ResultsView;
