import { Container, Heading, Button } from "@chakra-ui/react";
import SubmittedAvaliation from "../rate-participant-screen/components/printingAvaliations";

export default function Feedbacks() {
  const user = localStorage.getItem("user");
  const avaliations = JSON.parse(localStorage.getItem("avaliations"));
  const userAvaliations = avaliations.filter(
    (avaliation) => avaliation.reviewed === user
  );
  const userAvaliationsCreated = avaliations.filter(
    (avaliations) => avaliations.reviewer === user
  );

  return (
    <div
      style={{
        height: "inherit",
        color: "white",
        backgroundColor: "1c222b",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {userAvaliationsCreated && userAvaliationsCreated.length > 0 ? (
        <Container bg="#26272d" minH="300px" borderRadius="20px" padding="0px">
          <Container
            bgColor="red"
            padding="5px"
            minW="100%"
            borderTopRadius="20px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Heading>Avaliações Criadas:</Heading>
            <Button variant="outline" colorScheme="white">
              Filtrar
            </Button>
          </Container>
          <Container padding="8px">
            <Container
              className="scrollbar"
              padding="10px"
              paddingTop="15px"
              maxW="100%"
              maxH="306px"
              overflow="hidden"
              overflowY="auto"
              css={{
                "&::-webkit-scrollbar": {
                  backgroundColor: "#ffffff",
                  borderRadius: "10px",
                  width: "8px",
                  direction: "rtl",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#1f1f1f",
                  borderRadius: "10px",
                  width: "8px",
                  transition: "background-color 0.5s ease",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: "#2c2c2c",
                },
              }}
            >
              <SubmittedAvaliation avaliations={userAvaliationsCreated} />
            </Container>
          </Container>
        </Container>
      ) : (
        <Container>
          <Heading color="grey">Nenhum Feedback Criado</Heading>
        </Container>
      )}
      {userAvaliations && userAvaliations.length > 0 ? (
        <Container bg="#26272d" minH="300px" borderRadius="20px" padding="0px">
          <Container
            bgColor="red"
            padding="5px"
            minW="100%"
            borderTopRadius="20px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Heading>Avaliações Recebidas:</Heading>
            <Button variant="outline" colorScheme="white">
              Filtrar
            </Button>
          </Container>
          <Container padding="8px">
            <Container
              className="scrollbar"
              padding="10px"
              paddingTop="15px"
              maxW="100%"
              maxH="306px"
              overflow="hidden"
              overflowY="auto"
              css={{
                "&::-webkit-scrollbar": {
                  backgroundColor: "#ffffff",
                  borderRadius: "10px",
                  width: "8px",
                  direction: "rtl",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#1f1f1f",
                  borderRadius: "10px",
                  width: "8px",
                  transition: "background-color 0.5s ease",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: "#2c2c2c",
                },
              }}
            >
              <SubmittedAvaliation avaliations={userAvaliations} />
            </Container>
          </Container>
        </Container>
      ) : (
        <Container>
          <Heading color="grey">Nenhum Feedback Recebido</Heading>
        </Container>
      )}
    </div>
  );
}
