import {
  Container,
  Heading,
  Text,
  useColorMode,
  Input,
  Select,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { printQuestionSet } from "services/questionsSet";
import AnalyticsUsers from "./components/analyticsUsers";
import {
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getAddedFeedbacks } from "services/feedbacks";
import PrincipalSpinner from "components/Spinner";
import { listUsers } from "services/users";
import {
  BoxAverage,
  BoxInfoLists,
  BoxInfoNumbers,
} from "./components/boxInformations";

export default function Analytics() {
  const { colorMode } = useColorMode();
  const [groupSelected, setGroupSelected] = useState(null);
  const [allFeedbacks, setAllFeedbacks] = useState([]);
  const [filtredFeedbacks, setFiltredFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);

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

  const data01 = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
    { name: "Group E", value: 278 },
    { name: "Group F", value: 189 },
  ];

  const data = [
    {
      name: "Parte 1",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Parte 2",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Parte 3",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Parte 4",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Parte 5",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Parte 6",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Parte 7",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <>
    {loading ? (
          <Container minWidth="100%" minHeight="100%" display="flex" justifyContent="center" alignItems="center">
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
                {/*groupSelected && groupSelected.questionSetName*/}
              </Heading>
              <Container display="flex" alignItems="center" w="fit-content">
                <Text fontWeight="bold" whiteSpace="nowrap" mr="10px">
                  Período dos dados:
                </Text>
                <Input
                  type="date"
                  variant="flushed"
                  focusBorderColor="#971520"
                />
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
                <BoxAverage average={"2.35 de 10"} />
                <BoxInfoLists users={users} />
              </>
            </Container>
            <Container
              marginTop="30px"
              minWidth="100%"
              alignItems="center"
              justifyContent="space-between"
              display="grid"
              gridTemplateColumns="repeat(2, 1fr)"
            >
              <ResponsiveContainer width="80%" height="80%">
                <LineChart
                  width={500}
                  height={200}
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="pv"
                    stroke="#971520"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="uv"
                    stroke={colorMode === "dark" ? "white" : "black"}
                  />
                </LineChart>
              </ResponsiveContainer>
              <Container>
                <PieChart width={300} height={300}>
                  <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={data01}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#971520"
                    label
                  />
                </PieChart>
                <PieChart width={300} height={300}>
                  <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={data01}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#971520"
                    label
                  />
                </PieChart>
              </Container>
            </Container>
          </>
        )}
    </>
  );
}
