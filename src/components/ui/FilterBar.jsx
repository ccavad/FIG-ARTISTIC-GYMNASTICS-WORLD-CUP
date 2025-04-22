// src/components/ui/FilterBar.jsx
import React from "react";
import {
  HStack,
  Button,
  Box,
  Flex,
  Icon,
  Badge,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { SearchIcon, CloseIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import useStore from "../../store/store";

// Animation variants
const filterBarVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const filterButtonVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 },
  },
  exit: {
    opacity: 0,
    x: 10,
    scale: 0.9,
    transition: { duration: 0.2 },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2 },
  },
};

const FilterBar = () => {
  const { filters, setFilter, clearFilters } = useStore();
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Count active filters
  const activeFilterCount = Object.values(filters).filter(
    (value) => value !== null
  ).length;

  const filterOptions = {
    category: ["MAG", "WAG"],
    apparatus: [
      "Floor exercise",
      "Pommel horse",
      "Rings",
      "Vault",
      "Parallel bars",
      "Horizontal bar",
      "Uneven bars",
      "Balance beam",
    ],
    ageGroup: ["Seniors", "Juniors"],
    phase: ["Qualification", "Final"],
    discipline: ["All-around", "Apparatus", "Team"],
  };

  // Filter apparatus options based on selected category
  const apparatusOptions = filters.category
    ? filterOptions.apparatus.filter((app) => {
        if (filters.category === "MAG") {
          return !["Uneven bars", "Balance beam"].includes(app);
        } else if (filters.category === "WAG") {
          return ![
            "Pommel horse",
            "Rings",
            "Parallel bars",
            "Horizontal bar",
          ].includes(app);
        }
        return true;
      })
    : [];

  return (
    <motion.div variants={filterBarVariants} initial="hidden" animate="visible">
      <Box mb={4}>
        <Flex justifyContent="space-between" alignItems="center" mb={3}>
          {/* Active filter count */}
          <AnimatePresence>
            {activeFilterCount > 0 && (
              <motion.div
                variants={badgeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Badge colorScheme="blue" borderRadius="full" px={2}>
                  {activeFilterCount} active filter
                  {activeFilterCount !== 1 ? "s" : ""}
                </Badge>
              </motion.div>
            )}
          </AnimatePresence>

          <Flex gap={2}>
            {/* Clear filters button - only show if filters are active */}
            <AnimatePresence>
              {activeFilterCount > 0 && (
                <motion.div
                  variants={filterButtonVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button
                    rightIcon={<SmallCloseIcon />}
                    size="sm"
                    variant="outline"
                    onClick={clearFilters}
                  >
                    Clear
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Filter button */}
            <motion.div
              variants={filterButtonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                leftIcon={<SearchIcon />}
                variant="ghost"
                size="sm"
                colorScheme="blue"
              >
                Filter
              </Button>
            </motion.div>
          </Flex>
        </Flex>

        {/* Applied filters display */}
        <AnimatePresence>
          {activeFilterCount > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Flex flexWrap="wrap" gap={2} mb={3}>
                <AnimatePresence>
                  {Object.entries(filters).map(([key, value]) => {
                    if (value) {
                      return (
                        <motion.div
                          key={`${key}-${value}`}
                          variants={badgeVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          whileHover="hover"
                          layout
                        >
                          <Badge
                            colorScheme="blue"
                            borderRadius="full"
                            display="flex"
                            alignItems="center"
                            px={2}
                            py={1}
                          >
                            <Text fontSize="xs" fontWeight="medium">
                              {key}: {value}
                            </Text>
                            <motion.div whileHover={{ rotate: 90 }}>
                              <Icon
                                as={CloseIcon}
                                boxSize={2}
                                ml={1}
                                cursor="pointer"
                                onClick={() => setFilter(key, null)}
                              />
                            </motion.div>
                          </Badge>
                        </motion.div>
                      );
                    }
                    return null;
                  })}
                </AnimatePresence>
              </Flex>
            </motion.div>
          )}
        </AnimatePresence>

        <Box overflowX="auto">
          <HStack spacing={2} pb={2}>
            {/* Category filters */}
            <AnimatePresence>
              {filterOptions.category.map((category, index) => (
                <motion.div
                  key={category}
                  custom={index}
                  variants={filterButtonVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover="hover"
                  whileTap="tap"
                  transition={{ delay: index * 0.05 }}
                >
                  <FilterButton
                    label={category}
                    isActive={filters.category === category}
                    onClick={() => setFilter("category", category)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Age Group filters */}
            <AnimatePresence>
              {filterOptions.ageGroup.map((ageGroup, index) => (
                <motion.div
                  key={ageGroup}
                  custom={index + filterOptions.category.length}
                  variants={filterButtonVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover="hover"
                  whileTap="tap"
                  transition={{
                    delay: (index + filterOptions.category.length) * 0.05,
                  }}
                >
                  <FilterButton
                    label={ageGroup}
                    isActive={filters.ageGroup === ageGroup}
                    onClick={() => setFilter("ageGroup", ageGroup)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Show apparatus filters only when a category is selected */}
            <AnimatePresence>
              {filters.category &&
                apparatusOptions.map((apparatus, index) => (
                  <motion.div
                    key={apparatus}
                    variants={filterButtonVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    whileHover="hover"
                    whileTap="tap"
                    transition={{ delay: index * 0.05 }}
                  >
                    <FilterButton
                      label={apparatus}
                      isActive={filters.apparatus === apparatus}
                      onClick={() => setFilter("apparatus", apparatus)}
                    />
                  </motion.div>
                ))}
            </AnimatePresence>
          </HStack>
        </Box>
      </Box>
    </motion.div>
  );
};

// FilterButton component
const FilterButton = ({ label, isActive, onClick }) => {
  return (
    <Button
      size="sm"
      variant={isActive ? "solid" : "outline"}
      bg={isActive ? "brand.primary" : "transparent"}
      color={isActive ? "white" : "brand.text.primary"}
      borderColor={isActive ? "brand.primary" : "brand.border.primary"}
      borderRadius="full"
      onClick={onClick}
      px={3}
      py={1}
      height="auto"
      minW="auto"
      _hover={{
        bg: isActive ? "brand.primary" : "brand.background.tertiary",
        opacity: isActive ? 0.9 : 1,
      }}
      rightIcon={isActive ? <CloseIcon boxSize={2} /> : null}
    >
      {label}
    </Button>
  );
};

export default FilterBar;
