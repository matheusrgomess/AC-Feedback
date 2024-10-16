import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Text,
  Heading,
  Container,
  Input,
  Box,
  useColorMode,
} from "@chakra-ui/react";
import { formattingName } from "utils/formattingTexts";
import { listAllUsers } from "services/users";
import PrincipalSpinner from "components/Spinner";
import { BoxInfoNumbers } from "pages/analytics/components/boxInformations";

function AnalyticsUserSelect() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const { user, filtredFeedbacks, groupSelected } = location.state;
  const [matchedUser, setMatchedUser] = useState(null);
  const { colorMode } = useColorMode();
  const [userFeedbacks, setUserFeedbacks] = useState([]);

  async function findParticipants() {
    try {
      const response = await listAllUsers();
      const foundUser = response.find(
        (participant) => user === participant.name
      );
      if (foundUser) {
        setMatchedUser(foundUser);

        const filteredUserFeedbacks = filtredFeedbacks.filter(
          (feedback) => feedback.reviewed === user
        );
        setUserFeedbacks(filteredUserFeedbacks);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    findParticipants();
  }, []);

  return (
    <>
      {loading ? (
        <Container
          minHeight="90vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <PrincipalSpinner />
        </Container>
      ) : (
        <>
          <Container
            paddingTop="10px"
            minHeight="70px"
            minWidth="100%"
            display="flex"
            alignItems="center"
          >
            <Container
              margin="0px"
              padding="0px"
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
            >
              <Heading>{formattingName(matchedUser?.name)}</Heading>
              <Text
                fontSize="16px"
                textColor="rgba(113, 128, 150, 0.6)"
                position="relative"
                bottom="6px"
              >
                <strong style={{ textTransform: "uppercase" }}>
                  {matchedUser?.userType === "ADMIN"
                    ? "administrador"
                    : "participante"}
                </strong>
              </Text>
            </Container>
            <Box fontSize="18px">
              <Text fontWeight="bold">Grupo Selecionado:</Text>
              <Text>{groupSelected?.questionSetName}</Text>
            </Box>
            <Container display="flex" alignItems="center" w="fit-content">
              <Text
                fontWeight="bold"
                whiteSpace="nowrap"
                mr="10px"
                fontSize="18px"
              >
                Período dos dados:
              </Text>
              <Input type="date" variant="flushed" focusBorderColor="#971520" />
            </Container>
          </Container>
          <Container
            padding="0px"
            paddingLeft="50px"
            paddingRight="50px"
            maxHeight="300px"
            minWidth="100%"
            display="flex"
            justifyContent="space-between"
          >
            <>
              <BoxInfoNumbers
                title={"Feedbacks para " + formattingName(matchedUser?.name)}
                number={userFeedbacks.length}
                detailText={"Feedbacks"}
              />
              <div>
                <p>Informações do usuário encontrado:</p>
                <pre>{JSON.stringify(matchedUser, null, 2)}</pre>
              </div>
            </>
          </Container>
        </>
      )}
    </>
  );
}

export default AnalyticsUserSelect;
