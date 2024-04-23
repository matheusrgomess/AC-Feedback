import { Container, Heading, Button, useDisclosure, Modal, Text, Textarea, ModalOverlay, Select, ModalContent, ModalHeader, IconButton, ModalBody, FormControl, FormLabel, Input } from "@chakra-ui/react"
import { CloseIcon } from "@chakra-ui/icons";
import { Form, Formik } from "formik";
import '../rate.css'
import StarsList from "./StarsList";

export default function NewAvaliation() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Container bgColor="white" minH="100px" display="flex" borderRadius="15px" padding="20px" alignItems="center" justifyContent="space-between">
                <Heading color="black">Nova Avaliação:</Heading>
                <Button
                    onClick={onOpen}
                    bg="green"
                    color="white"
                    border="2px solid"
                    borderColor="black"
                    _hover={{}}
                    _active={{ bg: "#2d6800" }}
                    fontSize="20px"
                >
                    Criar
                </Button>
            </Container>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay>
                    <ModalContent bgColor="#26272D" minWidth="1200px" minHeight="550px" borderLeft="6px solid" borderLeftColor="#971520">
                        <ModalHeader padding="0px">
                            <Container bgColor="white" minWidth="100%" display="flex" alignItems="center" justifyContent="space-between" color="#000000" borderTopRightRadius="8px" borderBottom="6px solid" borderBottomColor="#971520">
                                Nova Avaliação:
                                <IconButton onClick={onClose} bgColor="transparent" _hover={{}} _active={{}}>
                                    <CloseIcon />
                                </IconButton>
                            </Container>
                        </ModalHeader>
                        <ModalBody padding="15px">
                            <Formik>
                                <Form>
                                    <FormControl>
                                        <FormLabel color="#FFFFFF">Título da Avaliação:</FormLabel>
                                        <Input borderRadius="10px" color="#FFFFFF"></Input>
                                    </FormControl>
                                    <FormControl marginTop="20px">
                                        <FormLabel color="#FFFFFF">Descrição:</FormLabel>
                                        <Textarea borderRadius="10px" color="#FFFFFF" resize="none" minHeight="120px" maxHeight="200px" ></Textarea>
                                    </FormControl>
                                    <FormControl>
                                        <Container
                                            W="100%"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="space-between"
                                            paddingRight="6px"
                                            paddingLeft="0px"
                                        >
                                            <Text color="#FFFFFF">
                                                <strong>Avaliação sobre o colega:</strong>
                                            </Text>
                                            <Select
                                                color="#ffffff"
                                                w="50%"
                                                height="30px"
                                                border="none"
                                                focusBorderColor="#ffffff"
                                            >
                                                <option value="0" style={{ backgroundColor: "#1f1f1f" }}>

                                                </option>
                                                <option value="1" style={{ backgroundColor: "#1f1f1f" }}>
                                                    Arthur
                                                </option>
                                                <option value="2" style={{ backgroundColor: "#1f1f1f" }}>
                                                    Cilene
                                                </option>
                                                <option value="3" style={{ backgroundColor: "#1f1f1f" }}>
                                                    Dúnia
                                                </option>
                                                <option value="4" style={{ backgroundColor: "#1f1f1f" }}>
                                                    Guilherme
                                                </option>
                                                <option value="5" style={{ backgroundColor: "#1f1f1f" }}>
                                                    Juan
                                                </option>
                                                <option value="6" style={{ backgroundColor: "#1f1f1f" }}>
                                                    Matheus Eyng
                                                </option>
                                                <option value="7" style={{ backgroundColor: "#1f1f1f" }}>
                                                    Matheus Gomes
                                                </option>
                                                <option value="8" style={{ backgroundColor: "#1f1f1f" }}>
                                                    Pablo
                                                </option>
                                            </Select>
                                        </Container>
                                    </FormControl>
                                    
                                    <FormControl>
                                        <Container display="flex" borderRadius="10px" padding="4px" justifyContent="space-between" alignItems="center" marginTop="10px" paddingRight="20px" backgroundColor="black">
                                            <Container padding="0px" maxWidth="210px" margin="0px">
                                                <Text color="white">
                                                    Making decisions after finding out what others think
                                                </Text>
                                            </Container>

                                            <StarsList />
                                        </Container>
                                    </FormControl>
                                    <FormControl>
                                        <Container display="flex" borderRadius="10px" padding="4px" justifyContent="space-between" alignItems="center" marginTop="10px" paddingRight="20px" backgroundColor="black">
                                            <Container padding="0px" maxWidth="210px" margin="0px">
                                                <Text color="white">
                                                    Making decisions based on my own thoughts and understanding
                                                </Text>
                                            </Container>

                                            <StarsList />
                                        </Container>
                                    </FormControl>
                                    
                                    <Button
                                        onClick={onClose}
                                        marginTop="20px"
                                        bg="green"
                                        color="white"
                                        border="2px solid"
                                        borderColor="#FFFFFF"
                                        _hover={{}}
                                        _active={{ bg: "#2d6800" }}
                                    >
                                        Salvar
                                    </Button>
                                </Form>
                            </Formik>

                        </ModalBody>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </>

    )
}