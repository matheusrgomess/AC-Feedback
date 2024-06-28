import { Container, Heading, Button } from "@chakra-ui/react";
import SubmittedAvaliation from "../rate/components/printingAvaliations";
import {
  formatUserFeedbacks,
  formatUserFeedbacksCreated,
} from "../../utils/format-avaliations";
import { useState } from "react";
import ModalFilter from "./components/modalFilter";
import ModalUserSelect from "./components/modalUserSelect";

export default function Feedbacks() {
  const user = localStorage.getItem("user");
  const avaliations = JSON.parse(localStorage.getItem("avaliations") || "[]");
  const [openFilters, setOpenFilters] = useState(false);
  const [openUserFilter, setOpenUserFilter] = useState(false);
  const verifyAdm = localStorage.getItem("isAdmin") === "true";
  const [selectedUser, setSelectedUser] = useState(user);
  const [analyzingThisUser, setAnalyzingThisUser] = useState("");

  const handleOpenUserFilter = () => {
    setOpenUserFilter(true);
  }

  const handleCloseUserFilter = () => {
    setOpenUserFilter(false);
    setSelectedUser(analyzingThisUser || user)
  }

  const handleOpenFilters = () => {
    setOpenFilters(true);
  };

  const handleCloseFilters = () => {
    setOpenFilters(false);
  };

  const changingUser = (event) => {
    setSelectedUser(event.target.value)
  }

  const filtredUser = () => {
    handleCloseUserFilter()
    setAnalyzingThisUser(selectedUser)
  }

  const userAvaliations = formatUserFeedbacks(avaliations, analyzingThisUser || user);
  const userAvaliationsCreated = formatUserFeedbacksCreated(avaliations, analyzingThisUser || user);

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
      {verifyAdm ?
        <>
          <Button pos="absolute" top="200px" onClick={handleOpenUserFilter} background="transparent" border="1px solid" color="white" _hover={{}} _active={{ background: "rgba(0, 0, 0, 0.26)" }}>
            Filtrar por usuário
          </Button>
          <ModalUserSelect isOpen={openUserFilter} onClose={handleCloseUserFilter} user={user} selectedUser={selectedUser} filtredUser={filtredUser} analyzingThisUser={analyzingThisUser} changingUser={changingUser} />
        </> : null

      }
      <ModalFilter isOpen={openFilters} onClose={handleCloseFilters} />
      {userAvaliationsCreated && userAvaliationsCreated.length > 0 ? (
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
            >
              Filtrar
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
              <SubmittedAvaliation avaliations={userAvaliationsCreated} user={selectedUser} />
            </Container>
          </Container>
        </Container>
      ) : (
        <Container>
          <Heading color="grey">Nenhum Feedback Criado</Heading>
        </Container>
      )}
      {userAvaliations && userAvaliations.length > 0 ? (
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
            <Button variant="outline" colorScheme="white">
              Filtrar
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
              <SubmittedAvaliation avaliations={userAvaliations} user={selectedUser} />
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
