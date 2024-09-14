import {
    Button,
    Container,
    Divider,
    Text,
    useColorMode,
  } from "@chakra-ui/react";
  import { useState, useEffect } from "react";
  import ModalSetGroup from "./components/modalSetGroup";
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
  import { formattingName } from "utils/formattingTexts";
  
  export default function Analytics() {
    const { colorMode } = useColorMode();
    const [isOpenSelectGroup, setIsOpenSelectGroup] = useState(false);
    const [groupSelected, setGroupSelected] = useState(null);
    const [allFeedbacks, setAllFeedbacks] = useState([]);
    const [filtredFeedbacks, setFiltredFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      const fetchGroups = async () => {
        try {
          const response = await printQuestionSet();
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
  
    useEffect(() => {
      if (groupSelected && allFeedbacks.length > 0) {
        const filtring = allFeedbacks.filter(
          (feedback) => feedback.questionSetName === groupSelected.questionSetName
        );
        setFiltredFeedbacks(filtring);
        console.log(filtring);
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
  
    const newGroupFiltred = async (selectedGroup) => {
      try {
        const response = await printQuestionSet();
        const filtringFeedbacks = response.questions.find(
          (group) => group.id === selectedGroup.id
        );
        if (filtringFeedbacks) {
          setGroupSelected(filtringFeedbacks);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    const onCloseSelectGroup = () => {
      setIsOpenSelectGroup(false);
    };
  
    const data01 = [
      { name: "Group A", value: 400 },
      { name: "Group B", value: 300 },
      { name: "Group C", value: 300 },
      { name: "Group D", value: 200 },
      { name: "Group E", value: 278 },
      { name: "Group F", value: 189 },
    ];
  
    return (
      <div
        style={{
          height: "inherit",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: "100px",
        }}
      >
        <Container
          minWidth="95%"
          minHeight="700px"
          bgColor={colorMode === "dark" ? "#14181E60" : "transparent"}
          border="1px solid"
          borderColor={colorMode === "dark" ? "transparent" : "black"}
          borderRadius="12px"
          padding="0px"
        >
          <Container
            minHeight="70px"
            minWidth="100%"
            display="flex"
            alignItems="center"
          >
            <Button
              background="transparent"
              onClick={() => setIsOpenSelectGroup(true)}
              border="1px solid"
              borderColor={colorMode === "dark" ? "white" : "#1c222b"}
              color={colorMode === "dark" ? "white" : "#1c222b"}
              _hover={{}}
              _active={{ background: "rgba(0, 0, 0, 0.26)" }}
              mr="10px"
            >
              Selecionar Grupo
            </Button>
            <Divider
              orientation="vertical"
              minH="40px"
              borderColor=""
              opacity="100%"
            />
            <Text fontSize="1rem" fontWeight="600" ml="10px">
              Análises sobre o grupo:{" "}
              {groupSelected && groupSelected.questionSetName}
            </Text>
          </Container>
          <Container
            minHeight="560px"
            minWidth="100%"
            display="flex"
            justifyContent="space-between"
            padding="0px"
          >
            <Container margin="0px" borderRight="1px solid">
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
                  <PrincipalSpinner />
                </Container>
              ) : (
                <>
                  <Text fontSize="1.4rem" marginBottom="50px">
                    Feedbacks criados no grupo:{" "}
                    <strong>
                      {filtredFeedbacks.length !== 0
                        ? filtredFeedbacks.length + " feedback(s)"
                        : "Nenhum Feedback"}
                    </strong>
                  </Text>
                  <Text fontSize="1.4rem" marginBottom="100px">
                    Média de todas as notas do grupo: Não calculado
                  </Text>
                  <Container
                    bgColor={colorMode === "dark" ? "#2b3442" : "transparent"}
                    borderRadius="12px"
                    margin="0px"
                    padding="0px"
                    paddingRight="5px"
                    minHeight="200px"
                    maxHeight="200px"
                    maxWidth="85%"
                    border="1px solid"
                    borderColor={colorMode === "dark" ? "transparent" : "black"}
                    paddingBottom="210px"
                  >
                    <Container padding="0px">
                      <Text fontSize="1.4rem" margin="0px">
                        <strong>Usuários que foram avaliados:</strong>
                      </Text>
                    </Container>
                    <Container
                      maxH="166px"
                      className="scrollbar"
                      overflow="hidden"
                      overflowY="auto"
                      minWidth="100%"
                      borderRadius="12px"
                    >
                      {users.map((user) => (
                        <Text fontSize="18px" key={user.id}>{formattingName(user.name)}</Text>
                      ))}
                    </Container>
                  </Container>
                </>
              )}
            </Container>
            <Container
              margin="0px"
              minWidth="63%"
              justifyContent="space-between"
              display="grid"
              gridTemplateColumns="repeat(2, 1fr)"
            >
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
              <ResponsiveContainer width="200%" height="100%">
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
                  <Line type="monotone" dataKey="uv" stroke={colorMode === "dark" ? "white" : "black"} />
                </LineChart>
              </ResponsiveContainer>
            </Container>
          </Container>
          <Container
            minHeight="70px"
            minWidth="100%"
            display="flex"
            alignItems="center"
          >
            <AnalyticsUsers />
          </Container>
        </Container>
        <ModalSetGroup
          isOpen={isOpenSelectGroup}
          onClose={onCloseSelectGroup}
          newGroupFiltred={newGroupFiltred}
          groupSelected={groupSelected}
        />
      </div>
    );
  }
  