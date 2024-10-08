import { Container, Heading, Text, useColorMode } from "@chakra-ui/react";

export default function BoxObservations() {
 const { colorMode } = useColorMode()

  return (
    <Container
      bgColor="#2b3442"
      width="400px"
      height="180px"
      border="1px solid"
      borderColor={colorMode === "dark" ? "#3a3f4a" : "#ccc"}
      borderRadius="8px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      padding="20px"
      color="white"
    >
      <Heading as="h2" size="md" textAlign="center">
        "Obsercaçao de teste para mostrar o layout e era somente isso"
      </Heading>
      <Text color="#ccc" marginTop="10px">
        Juan Lima
      </Text>
    </Container>
  );
}
