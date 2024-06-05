import React from "react";
import { Box, Container, Link, Heading, Button } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import "react-toastify/dist/ReactToastify.css";
import {
  formatUserFeedbacks,
  formatUserFeedbacksCreated,
} from "../../utils/format-avaliations";
import SubmittedAvaliation from "../rate-participant-screen/components/printingAvaliations";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const user = localStorage.getItem("user");
  const avaliations = JSON.parse(localStorage.getItem("avaliations") || "[]");
  const userAvaliations = formatUserFeedbacks(avaliations, user);
  const userAvaliationsCreated = formatUserFeedbacksCreated(avaliations, user);

  const nav = useNavigate();

  return (
    <div style={{ maxHeight: "100vh" }}>
      <Box
        as="main"
        minH="83vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {userAvaliationsCreated && userAvaliationsCreated.length > 0 ? (
          <Container
            bg="#ffffff"
            minH="300px"
            borderRadius="20px"
            padding="10px"
          >
            <Heading color="#000000">Últimas avaliações criadas:</Heading>
            <SubmittedAvaliation avaliations={userAvaliationsCreated} />
            <Button
              colorScheme="red"
              onClick={() => {
                nav("/home/feedbacks");
              }}
            >
              Ver mais
            </Button>
          </Container>
        ) : (
          <Container>
            <Heading color="grey">Nenhuma avaliacao criada</Heading>
          </Container>
        )}
        {userAvaliations && userAvaliations.length > 0 ? (
          <Container
            bg="#ffffff"
            minH="300px"
            borderRadius="20px"
            padding="10px"
          >
            <Heading color="#000000">Últimas avaliações recebidas:</Heading>
            <SubmittedAvaliation avaliations={userAvaliations} />
            <Button
              colorScheme="red"
              onClick={() => {
                nav("/home/feedbacks");
              }}
            >
              Ver mais
            </Button>
          </Container>
        ) : (
          <Container>
            <Heading color="grey">
              Nenhuma avaliacao recebida por enquanto
            </Heading>
          </Container>
        )}
      </Box>
      <Box
        as="footer"
        minH="7vh"
        display="flex"
        alignItems="center"
        paddingLeft="30px"
      >
        <Link
          href="https://dev.azure.com/acertsisdesenvolvimento"
          bgColor="#1c222b"
          color="#ffffff"
          padding="5px"
          borderRadius="15px"
          fontSize="15pt"
          isExternal
        >
          Azure DevOps <ExternalLinkIcon mx="2px" w={6} h={6} />
        </Link>
      </Box>
    </div>
  );
}
