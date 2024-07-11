import {
    Text,
    Container,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    useDisclosure,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import PartConfig from "./components/partConfig";
import { useState } from "react";
import { toast } from "react-toastify";
import EditParticipants from "./components/editParticipants";
import ListAvaliations from "./components/listAvaliations";

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
                <Container
                    margin="0px"
                    padding="0px"
                    w="70%"
                    h="45px"
                    borderBottom="2px solid"
                    borderColor="#808080"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    paddingRight="6px"
                    paddingBottom="5px"
                    marginBottom="15px"
                >
                    <EditParticipants />
                </Container>
                <ListAvaliations 
                    setShowADDInput={setShowADDInput}
                    showADDInput={showADDInput}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    handleQuestionToList={handleQuestionToList}
                    questionsInput={questionsInput}
                    handleEditQuestion={handleEditQuestion}
                    editTitle={editTitle}
                    setEditTitle={setEditTitle}
                    selectedQuestion={selectedQuestion}
                    handleRemoveQuestion={handleRemoveQuestion}
                    handleSaveEdit={handleSaveEdit}
                    editDescription={editDescription}
                    setEditDescription={setEditDescription}
                    isOpen={isOpen}
                    onClose={onClose}
                />
            </Container>
        </div>
    );
}