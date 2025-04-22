// src/components/views/ScheduleView.jsx
import React from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Flex,
  Heading,
  Divider,
} from "@chakra-ui/react";
import FilterBar from "../ui/FilterBar";
import useStore from "../../store/store";

const ScheduleView = () => {
  const { eventInfo } = useStore();

  // Mock schedule data
  const scheduleData = [
    {
      date: "12/03/2023",
      sessions: [
        {
          time: "09:00 - 12:00",
          title: "Men's Qualification - Group 1",
          apparatus: ["floor", "pommel", "rings"],
        },
        {
          time: "14:00 - 17:00",
          title: "Men's Qualification - Group 2",
          apparatus: ["vault", "pbars", "hbar"],
        },
      ],
    },
    {
      date: "13/03/2023",
      sessions: [
        {
          time: "09:00 - 12:00",
          title: "Women's Qualification",
          apparatus: ["vault", "bars", "beam", "floor"],
        },
        {
          time: "15:00 - 17:30",
          title: "All-Around Final - Men",
          apparatus: ["all"],
        },
      ],
    },
  ];

  return (
    <Box>
      <FilterBar />

      <VStack spacing={6} align="stretch">
        {scheduleData.map((day, index) => (
          <Box
            key={index}
            bg="brand.background.secondary"
            borderRadius="md"
            overflow="hidden"
          >
            <Box bg="brand.background.tertiary" p={4}>
              <Heading size="md">{day.date}</Heading>
            </Box>

            <VStack spacing={4} p={4} align="stretch">
              {day.sessions.map((session, idx) => (
                <Box key={idx}>
                  <HStack mb={2}>
                    <Text fontWeight="bold">{session.time}</Text>
                    <Divider orientation="vertical" height="20px" mx={2} />
                    <Text>{session.title}</Text>
                  </HStack>

                  <Flex gap={2} flexWrap="wrap">
                    {session.apparatus.map((app) => (
                      <Box
                        key={app}
                        bg="brand.background.tertiary"
                        px={3}
                        py={1}
                        borderRadius="full"
                        fontSize="sm"
                      >
                        {app === "all"
                          ? "All Apparatus"
                          : mapApparatusToName(app)}
                      </Box>
                    ))}
                  </Flex>
                </Box>
              ))}
            </VStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

// Same helper function as in StartlistView
const mapApparatusToName = (code) => {
  const apparatusMap = {
    floor: "Floor Exercise",
    pommel: "Pommel Horse",
    rings: "Rings",
    vault: "Vault",
    pbars: "Parallel Bars",
    hbar: "Horizontal Bar",
    bars: "Uneven Bars",
    beam: "Balance Beam",
  };

  return apparatusMap[code] || code;
};

export default ScheduleView;
