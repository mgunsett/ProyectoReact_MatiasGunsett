import React from "react";
import { Skeleton, Stack, Flex } from "@chakra-ui/react";

export const SkeletonLoading = () => {
  return (
    <Stack padding={4} spacing={7}>
      <Skeleton 
        height='390px'
        padding='6'
        margin={5}
      />
      <Flex gap={12} justifyContent={"center"}>
        <Skeleton height="700px" width={"500px"} />
        <Skeleton height="700px" width={"500px"} />
        <Skeleton height="700px" width={"500px"} />
      </Flex>
    </Stack>
  );
};
