// src/App.jsx
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "./components/layout/Layout";
import LiveView from "./components/views/LiveView";
import StartlistView from "./components/views/StartlistView";
import ScheduleView from "./components/views/ScheduleView";
import ResultsView from "./components/views/ResultsView";
import MedalsView from "./components/views/MedalsView";
import theme from "./theme";
import useStore from "./store/store";

// Animation variants for page transitions
const pageVariants = {
  initial: {
    opacity: 0,
    x: 20,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.3,
    },
  },
};

function App() {
  const { activeTab } = useStore();

  // Render the appropriate view based on the active tab
  const renderView = () => {
    switch (activeTab) {
      case "live":
        return <LiveView />;
      case "startlist":
        return <StartlistView />;
      case "schedule":
        return <ScheduleView />;
      case "results":
        return <ResultsView />;
      case "medals":
        return <MedalsView />;
      default:
        return <LiveView />;
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </Layout>
    </ChakraProvider>
  );
}

export default App;
