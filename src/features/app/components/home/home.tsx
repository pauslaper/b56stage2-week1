import { Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { WhatHappen } from "./whatHappen";

export function Home() {
  const [isWhatHappenVisible, setIsWhatHappenVisible] = useState(true);

  useEffect(() => {
    setIsWhatHappenVisible(true);
  }, []);

  return (
    <Flex
      direction="column"
      width={`calc(100vw - 736px)`}
      bg="brand.bg"
      color="white"
      ml="325px"
      mr="430px"
    >
      {isWhatHappenVisible && <WhatHappen />}
    </Flex>
  );
}
