import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Flex, ModalCloseButton, Heading, Text, Container, Select, Tooltip, Button, Input } from "@chakra-ui/react"
import { CheckIcon } from "@chakra-ui/icons";
import { FaUserTimes } from "react-icons/fa";

export default function ModalCreatingUsers({ handleCloseModalCreateParticipant, isOpenModalCreateParticipant, userType, setUserType, saveUser, valueName, setValueName, valueEmail, setValueEmail }) {
    return (
        <Modal isOpen={isOpenModalCreateParticipant} onClose={handleCloseModalCreateParticipant} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Heading>
                        Novo Usuário
                    </Heading>
                    <ModalCloseButton onClick={handleCloseModalCreateParticipant} />
                </ModalHeader>
                <ModalBody fontSize={18} minHeight="150px" display="flex" alignItems="center" paddingLeft="40px" >
                    <Flex direction="column" alignItems="start" display="flex" justify="space-between" minH="100px" width="100%">
                        <Container padding="0px" marginBottom="10px">
                            <Text><strong>Nome:</strong></Text>
                            <Input placeholder="Digite aqui o nome"
                                value={valueName}
                                onChange={(event) => { setValueName(event.target.value) }}
                                border="none"
                                borderBottom="1px solid"
                                borderRadius="none"
                                _hover={{}}
                                padding="0px"
                                _focus={{
                                    boxShadow: "none",
                                    borderColor: "red",
                                    borderTopColor: "transparent",
                                    borderLeftColor: "transparent",
                                    borderRightColor: "transparent",
                                }}></Input>
                        </Container>
                        <Container padding="0px" marginBottom="10px" >
                            <Text><strong>Email:</strong></Text>
                            <Input placeholder="Digite aqui o email"
                                value={valueEmail}
                                onChange={(event) => { setValueEmail(event.target.value) }}
                                border="none"
                                borderBottom="1px solid"
                                borderRadius="none"
                                _hover={{}}
                                padding="0px"
                                _focus={{
                                    boxShadow: "none",
                                    borderColor: "red",
                                    borderTopColor: "transparent",
                                    borderLeftColor: "transparent",
                                    borderRightColor: "transparent",
                                }}></Input>
                        </Container>
                        <Container padding="0px" marginBottom="10px">
                            <Text><strong>Modelo:</strong> </Text>
                            <Select value={userType} onChange={(event) => setUserType(event.target.value)} borderColor="#3f454c" _hover={{}} focusBorderColor="#971520">
                                <option value="PARTICIPANT">Participante</option>
                                <option value="ADMIN">Administrador</option>
                            </Select>
                        </Container>
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Tooltip label="Cancelar alterações">
                        <Button variant="ghost" bg="#971520"  _hover={{ bg: "#680000" }} marginRight={5} padding="0px" onClick={handleCloseModalCreateParticipant}><FaUserTimes size={22.5} color="white" /></Button>
                    </Tooltip>
                    <Tooltip label="Salvar alterações">
                        <Button bg="green" padding="0px" _hover={{ bg: "#005a00" }} onClick={saveUser}><CheckIcon color="white" /></Button>
                    </Tooltip>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}