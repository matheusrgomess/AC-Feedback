import { Container, Heading, Button } from "@chakra-ui/react";
import SubmittedAvaliation from "../rate-participant-screen/components/printingAvaliations";
import { formatUserFeedbacks, formatUserFeedbacksCreated } from "../../utils/format-avaliations";

export default function Feedbacks() {
  const user = localStorage.getItem("user");
  const avaliations = JSON.parse(localStorage.getItem("avaliations") || "[]");
  const userAvaliations = formatUserFeedbacks(avaliations, user);
  const userAvaliationsCreated = formatUserFeedbacksCreated(avaliations, user);

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
        <Container bg="#1c222b" minH="300px" borderRadius="20px" padding="0px" position="relative"
          _after={{
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            width: "95%",
            height: "125px",
            background: "linear-gradient(to top, #1c222b, rgba(28, 34, 43, 0.85), rgba(28, 34, 43, 0.7), transparent)",
            borderBottomRadius: "20px",
            pointerEvents: "none"
          }}
        >
          <Container
            bgColor="#700e17"
            padding="5px"
            minW="100%"
            borderTopRadius="10px"
            borderBottomRadius="4px"
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
                  backgroundColor: "#700e17",
                  borderRadius: "10px",
                  width: "8px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: "#86111c",
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
        <Container bg="#1c222b" minH="300px" borderRadius="20px" padding="0px" position="relative"
          _after={{
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            width: "95%",
            height: "125px",
            background: "linear-gradient(to top, #1c222b, rgba(28, 34, 43, 0.85), rgba(28, 34, 43, 0.7), transparent)",
            borderBottomRadius: "20px",
            pointerEvents: "none"
          }}
        >
          <Container
            bgColor="#700e17"
            padding="5px"
            minW="100%"
            borderTopRadius="10px"
            borderBottomRadius="4px"
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
                  backgroundColor: "#700e17",
                  borderRadius: "10px",
                  width: "8px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: "#86111c",
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
