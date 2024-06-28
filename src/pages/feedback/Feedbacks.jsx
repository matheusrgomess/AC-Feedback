import { Container, Heading, Button, Modal, ModalOverlay, ModalContent, ModalHeader, CloseButton, ModalBody, Select, ModalFooter, Divider, Icon } from "@chakra-ui/react";
import SubmittedAvaliation from "../rate/components/printingAvaliations";
import {
  formatUserFeedbacks,
  formatUserFeedbacksCreated,
} from "../../utils/format-avaliations";
import { useState } from "react";
import ModalFilter from "./components/modalFilter";

export default function Feedbacks() {
  const user = localStorage.getItem("user");
  const avaliations = JSON.parse(localStorage.getItem("avaliations") || "[]");
  const [openFilters, setOpenFilters] = useState(false);
  const [openUserFilter, setOpenUserFilter] = useState(false);
  const verifyAdm = localStorage.getItem("isAdmin") === "true";
  const [selectedUser, setSelectedUser] = useState(user);
  const [analyzingThisUser, setAnalyzingThisUser] = useState("")

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

  const users = [
    { value: "admin", label: "Você" },
    { value: "arthur", label: "Arthur" },
    { value: "cilene", label: "Cilene" },
    { value: "dunia", label: "Dúnia" },
    { value: "eduardo", label: "Eduardo" },
    { value: "juan", label: "Juan" },
    { value: "matheus-eyng", label: "Matheus Eyng" },
    { value: "matheus-gomes", label: "Matheus Gomes" },
    { value: "pablo", label: "Pablo" },
    { value: "tomas", label: "Tomás" },
  ]

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
          <Modal isOpen={openUserFilter} onClose={handleCloseUserFilter} isCentered>
            <ModalOverlay />
            <ModalContent background="#212121" color="white" border="1px solid" borderColor="#ffffff">
              <ModalHeader display="flex" justifyContent="space-between">
                <Heading>Selecione um usuário<Icon w={3} position="relative" bottom="10px" _hover={{ cursor:"pointer" }} onClick={() => {console.log('click')}} /></Heading>
                <CloseButton onClick={handleCloseUserFilter} />
              </ModalHeader>
              <Container paddingLeft="15px" paddingRight="15px" paddingBottom="25px">
                <Divider borderColor="red" />
              </Container>
              <ModalBody>
                <Select
                  value={selectedUser}
                  onChange={changingUser}
                >
                  {users
                    .map(user => (
                      <option key={user.value} value={user.value} style={{ color: "black" }}>
                        {user.label}
                      </option>
                    ))}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button
                  mr={3}
                  onClick={handleCloseUserFilter}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={filtredUser}
                  colorScheme="red"
                  isDisabled={selectedUser === ""}
                >
                  Filtrar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
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
