// src/components/views/LiveView.jsx
import React from "react";
import { Box, VStack, Text } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import ScoreCard from "../ui/ScoreCard";
import FilterBar from "../ui/FilterBar";
import useStore from "../../store/store";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const emptyStateVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { delay: 0.2, duration: 0.4 },
  },
};

const LiveView = () => {
  const { filteredAthletes } = useStore();

  // Filter athletes to show only those in "wait", "go", or recently completed status
  const liveAthletes = filteredAthletes.filter(
    (athlete) =>
      athlete.status === "wait" ||
      athlete.status === "go" ||
      athlete.status === "completed"
  );

  // Sort by status: "go" first, then "wait", then "completed"
  const sortedAthletes = [...liveAthletes].sort((a, b) => {
    const statusOrder = { go: 0, wait: 1, completed: 2 };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  // Add pulse animation for "go" status athletes
  const isAnyAthleteGo = sortedAthletes.some(
    (athlete) => athlete.status === "go"
  );

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <Box>
        <FilterBar />

        {sortedAthletes.length > 0 ? (
          <VStack spacing={4} align="stretch">
            <AnimatePresence>
              {sortedAthletes.map((athlete, index) => (
                <motion.div
                  key={athlete.id}
                  custom={index}
                  initial="hidden"
                  variants={itemVariants}
                  exit={{ opacity: 0, y: -20 }}
                  // Combined animate property that includes variants and conditional glow effect
                  animate={
                    athlete.status === "go"
                      ? {
                          ...itemVariants.visible,
                          boxShadow: [
                            "0px 0px 0px rgba(0, 200, 81, 0)",
                            "0px 0px 15px rgba(0, 200, 81, 0.7)",
                            "0px 0px 0px rgba(0, 200, 81, 0)",
                          ],
                        }
                      : "visible"
                  }
                  // Combined transition property for all animations
                  transition={{
                    delay: index * 0.05,
                    duration: 0.4,
                    boxShadow:
                      athlete.status === "go"
                        ? { repeat: Infinity, duration: 2 }
                        : undefined,
                  }}
                >
                  <ScoreCard athlete={athlete} />
                </motion.div>
              ))}
            </AnimatePresence>
          </VStack>
        ) : (
          <motion.div
            variants={emptyStateVariants}
            initial="hidden"
            animate="visible"
          >
            <Box
              p={8}
              textAlign="center"
              bg="brand.background.secondary"
              borderRadius="md"
            >
              <Text color="brand.text.secondary">
                No live competitions at the moment
              </Text>
            </Box>
          </motion.div>
        )}
      </Box>
    </motion.div>
  );
};

export default LiveView;
