import { Box, Text, Container, useColorMode, Flex } from "@chakra-ui/react";
import { formattingName } from "utils/formattingTexts";

export function BoxInfoNumbers({ title, number, detailText }) {
  const { colorMode } = useColorMode();

  return (
    <Box
      bgColor={colorMode === "dark" ? "#2b3442" : "transparent"}
      color="white"
      padding="20px"
      borderRadius="10px"
      width="200px"
      border="1px solid"
      borderColor={colorMode === "dark" ? "transparent" : "black"}
    >
      <Text fontSize="1.1rem" textColor={colorMode === "dark" ? "white" : "black"} fontWeight="500" marginBottom="10px">
        {title}
      </Text>
      <Text fontSize="3rem" textColor={colorMode === "dark" ? "white" : "black"} fontWeight="bold">
        {number}
      </Text>
      <Text fontSize="1.1rem" textColor={colorMode === "dark" ? "white" : "black"} fontWeight="500">
        {detailText}
      </Text>
    </Box>
  );
}

export function BoxAverage({ average }) {
  const { colorMode } = useColorMode();

  return (
    <>
      <Box
        bgColor={colorMode === "dark" ? "#2b3442" : "transparent"}
        color="white"
        padding="20px"
        borderRadius="10px"
        width="350px"
        maxHeight="150px"
        border="1px solid"
        borderColor={colorMode === "dark" ? "transparent" : "black"}
      >
        <Text
          textColor={colorMode === "dark" ? "white" : "black"}
          fontSize={average === "Não calculado" ? "1.5rem" : "3rem"}
          fontWeight="bold"
          marginBottom="10px"
        >
          {average}
        </Text>
        <Text
          fontSize="1.1rem"
          fontWeight="500"
          textColor={colorMode === "dark" ? "white" : "black"}
        >
          Média de todas as notas do grupo
        </Text>
      </Box>
    </>
  );
}

export function BoxInfoLists({ users }) {
  const { colorMode } = useColorMode();

  return (
    <Container
      bgColor={colorMode === "dark" ? "#2b3442" : "transparent"}
      borderRadius="12px"
      margin="0px"
      padding="0px"
      marginRight="18px"
      paddingRight="5px"
      minHeight="200px"
      maxHeight="200px"
      maxWidth="35%"
      border="1px solid"
      borderColor={colorMode === "dark" ? "transparent" : "black"}
      paddingBottom="210px"
    >
      <Container padding="0px">
        <Text fontSize="1.4rem" margin="0px" marginLeft="10px">
          <strong>Usuários que foram avaliados:</strong>
        </Text>
      </Container>
      <Container
        maxH="166px"
        className="scrollbar"
        overflow="hidden"
        overflowY="auto"
        minWidth="100%"
        borderRadius="12px"
      >
        {users?.map((user) => (
          <Flex
            justifyContent="space-between"
            fontSize="18px"
            key={user.id}
            padding="5px 0"
            borderBottom="1px solid"
            borderColor={colorMode === "dark" ? "#3a3f4a" : "#ccc"}
          >
            <Box>
              {formattingName(user)}
            </Box>
            <Box>
              {user.solved}
            </Box>
          </Flex>
        ))}
      </Container>
    </Container>
  );
}