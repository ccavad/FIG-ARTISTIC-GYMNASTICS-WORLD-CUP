// src/hooks/useResponsive.js
import { useBreakpointValue } from "@chakra-ui/react";

/**
 * Custom hook to get responsive values based on screen size
 * @returns {Object} - Object with boolean flags for different screen sizes
 */
export const useResponsive = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const isTablet = useBreakpointValue({ base: false, md: true, lg: false });
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargerThanMobile: !isMobile,
    isSmallerThanTablet: isMobile,
    isSmallerThanDesktop: isMobile || isTablet,
  };
};
