// src/components/ui/ApparatusIcon.jsx
import React from "react";
import { Box, Icon } from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import Apparatus1 from "../../../public/assets/images/Apparatus1.png";
import Apparatus2 from "../../../public/assets/images/Apparatus2.png";
import Apparatus3 from "../../../public/assets/images/Apparatus3.png";
import Apparatus4 from "../../../public/assets/images/Apparatus4.png";
import Apparatus5 from "../../../public/assets/images/Apparatus5.png";
import Apparatus6 from "../../../public/assets/images/Apparatus6.png";

const ApparatusIcon = ({ type, size = "md" }) => {
  const sizeMap = {
    sm: "16px",
    md: "24px",
    lg: "32px",
  };

  const iconSize = sizeMap[size] || sizeMap.md;

  // Map apparatus type to appropriate Chakra UI icon
  const getIcon = () => {
    switch (type) {
      case "floor":
        return Apparatus1;
      case "pommel":
        return Apparatus2;
      case "rings":
        return Apparatus3;
      case "vault":
        return Apparatus4;
      case "pbars":
        return Apparatus5;
      case "hbar":
        return Apparatus6;
      default:
        return <ViewIcon color="gray.400" />;
    }
  };

  return (
    <Box
      width={iconSize}
      height={iconSize}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <img src={getIcon()} />
    </Box>
  );
};

export default ApparatusIcon;
