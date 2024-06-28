import {
    Button,
    IconButton,
    Text,
    Container,
    InputGroup,
    InputRightAddon,
    Input,
    OrderedList,
    ListItem,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Textarea
} from "@chakra-ui/react";
import { EditIcon, CheckIcon, SettingsIcon } from "@chakra-ui/icons";
import PartConfig from "./components/partConfig";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Settings() {
    const [showADDInput, setShowADDInput] = useState(false);
    const [questionsInput, setQuestionsInput] = useState(JSON.parse(localStorage.getItem("questionsList")) || []);
    const [inputValue, setInputValue] = useState("");
    const [numStars, setNumStars] = useState();
    const numberStars = JSON.parse(localStorage.getItem("numberStars"));
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");

    const addObservationsQuestion = (questions) => {
        const lastQuestion = questions[questions.length - 1];
        if (!lastQuestion || lastQuestion.type !== "observations") {
            return [
                ...questions.filter(q => q.type !== "observations"),
                {
                    type: "observations",
                    question: "Observações",
                    questionDescription: "Coloque uma observação para poder enviar o formulário"
                }
            ];
        }
        return questions;
    };

    const handleQuestionToList = () => {
        if (inputValue.trim() !== "") {
            const newQuestion = {
                type: "rate",
                question: inputValue,
                questionDescription: ""
            };
            const updatedQuestions = addObservationsQuestion([...questionsInput, newQuestion]);
            setQuestionsInput(updatedQuestions);
            setInputValue("");
            setShowADDInput(false);
            localStorage.setItem("questionsList", JSON.stringify(updatedQuestions));
        } else {
            toast.error('Digite Algo no input para ser salvo!', {
                autoClose: 2500
            });
        }
    };

    const handleNumStars = (value) => {
        setNumStars(value);
        localStorage.setItem("numberStars", value);
    };

    const handleRemoveQuestion = (index) => {
        if (questionsInput.length === 2) {
            toast.error('É necessário haver no mínimo 1 avaliação', {
                autoClose: 2500
            });
        } else {
            const updatedQuestions = addObservationsQuestion(questionsInput.filter((_, i) => i !== index));
            setQuestionsInput(updatedQuestions);
            localStorage.setItem("questionsList", JSON.stringify(updatedQuestions));
        }
        onClose();
    }

    const handleEditQuestion = (index) => {
        setSelectedQuestion(index);
        setEditTitle(questionsInput[index].question);
        setEditDescription(questionsInput[index].questionDescription);
        onOpen();
    };

    const handleSaveEdit = () => {
        if (editTitle !== '') {
            const updatedQuestions = [...questionsInput];
            updatedQuestions[selectedQuestion] = {
                ...updatedQuestions[selectedQuestion],
                question: editTitle,
                questionDescription: editDescription
            };
            const ensuredQuestions = addObservationsQuestion(updatedQuestions);
            setQuestionsInput(ensuredQuestions);
            localStorage.setItem("questionsList", JSON.stringify(ensuredQuestions));
            onClose();
        } else {
            toast.error('É necessário um título para a pergunta', {
                autoClose: 2500
            });
        }
    };

    return (
        <div
            style={{
                height: "inherit",
                color: "white",
                backgroundColor: "#1c222b",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Container
                border="2px solid"
                borderColor="#971520"
                padding="10px"
                borderRadius="12px"
            >
                <Text fontSize="23px">
                    <SettingsIcon marginRight="5px" />
                    Configurações do formulários
                </Text>
                <Text fontSize="16px" color="#808080">Edite o que você quer que apareça no formulário</Text>
                <PartConfig title="Título:" />
                <PartConfig title="Descrição:" />
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
                    <NumberInput size='sm' maxWidth="65px" defaultValue={numberStars} min={1} max={10} value={numStars} onChange={handleNumStars}>
                        <NumberInputField readOnly cursor="default" />
                        <NumberInputStepper>
                            <NumberIncrementStepper color="white" />
                            <NumberDecrementStepper color="white" />
                        </NumberInputStepper>
                    </NumberInput>
                </Container>
                <Container padding="10px" borderRadius="6px">
                    <Container padding="0px" width="100%" display="flex" alignItems="center" justifyContent="space-between">
                        <Button _hover={{}} _active={{ bgColor: "#acacac" }} bgColor="#ffffff" onClick={() => setShowADDInput(!showADDInput)}>
                            Nova escala de avaliação
                        </Button>
                    </Container>
                    {showADDInput &&
                        <InputGroup size="sm" marginTop="15px">
                            <Input
                                marginBottom="10px"
                                variant="flushed"
                                _focus={{
                                    boxShadow: "none",
                                    borderColor: "#ffffff",
                                }}
                                color="white"
                                value={inputValue}
                                onChange={(event) => setInputValue(event.target.value)}
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
                                    onClick={handleQuestionToList}
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
                                .filter(item => item.type !== "observations")
                                .map((item, index) => (
                                    <ListItem key={index} id="tasks" color="#ffffff" marginBottom="10px">
                                        <Text _hover={{ cursor: "pointer" }} onClick={() => handleEditQuestion(index)}>
                                            <strong>{item.question}</strong>
                                            <EditIcon marginLeft="5px" />
                                        </Text>
                                    </ListItem>
                                ))}
                        </OrderedList>
                    </Container>
                </Container>
            </Container>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent bg="#1c222b" color="white">
                    <ModalHeader>Editar Pergunta</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Título:</FormLabel>
                            <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Descrição:</FormLabel>
                            <Textarea
                                value={editDescription}
                                height="150px"
                                resize="none"
                                onChange={(e) => setEditDescription(e.target.value)}
                                placeholder="Digite aqui"
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button bgColor="white" color="black" mr={3} onClick={handleSaveEdit}>
                            Salvar
                        </Button>
                        <Button colorScheme="red" onClick={() => handleRemoveQuestion(selectedQuestion)}>Excluir</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}