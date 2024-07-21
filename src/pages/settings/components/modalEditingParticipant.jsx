import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, Button, Text, ModalBody, Heading, ModalFooter, Flex, Container, Tooltip, Input, Select } from "@chakra-ui/react";
import formattingText from "utils/formattingText";
import { CheckIcon } from "@chakra-ui/icons";
import { FaUserEdit, FaUserSlash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { listUsers, editUser, deleteUser } from "services/users";
import normalizeNameToAPI from "utils/normalizeNameToAPI";

export default function ModalEditingParticipant({ isOpenEditParticipantSelected, handleCloseEditParticipantSelected, infoSelectedParticipant, setParticipants, showButtonConfirm, setShowButtonConfirm }) {
    const participantId = infoSelectedParticipant?.id;
    const [newValueName, setNewValueName] = useState("");
    const [newValueEmail, setNewValueEmail] = useState("");
    const [newUserType, setNewUserType] = useState("");

    useEffect(() => {
        if (infoSelectedParticipant) {
            setNewValueName(formattingText(infoSelectedParticipant.name));
            setNewValueEmail(infoSelectedParticipant.email);
            setNewUserType(infoSelectedParticipant.userType);
        }
    }, [infoSelectedParticipant]);

    const deleteParticipantSelected = async (id) => {
        try {
            await deleteUser(id);
            handleCloseEditParticipantSelected();
            const participantsList = await listUsers();
            setParticipants(participantsList);
            
        } catch (error) {
            console.log(error)
        }
    }

    const handleClickEdit = () => {
        setShowButtonConfirm(!showButtonConfirm)
    }

    const sendNewInfoUser = async () => {
        const data = {
            email: newValueEmail,
            name: normalizeNameToAPI(newValueName),
            userType: newUserType
        }
        try {
            await editUser(infoSelectedParticipant.id, data);
            handleCloseEditParticipantSelected();
            const participantsList = await listUsers();
            setParticipants(participantsList);
        } catch (error) {
            console.log(error)
        }
        setShowButtonConfirm(false)
    }

    return (
        <Modal isOpen={isOpenEditParticipantSelected} onClose={handleCloseEditParticipantSelected} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Heading color="#1c222b">
                        {infoSelectedParticipant && formattingText(infoSelectedParticipant.name)}
                    </Heading>
                    <ModalCloseButton color="black" onClick={handleCloseEditParticipantSelected} />
                </ModalHeader>
                <ModalBody fontSize={18} minHeight="150px" display="flex" alignItems="center" paddingLeft="40px" >
                    <Flex direction="column" alignItems="start" display="flex" justify="space-between" minH="100px" width="100%">
                        <Container padding="0px" marginBottom="10px">
                            <Text textColor="#1c222b"><strong>Nome:</strong></Text>
                            {showButtonConfirm === false ?
                                <Text>{infoSelectedParticipant && formattingText(infoSelectedParticipant.name)}</Text>
                                :
                                <Input maxWidth="90%" padding="0px" value={newValueName} onChange={(event) => setNewValueName(event.target.value)}></Input>
                            }

                        </Container>
                        <Container padding="0px" marginBottom="10px" >
                            <Text textColor="#1c222b"><strong>Email:</strong></Text>
                            {showButtonConfirm === false ?
                                <Text>{infoSelectedParticipant && infoSelectedParticipant.email}</Text>
                                :
                                <Input maxWidth="90%" padding="0px" value={newValueEmail} onChange={(event) => setNewValueEmail(event.target.value)}></Input>
                            }
                        </Container>
                        <Container padding="0px" marginBottom="10px">
                            <Text textColor="#1c222b"><strong>Modelo:</strong> </Text>
                            {showButtonConfirm === false ?
                                <Text>{infoSelectedParticipant && infoSelectedParticipant.userType === "PARTICIPANT" ? "Participante" : "Administrador"}</Text>
                                :
                                <Select value={newUserType} onChange={(event) => setNewUserType(event.target.value)}>
                                    <option style={{ color: "black" }} value="PARTICIPANT">Participante</option>
                                    <option style={{ color: "black" }} value="ADMIN">Administrador</option>
                                </Select>
                            }
                        </Container>
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Container>
                        <Tooltip label="Excluir usuário">
                            <Button colorScheme="red" marginRight={5} _hover={{ bg: "#680000" }} onClick={() => participantId && deleteParticipantSelected(participantId)} padding="0px"><FaUserSlash size={22.5} /></Button>
                        </Tooltip>
                        <Tooltip label="Editar usuário">
                            <Button variant="ghost" color="black" _hover={{ bg: "rgba(0, 0, 0, 0.2)" }} marginRight={5} padding="0px" onClick={handleClickEdit}><FaUserEdit size={22.5} /></Button>
                        </Tooltip>
                    </Container>
                    {showButtonConfirm &&
                        <Tooltip label="Salvar alterações">
                            <Button bg="green" padding="0px" _hover={{ bg: "#005a00" }} onClick={sendNewInfoUser}><CheckIcon color="white" /></Button>
                        </Tooltip>
                    }
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}