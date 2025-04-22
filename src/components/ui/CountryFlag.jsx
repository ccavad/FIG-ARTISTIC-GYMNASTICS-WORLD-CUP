// src/components/ui/CountryFlag.jsx
import React from "react";
import { Box, Image } from "@chakra-ui/react";

const CountryFlag = ({ countryCode, size = "md" }) => {
  const sizeMap = {
    sm: "16px",
    md: "24px",
    lg: "32px",
  };

  const height = sizeMap[size] || sizeMap.md;

  return (
    <Box
      height={height}
      width={`calc(${height} * 1.5)`}
      overflow="hidden"
      borderRadius="sm"
    >
      <Image
        src={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`}
        alt={`${countryCode} flag`}
        width="100%"
        height="100%"
        objectFit="cover"
      />
    </Box>
  );
};

export default CountryFlag;
