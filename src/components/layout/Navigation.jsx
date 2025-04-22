// src/components/layout/Navigation.jsx
import React from "react";
import { Flex, Button, Box, useBreakpointValue } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import useStore from "../../store/store";

// Animation variants
const tabVariants = {
  hover: {
    y: -2,
    transition: { duration: 0.2 },
  },
  tap: {
    y: 0,
    transition: { duration: 0.1 },
  },
};

const indicatorVariants = {
  initial: {
    width: 0,
    opacity: 0,
  },
  animate: {
    width: "100%",
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const liveIndicatorVariants = {
  pulse: {
    scale: [1, 1.2, 1],
    backgroundColor: ["#FF0000", "#FF5555", "#FF0000"],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};

const Navigation = () => {
  const { activeTab, setActiveTab } = useStore();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const tabs = [
    { id: "live", label: "Live" },
    { id: "startlist", label: "Startlist" },
    { id: "schedule", label: "Schedule" },
    { id: "results", label: "Results" },
    { id: "medals", label: "Medals" },
  ];

  return (
    <Box
      overflowX="auto"
      borderBottomWidth="1px"
      borderBottomColor="brand.border.primary"
    >
      <Flex>
        <AnimatePresence>
          {tabs.map((tab) => (
            <Box
              key={tab.id}
              position="relative"
              px={4}
              pb={2}
              color={
                activeTab === tab.id
                  ? "brand.text.primary"
                  : "brand.text.secondary"
              }
              fontWeight={activeTab === tab.id ? "bold" : "normal"}
            >
              <motion.div
                variants={tabVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  variant="ghost"
                  onClick={() => setActiveTab(tab.id)}
                  _hover={{ bg: "transparent" }}
                  _active={{ bg: "transparent" }}
                  height="auto"
                  p={2}
                  display="flex"
                  alignItems="center"
                >
                  {tab.label}

                  {tab.id === "live" && (
                    <motion.div
                      variants={liveIndicatorVariants}
                      animate="pulse"
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "red",
                        marginLeft: "8px",
                        display: "inline-block",
                      }}
                    />
                  )}
                </Button>
              </motion.div>

              {/* Animated underline indicator */}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="tabIndicator"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    backgroundColor: "#0096FF",
                    borderRadius: "1px",
                  }}
                  initial="initial"
                  animate="animate"
                  variants={indicatorVariants}
                />
              )}
            </Box>
          ))}
        </AnimatePresence>
      </Flex>
    </Box>
  );
};

export default Navigation;
