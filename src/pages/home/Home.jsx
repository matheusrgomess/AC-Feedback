import React, { useCallback, useEffect, useState } from "react";
import { Container, Heading, Button, Text, Spinner } from "@chakra-ui/react";
import "react-toastify/dist/ReactToastify.css";
import SubmittedAvaliation from "../rate/components/submittedAvaliations";
import { useNavigate } from "react-router-dom";
import { getAddedFeedbacks, getReceivedFeedbacks } from "services/feedbacks";

export default function Home() {
  const [avaliationsAdded, setAvaliationsAdded] = useState();
  const [avaliationsReceived, setAvaliationsReceived] = useState();
  const user = JSON.parse(localStorage.getItem("user"));
  const verifyAdm = localStorage.getItem("isAdmin") === "true";
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  const fetchFeedbacks = useCallback(async () => {
    try {
   const responseAdded = await getAddedFeedbacks(user.name);
    const responseReceived = await getReceivedFeedbacks(user.name)
    setAvaliationsAdded(responseAdded.addedFeedbacks);
    setAvaliationsReceived(responseReceived.receivedFeedbacks);   
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

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
      {verifyAdm ? (
        <Container width="300px" textAlign="center">
          <Text color="#838c90">
            <strong>
              Você está em uma conta administradora, nela, é possível fazer
              alterações nos formulários e visualizar todas as avaliações
              armazenadas
            </strong>
          </Text>
        </Container>
      ) : (
        <>
          {loading ? (
            <Container
              minHeight="320px"
              maxH="300px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="relative"
              bottom="50"
            >
              <Spinner
                thickness="5px"
                width="75px"
                height="75px"
                speed="0.55s"
                emptyColor="white"
                color="#700e17"
              />
            </Container>
          ) : avaliationsAdded && avaliationsAdded.length > 0 ? (
            <Container
              bg="#1c222b"
              maxH="300px"
              borderRadius="20px"
              padding="0px"
              pos="relative"
              bottom="50"
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
                <Heading color="white">Últimas avaliações criadas:</Heading>
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
                >
                  <SubmittedAvaliation avaliations={avaliationsAdded} />
                  <Button
                    marginLeft="14px"
                    bgColor="#700e17"
                    color="white"
                    _active={{ bgColor: "#520a11" }}
                    _hover={{}}
                    onClick={() => {
                      nav("/home/feedbacks");
                    }}
                  >
                    Ver mais
                  </Button>
                </Container>
              </Container>
            </Container>
          ) : (
            <Container>
              <Heading color="grey">Nenhuma avaliação criada</Heading>
            </Container>
          )}

          {loading ? (
            <Container
              minHeight="320px"
              maxH="300px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="relative"
              bottom="50"
            >
              <Spinner
                thickness="5px"
                width="75px"
                height="75px"
                speed="0.55s"
                emptyColor="white"
                color="#700e17"
              />
            </Container>
          ) : avaliationsReceived && avaliationsReceived.length > 0 ? (
            <Container
              bg="#1c222b"
              maxH="300px"
              borderRadius="20px"
              padding="0px"
              pos="relative"
              bottom="50"
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
                <Heading color="white">Últimas avaliações recebidas:</Heading>
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
                >
                  <SubmittedAvaliation avaliations={avaliationsReceived} />
                  <Button
                    marginLeft="14px"
                    bgColor="#700e17"
                    color="white"
                    _hover={{}}
                    _active={{ bgColor: "#520a11" }}
                    onClick={() => {
                      nav("/home/feedbacks");
                    }}
                  >
                    Ver mais
                  </Button>
                </Container>
              </Container>
            </Container>
          ) : (
            <Container>
              <Heading color="grey">
                Nenhuma avaliação recebida por enquanto
              </Heading>
            </Container>
          )}
        </>
      )}
    </div>
  );
}
