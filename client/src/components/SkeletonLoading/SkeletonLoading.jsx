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
      <Flex 
        gap={12} 
        justifyContent={"center"} 
        flexDir={"column"}
        ml={4}
      >
        <Skeleton height="60px" width={"600px"} />
        <Flex gap={12} justifyContent={"center"}>
          <Skeleton height="400px" width={"300px"} />
          <Skeleton height="400px" width={"300px"} />
          <Skeleton height="400px" width={"300px"} />
          <Skeleton height="400px" width={"300px"} />
          <Skeleton height="400px" width={"300px"} />
          <Skeleton height="400px" width={"300px"} />
        </Flex>
      </Flex>
    </Stack>
  );
};
