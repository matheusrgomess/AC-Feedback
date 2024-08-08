import { Container, Heading, Button, Box, Select, useColorMode } from "@chakra-ui/react";
import SubmittedAvaliation from "../rate/components/submittedAvaliations";
import { useEffect, useState } from "react";
import ModalFilter from "./components/modalFilter";
import ModalGroupSelect from "./components/modalGroupSelect";
import { CalendarIcon } from "@chakra-ui/icons";
import { getAddedFeedbacks, getReceivedFeedbacks } from "services/feedbacks";
import { listUsers } from "services/users";
import { formattingName } from "utils/formattingTexts";
import PrincipalSpinner from "components/Spinner";

export default function Feedbacks() {
  const [avaliationsAdded, setAvaliationsAdded] = useState();
  const [avaliationsReceived, setAvaliationsReceived] = useState();
  const user = JSON.parse(localStorage.getItem("user"));
  const [openFilters, setOpenFilters] = useState(false);
  const [openUserFilter, setOpenUserFilter] = useState(false);
  const verifyAdm = localStorage.getItem("isAdmin") === "true";
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [selectUserAdded, setSelectUserAdded] = useState("");
  const [selectUserReceived, setSelectUserReceived] = useState("");
  const { colorMode } = useColorMode();

  const colorGradientBackGround = colorMode === "dark" ?
    "linear-gradient(to top, #1c222b, rgba(28, 34, 43, 0.85), rgba(28, 34, 43, 0.7), transparent)" :
    "linear-gradient(to top, #ffffff, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.7), transparent)";

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
    const findParticipants = async () => {
      try {
        const response = await listUsers();
        setUsers(response);

      } catch (error) {
        console.log(error);
      }
    }
    findParticipants();
  }, []);

  useEffect(() => {
    userFeedbacksReceived(user.name);
    userFeedbacksAdded(user.name);
  }, [user.name]);

  const userFeedbacksAdded = async (selectedUserAdded) => {
    try {
      const responseAdded = selectedUserAdded && (await getAddedFeedbacks(selectedUserAdded));
      setAvaliationsAdded(responseAdded.addedFeedbacks)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const userFeedbacksReceived = async (selectedUserReceived) => {
    try {
      const responseReceived = selectedUserReceived && (await getReceivedFeedbacks(selectedUserReceived));
      setAvaliationsReceived(responseReceived.receivedFeedbacks)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const newGroupFiltred = async (selectedGroup) => {
    try {
      const responseNewGroupAdded = await getAddedFeedbacks(selectUserAdded === "" ? user.name : selectUserAdded, selectedGroup);
      const responseNewGroupReceived = await getReceivedFeedbacks(selectUserReceived === "" ? user.name : selectUserAdded, selectedGroup);
      setAvaliationsAdded(responseNewGroupAdded.addedFeedbacks);
      setAvaliationsReceived(responseNewGroupReceived.receivedFeedbacks);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

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
            _hover={{}}
            _active={{ background: "rgba(0, 0, 0, 0.26)" }}
          >
            Filtrar por grupo
          </Button>
          <ModalGroupSelect
            isOpen={openUserFilter}
            onClose={handleCloseUserFilter}
            setLoading={setLoading}
            newGroupFiltred={newGroupFiltred}
          />
        </>
      ) : null}
      <ModalFilter isOpen={openFilters} onClose={handleCloseFilters} />
      {loading ?
        <Container minHeight="320px" maxH="300px" display="flex" alignItems="center" justifyContent="center" position="relative" bottom="50">
          <PrincipalSpinner/>
        </Container>
        :
        <Container
          maxH="300px"
          borderRadius="20px"
          padding="0px"
          position="relative"
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
            background: colorGradientBackGround,
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
            <Heading fontSize="30px">Avaliações criadas:</Heading>
            {verifyAdm ? <Box display="flex" minWidth="40%">
              <Select _focus={{ boxShadow: "none" }} borderColor="transparent" _hover={{}} focusBorderColor="white" marginRight="20px" value={selectUserAdded} onChange={(e) => { setSelectUserAdded(e.target.value); userFeedbacksAdded(e.target.value) }}>
                <option
                  key={user.name}
                  value={user.name}
                  style={{ color: "black" }}
                >
                  Você
                </option>
                {users.map((user) => (
                  <option
                    key={user.name}
                    value={user.name}
                    style={{ color: "black" }}
                  >
                    {formattingName(user.name)}
                  </option>
                ))}
              </Select>
              <Button
                variant="outline"
                colorScheme="white"
                onClick={handleOpenFilters}
                padding="0px"
              >
                <CalendarIcon />
              </Button>
            </Box> : <Button
              variant="outline"
              colorScheme="white"
              onClick={handleOpenFilters}
              padding="0px"
            >
              <CalendarIcon />
            </Button>}


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
              {avaliationsAdded && avaliationsAdded.length > 0 ? (
                <SubmittedAvaliation
                  avaliations={avaliationsAdded}
                />) : (
                <Container>
                  <Heading color="grey" marginTop="126px">Nenhum Feedback Criado</Heading>
                </Container>)}
            </Container>
          </Container>
        </Container>
      }

      {
        loading ?
          <Container minHeight="320px" maxH="300px" display="flex" alignItems="center" justifyContent="center" position="relative" bottom="50">
            <PrincipalSpinner/>
          </Container>
          :
          <Container
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
              background: colorGradientBackGround,
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
              <Heading fontSize="30px">Avaliações recebidas:</Heading>
              {verifyAdm ? <Box display="flex" minWidth="40%">
                <Select _focus={{ boxShadow: "none" }} borderColor="transparent" _hover={{}} focusBorderColor="white" marginRight="20px" value={selectUserReceived} onChange={(e) => { setSelectUserReceived(e.target.value); userFeedbacksReceived(e.target.value) }}>
                  <option
                    key={user.name}
                    value={user.name}
                    style={{ color: "black" }}
                  >
                    Você
                  </option>
                  {users.map((user) => (
                    <option
                      key={user.name}
                      value={user.name}
                      style={{ color: "black" }}
                    >
                      {formattingName(user.name)}
                    </option>
                  ))}
                </Select>
                <Button
                  variant="outline"
                  colorScheme="white"
                  onClick={handleOpenFilters}
                  padding="0px"
                >
                  <CalendarIcon />
                </Button>
              </Box> : <Button
                variant="outline"
                colorScheme="white"
                onClick={handleOpenFilters}
                padding="0px"
              >
                <CalendarIcon />
              </Button>}

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
              >{avaliationsReceived && avaliationsReceived.length > 0 ? (
                <SubmittedAvaliation avaliations={avaliationsReceived} />
              ) : (
                <Container>
                  <Heading color="grey" marginTop="126px">Nenhum Feedback Recebido</Heading>
                </Container>
              )}
              </Container>
            </Container>
          </Container>

      }

    </div >
  );
}
