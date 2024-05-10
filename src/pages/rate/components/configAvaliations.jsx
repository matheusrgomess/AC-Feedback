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
import { CloseIcon, EditIcon, CheckIcon } from "@chakra-ui/icons";
import PartConfig from "./partConfig";
import { useState } from "react";
import "/Usuario/Matheus/Desktop/AC-Feedback/src/styles/animationbutton.css"

export default function ConfigAvaliations() {
    const [showInput, setShowInput] = useState(false);
    const [questionsInput, setQuestionsInput] = useState(JSON.parse(localStorage.getItem("questionsList")) || []);
    const [inputValue, setInputValue] = useState("")
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [numStars, setNumStars] = useState()

    const handleQuestionToList = () => {
        if (inputValue.trim() !== "") {
            setQuestionsInput([...questionsInput, inputValue]);
            setInputValue("");
            setShowInput(false)
            localStorage.setItem("questionsList", JSON.stringify([...questionsInput, inputValue]))
        } else {
            alert("Digite Algo no input para ser salvo!")
        }
    }

    const handleNumStars = (value) => {
        setNumStars(value)
        localStorage.setItem("numberStars", value)
    }
    return (
        <>
            <Button onClick={onOpen} color="#ffffff" bg="#971520" _hover={{}} _active={{ bgColor: "#5a0c12" }}>
                Configurações
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay>
                    <ModalContent padding="15px">
                        <ModalHeader borderBottom="2px solid" borderColor="#000000" paddingBottom="10px" paddingLeft="0px" paddingRight="0px" paddingTop="0px" display="flex" alignItems="center" justifyContent="space-between">
                            <Text fontSize="23px">
                                <EditIcon marginRight="5px" />
                                Configurações do formulários
                            </Text>
                            <IconButton onClick={onClose} bgColor="transparent" _hover={{}} _active={{}}>
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
                                <Button _hover={{}} _active={{ bgColor: "#cccccc" }} bgColor="#ffffff" onClick={() => setShowInput(!showInput)}>
                                    Nova escala de avaliação
                                </Button>
                                {showInput &&
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
                                                ></CheckIcon>
                                            </IconButton>
                                        </InputRightAddon>
                                    </InputGroup>
                                }
                                <Container borderLeft="1px solid" borderLeftColor="white" marginTop="20px">
                                    <UnorderedList>
                                        {questionsInput.map((item, index) => (
                                            <ListItem key={index} id="tasks" color="#ffffff">
                                                {item}
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