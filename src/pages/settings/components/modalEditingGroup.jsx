import {
    Button,
    Text,
    InputGroup,
    Input,
    InputRightAddon,
    IconButton,
    Container,
    Heading,
    Tooltip,
    OrderedList,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    CloseButton,
    ListItem,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberDecrementStepper,
    NumberIncrementStepper,
    ModalFooter
} from "@chakra-ui/react";
import { CheckIcon, EditIcon } from "@chakra-ui/icons";
import { RiFolderCloseFill } from "react-icons/ri";

export default function ModalEditingGroup({
    isModalOpen,
    handleClose,
    selectedGroupValue,
    handleQuestionToGroup,
    questionsInput,
    setInputQuestionsValue,
    handleDeleteGroup,
    showADDQuestionsInput,
    setShowADDQuestionsInput,
    inputQuestionsValue,
    valueInputName,
    setValueInputName,
    numberInputStars,
    setNumberInputStars,
    handleSaveChanges,
    handleSelectedQuestionOpen,
    handleSelectedQuestionClose,
    selectedQuestion,
    openSelectedQuestion,
    valueNewTitleQuestion,
    setValueNewTitleQuestion,
    valueNewDescQuestion,
    setValueNewDescQuestion,
    handleRemoveQuestion,
    handleUpdateQuestion
}) {
    return (
        <>
            <Modal isOpen={isModalOpen} onClose={handleClose} isCentered>
                <ModalOverlay />
                <ModalContent bg="#1c222b" color="white">
                    <ModalHeader display="flex" alignItems="center" justifyContent="space-between">
                        <Heading
                            maxWidth="368px"
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                            }}>
                            {selectedGroupValue && selectedGroupValue.questionSetName}
                        </Heading>
                        <CloseButton onClick={handleClose} />
                    </ModalHeader>
                    <ModalBody>
                        <Container
                            margin="0px"
                            padding="0px"
                            w="100%"
                            h="40px"
                            borderBottom="2px solid"
                            paddingBottom="10px"
                            borderColor="#808080"
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            paddingRight="6px"
                            marginBottom="15px"
                        >
                            <Text><strong>Título do grupo:</strong></Text>
                            <Input maxWidth="60%" value={valueInputName} paddingLeft="5px" onChange={(event) => setValueInputName(event.target.value)} />
                        </Container>
                        <Container
                            margin="0px"
                            padding="0px"
                            w="100%"
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
                            <NumberInput size='sm' maxWidth="65px" value={numberInputStars} min={1} max={10} onChange={(value) => setNumberInputStars(value)}>
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
                                    />
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
                                                <Text _hover={{ cursor: "pointer" }} onClick={() => handleSelectedQuestionOpen(item)}>
                                                    <strong>{item.questionName}</strong>
                                                    <EditIcon marginLeft="5px" />
                                                </Text>
                                            </ListItem>
                                        ))}
                                </OrderedList>
                            </Container>
                        </Container>
                        <Tooltip label="Excluir Grupo">
                            <Button marginTop="15px" colorScheme="red" onClick={() => handleDeleteGroup(selectedGroupValue)} _hover={{ bg: "#680000" }} padding="0px"><RiFolderCloseFill size={22.5} /></Button>
                        </Tooltip>
                        <Tooltip label="Salvar Alterações">
                            <Button onClick={handleSaveChanges} marginTop="15px" marginLeft="10px" bg="green" color="black" padding="0px" _hover={{ bg: "#005a00" }}><CheckIcon color="white" /></Button>
                        </Tooltip>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Modal isOpen={openSelectedQuestion} onClose={handleSelectedQuestionClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader display="flex" alignItems="center" justifyContent="space-between">
                        <Heading>
                            {selectedQuestion.questionName}
                        </Heading>
                        <CloseButton onClick={handleSelectedQuestionClose} />
                    </ModalHeader>
                    <ModalBody>
                        <Text fontSize={17}><strong>Título:</strong></Text>
                        <Input marginBottom="20px" value={valueNewTitleQuestion} onChange={(event) => setValueNewTitleQuestion(event.target.value)} />
                        <Text fontSize={17}><strong>Descrição:</strong></Text>
                        <Input value={valueNewDescQuestion} placeholder="Digite a descrição da pergunta" onChange={(event) => setValueNewDescQuestion(event.target.value)} />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" _hover={{ bg: "#680000" }} marginRight={5} onClick={handleRemoveQuestion}>Apagar Pergunta</Button>
                        <Button bg="black" color="white" _hover={{ bg:"rgba(0, 0, 0, 0.801)" }} onClick={handleUpdateQuestion}>Salvar Alterações</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
