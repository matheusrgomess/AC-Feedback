/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Heading, Button } from "@chakra-ui/react";
import SubmittedAvaliation from "../rate/components/submittedAvaliations";
import { useCallback, useEffect, useState } from "react";
import ModalFilter from "./components/modalFilter";
import ModalUserSelect from "./components/modalUserSelect";
import { CalendarIcon } from "@chakra-ui/icons";
import { getAddedFeedbacks, getReceivedFeedbacks } from "services/feedbacks";

export default function Feedbacks() {
  const [avaliationsAdded, setAvaliationsAdded] = useState();
  const [avaliationsReceived, setAvaliationsReceived] = useState();
  const user = JSON.parse(localStorage.getItem("user"));
  const [openFilters, setOpenFilters] = useState(false);
  const [openUserFilter, setOpenUserFilter] = useState(false);
  const verifyAdm = localStorage.getItem("isAdmin") === "true";
  const [selectedUser, setSelectedUser] = useState(user.name);

  const fetchFeedbacks = useCallback(async (selectedUser) => {
    const responseAdded = selectedUser && (await getAddedFeedbacks(selectedUser));
    const responseReceived = selectedUser && (await getReceivedFeedbacks(selectedUser));
    setAvaliationsAdded(responseAdded.addedFeedbacks);
    setAvaliationsReceived(responseReceived.receivedFeedbacks);
  }, []);

  const handleOpenUserFilter = () => {
    setOpenUserFilter(true);
  };

  const handleCloseUserFilter = () => {
    setOpenUserFilter(false);
  };

  const handleOpenFilters = () => {
    setOpenFilters(true);
  };

  const handleCloseFilters = () => {
    setOpenFilters(false);
  };

  useEffect(() => {
    fetchFeedbacks(selectedUser);
  }, [selectedUser]);

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
        <>
          <Button
            pos="absolute"
            top="200px"
            onClick={handleOpenUserFilter}
            background="transparent"
            border="1px solid"
            color="white"
            _hover={{}}
            _active={{ background: "rgba(0, 0, 0, 0.26)" }}
          >
            Filtrar por usuário
          </Button>
          <ModalUserSelect
            isOpen={openUserFilter}
            onClose={handleCloseUserFilter}
            setSelectedUser={setSelectedUser}
          />
        </>
      ) : null}
      <ModalFilter isOpen={openFilters} onClose={handleCloseFilters} />
      {avaliationsAdded && avaliationsAdded.length > 0 ? (
        <Container
          bg="#1c222b"
          maxH="300px"
          borderRadius="20px"
          padding="0px"
          position="relative"
          pos="relative"
          bottom="50"
          _after={{
            content: '""',
            position: "absolute",
            top: 300,
            bottom: 0,
            left: 0,
            right: 0,
            width: "95%",
            height: "75px",
            background:
              "linear-gradient(to top, #1c222b, rgba(28, 34, 43, 0.85), rgba(28, 34, 43, 0.7), transparent)",
            borderBottomRadius: "20px",
            pointerEvents: "none",
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
            <Heading>Avaliações criadas:</Heading>
            <Button
              variant="outline"
              colorScheme="white"
              onClick={handleOpenFilters}
              padding="0px"
            >
              <CalendarIcon />
            </Button>
          </Container>
          <Container padding="8px">
            <Container
              className="scrollbar"
              padding="10px"
              paddingBottom="50px"
              paddingTop="15px"
              maxW="100%"
              maxH="306px"
              overflow="hidden"
              overflowY="auto"
            >
              <SubmittedAvaliation
                avaliations={avaliationsAdded}
              />
            </Container>
          </Container>
        </Container>
      ) : (
        <Container>
          <Heading color="grey">Nenhum Feedback Criado</Heading>
        </Container>
      )}
      {avaliationsReceived && avaliationsReceived.length > 0 ? (
        <Container
          bg="#1c222b"
          maxH="300px"
          borderRadius="20px"
          padding="0px"
          position="relative"
          pos="relative"
          bottom="50"
          _after={{
            content: '""',
            position: "absolute",
            top: 300,
            bottom: 0,
            left: 0,
            right: 0,
            width: "95%",
            height: "75px",
            background:
              "linear-gradient(to top, #1c222b, rgba(28, 34, 43, 0.85), rgba(28, 34, 43, 0.7), transparent)",
            borderBottomRadius: "20px",
            pointerEvents: "none",
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
            <Heading>Avaliações recebidas:</Heading>
            <Button
              variant="outline"
              colorScheme="white"
              onClick={handleOpenFilters}
              padding="0px"
            >
              <CalendarIcon />
            </Button>
          </Container>
          <Container padding="8px">
            <Container
              className="scrollbar"
              padding="10px"
              paddingTop="15px"
              paddingBottom="50px"
              maxW="100%"
              maxH="306px"
              overflow="hidden"
              overflowY="auto"
            >
              <SubmittedAvaliation avaliations={avaliationsReceived} />
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
