import {
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    IconButton,
    ModalBody,
    Text,
    Container,
    InputGroup,
    InputRightAddon,
    Input,
    UnorderedList,
    ListItem,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper
} from "@chakra-ui/react"
import { CloseIcon, EditIcon, CheckIcon, SmallCloseIcon } from "@chakra-ui/icons";
import PartConfig from "./partConfig";
import { useState } from "react";
import "../../../styles/animationbutton.css"

export default function ConfigAvaliations() {
    const [showADDInput, setShowADDInput] = useState(false);
    const [showDELButton, setShowDELButton] = useState(false)
    const [questionsInput, setQuestionsInput] = useState(JSON.parse(localStorage.getItem("questionsList")) || []);
    const [inputValue, setInputValue] = useState("")
    const [open, setOpen] = useState(false)
    const [numStars, setNumStars] = useState()

    const questionsList = JSON.parse(localStorage.getItem("questionsList"))

    const handleQuestionToList = () => {
        if (inputValue.trim() !== "") {
            setQuestionsInput([...questionsInput, inputValue]);
            setInputValue("");
            setShowADDInput(false)
            localStorage.setItem("questionsList", JSON.stringify([...questionsInput, inputValue]))
        } else {
            alert("Digite Algo no input para ser salvo!")
        }
    }

    const handleNumStars = (value) => {
        setNumStars(value)
        localStorage.setItem("numberStars", value)
    }

    const handleRemoveQuestion = (item) => {
        const updatedQuestions = questionsInput.filter((_, i) => i !== item);
        setQuestionsInput(updatedQuestions);
        localStorage.setItem("questionsList", JSON.stringify(updatedQuestions));
        console.log(questionsList.length)
        if (questionsList.length === 1) {
            localStorage.removeItem("questionsList")
        }
    };

    const handleClose = () => {
        setOpen(false)
        setShowDELButton(false)
        setShowADDInput(false)
    }

    return (
        <>
            <Button onClick={() => { setOpen(!open) }} color="#ffffff" bg="#971520" _hover={{}} _active={{ bgColor: "#5a0c12" }}>
                Configurações
            </Button>
            <Modal isOpen={open} onClose={handleClose} isCentered>
                <ModalOverlay>
                    <ModalContent padding="15px">
                        <ModalHeader borderBottom="2px solid" borderColor="#000000" paddingBottom="10px" paddingLeft="0px" paddingRight="0px" paddingTop="0px" display="flex" alignItems="center" justifyContent="space-between">
                            <Text fontSize="23px">
                                <EditIcon marginRight="5px" />
                                Configurações do formulários
                            </Text>
                            <IconButton onClick={handleClose} bgColor="transparent" _hover={{}} _active={{}}>
                                <CloseIcon />
                            </IconButton>
                        </ModalHeader>
                        <Text fontSize="16px" color="#808080">Edite o que você quer que apareça no formulário</Text>
                        <ModalBody paddingLeft="0px" marginTop="10px">
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
                                <Text color="#000000">
                                    <strong>Quantidade de notas:</strong>
                                </Text>
                                <NumberInput size='sm' maxWidth="65px" defaultValue={5} min={1} max={10} value={numStars} onChange={handleNumStars}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </Container>
                            <Container bgColor="#1c1c1c" padding="10px" borderRadius="6px">
                                <Container padding="0px" width="100%" display="flex" alignItems="center" justifyContent="space-between">
                                    <Button _hover={{}} _active={{ bgColor: "#acacac" }} bgColor="#ffffff" onClick={() => setShowADDInput(!showADDInput)}>
                                        Nova escala de avaliação
                                    </Button>
                                    <Button bgColor="#de4348" _hover={{}} _active={{ bgColor: "#771019" }} color="white" onClick={() => setShowDELButton(!showDELButton)}>
                                        Excluir
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
                                        >
                                            <IconButton
                                                bg="none"
                                                _hover={{}}
                                                _active={{}}
                                                boxSize={1}
                                                onClick={handleQuestionToList}
                                            >
                                                <CheckIcon
                                                    className={"CheckIconAnime"}
                                                    color="white"
                                                />
                                            </IconButton>
                                        </InputRightAddon>
                                    </InputGroup>
                                }
                                <Container borderLeft="1px solid" borderLeftColor="white" marginTop="20px">
                                    <UnorderedList width="100%">
                                        {questionsInput.map((item, index) => (
                                            <ListItem key={index} id="tasks" color="#ffffff">
                                                {showDELButton ? (
                                                    <>
                                                        <Text _hover={{ cursor: "pointer" }} onClick={() => handleRemoveQuestion(index)}>
                                                            <strong>{item}</strong>
                                                            <SmallCloseIcon color="red" />
                                                        </Text>
                                                        <Container minWidth="100%" borderBottom="1px solid"></Container>
                                                    </>
                                                ) : (
                                                    <Text>
                                                        <strong>{item}</strong>
                                                    </Text>
                                                )}
                                            </ListItem>
                                        ))}
                                    </UnorderedList>
                                </Container>
                            </Container>
                        </ModalBody>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </>
    );
};
