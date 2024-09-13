import { Button, Container, Divider, Text, useColorMode } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import ModalSetGroup from "./components/modalSetGroup";
import { printQuestionSet } from "services/questionsSet";
import AnalyticsUsers from "./components/analyticsUsers";
import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import { getAddedFeedbacks } from "services/feedbacks";

export default function Analytics() {
    const { colorMode } = useColorMode();
    const [isOpenSelectGroup, setIsOpenSelectGroup] = useState(false);
    const [groupSelected, setGroupSelected] = useState(null);
    const [allFeedbacks, setAllFeedbacks] = useState([]);
    const [filtredFeedbacks, setFiltredFeedbacks] = useState([]);

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

    useEffect(() => {
        if (groupSelected && allFeedbacks.length > 0) {
            const filtring = allFeedbacks.filter(
                (feedback) => feedback.questionSetName === groupSelected.questionSetName
            );
            setFiltredFeedbacks(filtring);
            console.log(filtring);
        }
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
    }

    const onCloseSelectGroup = () => {
        setIsOpenSelectGroup(false);
    }

    const data01 = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
        { name: 'Group E', value: 278 },
        { name: 'Group F', value: 189 },
    ];

    return (
        <div
            style={{
                height: "inherit",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: "100px"
            }}
        >
            <Container minWidth="75%" minHeight="500px" bgColor="#14181E60" borderRadius="12px" padding="0px">
                <Container minHeight="70px" minWidth="100%" display="flex" alignItems="center">
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
                    <Divider orientation="vertical" minH="40px" borderColor="" opacity="100%" />
                    <Text fontSize="1rem" fontWeight="600" ml="10px">
                        Análises sobre o grupo:{" "}
                        {groupSelected && groupSelected.questionSetName}
                    </Text>
                </Container>
                <Container minHeight="360px" minWidth="100%" display="flex" justifyContent="space-between">
                    <Container>
                        <Text fontSize="1.2rem">Feedbacks criados no grupo: <strong>{filtredFeedbacks.length !== 0 ? filtredFeedbacks.length + " feedback(s)" : "Nenhum Feedback"}</strong></Text>
                        <Text fontSize="1.2rem">Média de todas as notas do grupo:</Text>
                        <Text fontSize="1.2rem">Usuários que já foram avaliados:</Text>
                        <Container bgColor="#2b3442" borderRadius="12px" minHeight="150px"></Container>
                    </Container>
                    <Container>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart width={400} height={400}>
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
                        </ResponsiveContainer>
                    </Container>
                </Container>
                <Container minHeight="70px" minWidth="100%" display="flex" alignItems="center">
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
    )
}
