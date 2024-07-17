import {
    NumberInputField,
    NumberIncrementStepper,
    NumberDecrementStepper,
    NumberInputStepper,
    NumberInput,
    OrderedList,
    ListItem,
    Button,
    Text,
    InputGroup,
    Input,
    InputRightAddon,
    IconButton,
    Container,
    Heading,
    Checkbox,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    CloseButton
} from "@chakra-ui/react";
import { CheckIcon, EditIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { createQuestionSet } from "services/postQuestionsSet";
import { printQuestionSet } from "services/getQuestionsSet";

export default function CreatingGroupAvaliations() {
    const [selectedGroupValue, setSelectedGroupValue] = useState(null);
    const [nameGroupValue, setNameGroupValue] = useState("");
    const [questionsInput, setQuestionsInput] = useState([]);
    const [showInputGroup, setShowInputGroup] = useState(false);
    const [arrayGroups, setArrayGroups] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showADDQuestionsInput, setShowADDQuestionsInput] = useState(false);
    const [inputQuestionsValue, setInputQuestionsValue] = useState("");
    const [numStars, setNumStars] = useState(5);
    const [questionsSet, setQuestionsSet] = useState()

    useEffect(() => {
        async function fetchData() {
            try {
                setQuestionsSet(await printQuestionSet())
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const handleCreatingNewGroup = async () => {
        try {
            const newGroup = {
                questionSetName: nameGroupValue,
                questions: [{
                    "questionName": "Teste10",
                    "questionType": "RATING",
                    "questionDescription": " "
                }],
                numberOfStars: 5,
            };
            const response = await createQuestionSet(newGroup);
            const updatedGroups = [...arrayGroups, response.data];
            setArrayGroups(updatedGroups);
            setNameGroupValue("");
            setShowInputGroup(false);
        } catch (error) {
            console.log(error);
        }

    };

    const handleOpen = (group) => {
        setIsModalOpen(true);
        setSelectedGroupValue(group);
        setQuestionsInput(group.questions || []);
        setNumStars(group.numberOfStars || 5);
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setQuestionsInput([]);
        setSelectedGroupValue(null);
    };

    const handleQuestionToGroup = () => {
        if (inputQuestionsValue.trim() !== "") {
            const newQuestion = {
                questionType: "RATING",
                questionName: inputQuestionsValue,
                questionDescription: ""
            };
            const updatedQuestions = addObservationsQuestion([...questionsInput, newQuestion]);
            const updatedGroups = arrayGroups.map(group =>
                group.questionSetName === selectedGroupValue.questionSetName ? { ...group, questions: updatedQuestions } : group
            );

            setArrayGroups(updatedGroups);
            setQuestionsInput(updatedQuestions);
            setInputQuestionsValue("");
            setShowADDQuestionsInput(false);
        } else {
            alert('Digite Algo no input para ser salvo!');
        }
    };

    const addObservationsQuestion = (questions) => {
        const lastQuestion = questions[questions.length - 1];
        if (!lastQuestion || lastQuestion.questionType !== "OBSERVATION") {
            return [
                ...questions.filter(q => q.questionType !== "OBSERVATION"),
                {
                    questionType: "OBSERVATION",
                    questionName: "Observações",
                    questionDescription: "Coloque uma observação para poder enviar o formulário"
                }
            ];
        }
        return questions;
    };

    const changeStars = (value) => {
        setNumStars(value);
        const updatedGroups = arrayGroups.map(group =>
            group.questionSetName === selectedGroupValue.questionSetName ? { ...group, numberOfStars: Number(value) } : group
        );

        setArrayGroups(updatedGroups);
    };

    const handleCheckboxChange = (selectedGroup) => {
        const updatedGroups = arrayGroups.map(group => ({
            ...group,
            activatedSet: group.questionSetName === selectedGroup.questionSetName
        }));
        setArrayGroups(updatedGroups);
    };

    const handleSaveChanges = async () => {
        const updatedGroup = {
            ...selectedGroupValue,
            questions: questionsInput,
            numberOfStars: numStars,
        };
        const response = await createQuestionSet(updatedGroup);
        const updatedGroups = arrayGroups.map(group =>
            group.questionSetName === response.questionSetName ? response : group
        );
        setArrayGroups(updatedGroups);
        handleClose();
    };

    return (
        <>
            <Button _hover={{}} _active={{ bgColor: "#acacac" }} bgColor="#ffffff" onClick={() => setShowInputGroup(!showInputGroup)}>
                <Text marginRight="10px">
                    Criar novo grupo de avaliações
                </Text>
            </Button>
            {
                showInputGroup &&
                <InputGroup size="sm" marginTop="15px">
                    <Input
                        placeholder="Digite aqui o nome do novo agrupamento de avaliações"
                        marginBottom="10px"
                        variant="flushed"
                        _focus={{
                            boxShadow: "none",
                            borderColor: "#ffffff",
                        }}
                        color="white"
                        value={nameGroupValue}
                        onChange={(event) => setNameGroupValue(event.target.value)}
                    ></Input>
                    <InputRightAddon
                        width="50px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        bg="none"
                        border="none"
                        borderBottom="1px solid"
                        borderColor="white"
                        borderRadius="none"
                    >
                        <IconButton
                            bg="none"
                            _hover={{}}
                            _active={{}}
                            boxSize={1}
                            onClick={handleCreatingNewGroup}
                            isDisabled={nameGroupValue === ''}
                        >
                            <CheckIcon
                                style={{
                                    transition: "color 0.3s ease",
                                    color: "white",
                                }}
                                onMouseOver={(e) => e.currentTarget.style.color = "green"}
                                onMouseOut={(e) => e.currentTarget.style.color = "white"}
                            />
                        </IconButton>
                    </InputRightAddon>
                </InputGroup>
            }
            <Container width="100%" padding="10px" display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={4}>
                {questionsSet?.questions.map((group, index) => (
                    <Container key={index} bgColor="red" borderRadius="10px">
                        <Container padding="0px" display="flex" alignItems="center" justifyContent="space-between">
                            <Heading display="flex" alignItems="center">
                                <Checkbox
                                    paddingRight="10px"
                                    isChecked={group.activatedSet}
                                    onChange={() => handleCheckboxChange(group)}
                                />
                                {group.questionSetName}
                            </Heading>
                            <Button bg="transparent" _hover={{}} _active={{}} onClick={() => handleOpen(group)}>
                                <EditIcon color="white" />
                            </Button>
                        </Container>
                        <Text>Número de perguntas: {group.questions.length >= 2 ? group.questions.length - 1 : group.questions.length}</Text>
                        <Text>Quantidade de estrelas: {group.numberOfStars}</Text>
                    </Container>
                ))}
            </Container>
            <Modal isOpen={isModalOpen} onClose={handleClose} isCentered>
                <ModalOverlay />
                <ModalContent bg="#26272D" color="white">
                    <ModalHeader display="flex" alignItems="center" justifyContent="space-between">
                        <Heading>
                            {selectedGroupValue && selectedGroupValue.questionSetName}
                        </Heading>
                        <CloseButton onClick={handleClose} />
                    </ModalHeader>
                    <ModalBody>
                        <Container
                            margin="0px"
                            padding="0px"
                            w="70%"
                            h="40px"
                            borderBottom="2px solid"
                            borderColor="#808080"
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            paddingRight="6px"
                            marginBottom="15px"
                        >
                            <Text>
                                <strong>Quantidade de notas:</strong>
                            </Text>
                            <NumberInput size='sm' maxWidth="65px" defaultValue={numStars} value={numStars} min={1} max={10} onChange={changeStars}>
                                <NumberInputField readOnly cursor="default" />
                                <NumberInputStepper>
                                    <NumberIncrementStepper color="white" />
                                    <NumberDecrementStepper color="white" />
                                </NumberInputStepper>
                            </NumberInput>
                        </Container>
                        <Container padding="10px" borderRadius="6px">
                            <Container padding="0px" width="100%" display="flex" alignItems="center" justifyContent="space-between">
                                <Button _hover={{}} _active={{ bgColor: "#acacac" }} bgColor="#ffffff" onClick={() => setShowADDQuestionsInput(!showADDQuestionsInput)}>
                                    Nova escala de avaliação
                                </Button>
                            </Container>
                            {showADDQuestionsInput &&
                                <InputGroup size="sm" marginTop="15px">
                                    <Input
                                        marginBottom="10px"
                                        variant="flushed"
                                        _focus={{
                                            boxShadow: "none",
                                            borderColor: "#ffffff",
                                        }}
                                        color="white"
                                        value={inputQuestionsValue}
                                        onChange={(event) => setInputQuestionsValue(event.target.value)}
                                    ></Input>
                                    <InputRightAddon
                                        width="50px"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        bg="none"
                                        border="none"
                                        borderBottom="1px solid"
                                        borderColor="white"
                                        borderRadius="none"
                                    >
                                        <IconButton
                                            bg="none"
                                            _hover={{}}
                                            _active={{}}
                                            boxSize={1}
                                            onClick={handleQuestionToGroup}
                                        >
                                            <CheckIcon
                                                style={{
                                                    transition: "color 0.3s ease",
                                                    color: "white",
                                                }}
                                                onMouseOver={(e) => e.currentTarget.style.color = "green"}
                                                onMouseOut={(e) => e.currentTarget.style.color = "white"}
                                            />
                                        </IconButton>
                                    </InputRightAddon>
                                </InputGroup>
                            }
                            <Container borderLeft="1px solid" borderLeftColor="white" marginTop="20px">
                                <OrderedList width="100%">
                                    {questionsInput
                                        .filter(item => item.questionType !== "OBSERVATION")
                                        .map((item, index) => (
                                            <ListItem key={index} id="tasks" color="#ffffff" marginBottom="10px">
                                                <Text _hover={{ cursor: "pointer" }}>
                                                    <strong>{item.questionName}</strong>
                                                    <EditIcon marginLeft="5px" />
                                                </Text>
                                            </ListItem>
                                        ))}
                                </OrderedList>
                            </Container>
                        </Container>
                        <Button onClick={handleSaveChanges} marginTop="15px" bgColor="#ffffff" color="black">Salvar Alterações</Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
