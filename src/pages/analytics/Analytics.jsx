import {
  Container,
  Heading,
  Text,
  Input,
  Select,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { printQuestionSet } from "services/questionsSet";
import AnalyticsUsers from "./components/analyticsUsers";
import { getAddedFeedbacks } from "services/feedbacks";
import PrincipalSpinner from "components/Spinner";
import { listUsers } from "services/users";
import {
  BoxAverage,
  BoxInfoLists,
  BoxInfoNumbers,
} from "./components/boxInformations";
import PieGrafics from "./components/grafics/pieChart";
import CartesianChart from "./components/grafics/cartesianChart";
import BoxObservations from "./components/boxObservations";

export default function Analytics() {
  const [groupSelected, setGroupSelected] = useState(null);
  const [allFeedbacks, setAllFeedbacks] = useState([]);
  const [filtredFeedbacks, setFiltredFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [average, setAverage] = useState();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await printQuestionSet();
        setGroups(response.questions);
        const activatedGroup = response.questions.find(
          (group) => group.activatedSet === true
        );
        setGroupSelected(activatedGroup);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGroups();
  }, []);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await getAddedFeedbacks();
        setAllFeedbacks(response.addedFeedbacks);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFeedbacks();
  }, []);

  useEffect(() => {
    if (groupSelected && allFeedbacks.length > 0) {
      const filtring = allFeedbacks.filter(
        (feedback) => feedback.questionSetName === groupSelected.questionSetName
      );
      setFiltredFeedbacks(filtring);
      console.log(filtring);
      function averageAvaliationsFeedbacks() {
        let ratings = 0;
        let questions = 0;

        filtring.forEach((feedback) => {
          feedback.questions.forEach((question) => {
            ratings += question.rating;
            questions++;
          });
        });

        setAverage(questions > 0 ? (ratings / questions).toFixed(2) : 0);
      }
      averageAvaliationsFeedbacks();
    }
    async function findParticipants() {
      try {
        const response = await listUsers();
        setUsers(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    findParticipants();
  }, [groupSelected, allFeedbacks]);

  const newGroupFiltred = async (selectedGroupId) => {
    try {
      const response = await printQuestionSet();
      const filtringFeedbacks = response.questions.find(
        (group) => group.id === selectedGroupId
      );
      if (filtringFeedbacks) {
        setGroupSelected(filtringFeedbacks);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {loading ? (
        <Container
          minWidth="100%"
          minHeight="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <PrincipalSpinner />
        </Container>
      ) : (
        <>
          <Container
            minHeight="70px"
            minWidth="100%"
            display="flex"
            alignItems="center"
          >
            <Heading fontWeight="400" display="flex" alignItems="center">
              Análises sobre o grupo:{" "}
              <Select
                maxWidth="fit-content"
                border="none"
                fontSize="1.875rem"
                fontWeight="400"
                focusBorderColor="transparent"
                value={groupSelected?.id}
                onChange={(e) => {
                  newGroupFiltred(e.target.value);
                }}
              >
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.questionSetName}
                  </option>
                ))}
              </Select>
            </Heading>
            <Container display="flex" alignItems="center" w="fit-content">
              <Text fontWeight="bold" whiteSpace="nowrap" mr="10px">
                Período dos dados:
              </Text>
              <Input type="date" variant="flushed" focusBorderColor="#971520" />
            </Container>
            <AnalyticsUsers />
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
                title={
                  groupSelected &&
                  "Feedbacks criados no " + groupSelected.questionSetName
                }
                number={filtredFeedbacks.length}
                detailText={
                  filtredFeedbacks.length !== 0
                    ? filtredFeedbacks.length === 1
                      ? "Feedback"
                      : "Feedbacks"
                    : "Nenhum Feedback"
                }
              />
              <BoxAverage
                average={average + " de " + groupSelected?.numberOfStars}
              />
              <BoxInfoLists users={users} />
            </>
          </Container>
          <Container
            marginTop="30px"
            minWidth="100%"
            padding="0px"
            alignItems="center"
            display="grid"
            gridTemplateColumns="repeat(2, 2fr)"
          >
            <CartesianChart />
            <Container marginRight="60px">
              <Container
                bgColor="#2b3442"
                borderRadius="10px"
                padding="20px"
                mb="30px"
                display="flex"
              >
                <PieGrafics />
                <Heading color="white">Gráfico 1</Heading>
              </Container>
              <Container
                bgColor="#2b3442"
                borderRadius="10px"
                padding="20px"
                display="flex"
              >
                <PieGrafics />
                <Heading color="white">Gráfico 2</Heading>
              </Container>
            </Container>
          </Container>
          <Container minWidth="100%" height="400px" padding="0px" marginTop="45px">
            <Container
              minWidth="100%"
              maxHeight="fit-content"
              padding="0px"
              marginBottom="15px"
            >
              <Heading>Comentários:</Heading>
            </Container>
            <Container
              minWidth="100%"
              minHeight="90%"
              display="flex"
            >
              <BoxObservations />
              <BoxObservations />
              <BoxObservations />
            </Container>
          </Container>
        </>
      )}
    </>
  );
}
