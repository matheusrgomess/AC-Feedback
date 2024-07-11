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
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Textarea
} from "@chakra-ui/react";
import { EditIcon, CheckIcon } from "@chakra-ui/icons";

export default function ListAvaliations({ 
    setShowADDInput, 
    showADDInput, 
    inputValue, 
    setInputValue, 
    handleQuestionToList, 
    questionsInput, 
    handleEditQuestion, 
    editTitle, 
    setEditTitle,
    selectedQuestion, 
    handleRemoveQuestion, 
    handleSaveEdit,
    editDescription,
    setEditDescription,
    isOpen, 
    onClose
}) {

    return (

        <>
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

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent bg="#1c222b" color="white">
                    <ModalHeader>Editar Pergunta</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel><strong>Título:</strong></FormLabel>
                            <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel><strong>Descrição:</strong></FormLabel>
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
        </>
    )
}