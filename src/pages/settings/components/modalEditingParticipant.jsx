import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, Button, Text, ModalBody, Heading, ModalFooter, Flex, Container } from "@chakra-ui/react"
import { deleteParticipant } from "services/delParticipants";
import formattingText from "utils/formattingText";
import { listParticipants } from "services/participants";

export default function ModalEditingParticipant({ isOpenEditParticipantSelected, handleCloseEditParticipantSelected, infoSelectedParticipant, setInfoSelectedParticipant, setParticipants }) {

    const deleteParticipantSelected = async (id) => {
        try {
            await deleteParticipant(id);
            handleCloseEditParticipantSelected();
            const participantsList = await listParticipants();
            setParticipants(participantsList);
        } catch (error) {
            console.log(error)
        }
    }

    const participantId = infoSelectedParticipant?.id;

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
                    <Flex direction="column" alignItems="start" display="flex" justify="space-between" minH="100px">
                        <Container padding="0px" marginBottom="10px">
                            <Text textColor="#1c222b"><strong>Nome:</strong></Text>
                            <Text>{infoSelectedParticipant && formattingText(infoSelectedParticipant.name)}</Text>
                        </Container>
                        <Container padding="0px" marginBottom="10px">
                            <Text textColor="#1c222b"><strong>Email:</strong></Text>
                            <Text>{infoSelectedParticipant && infoSelectedParticipant.email}</Text>
                        </Container>
                        <Container padding="0px" marginBottom="10px">
                            <Text textColor="#1c222b"><strong>Modelo:</strong> </Text>
                            <Text>{infoSelectedParticipant && infoSelectedParticipant.userType === "PARTICIPANT" ? "Participante" : "Administrador"}</Text>
                        </Container>
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="red" marginRight={5} onClick={() => participantId && deleteParticipantSelected(participantId)}>Excluir usuário</Button>
                    <Button>Editar usuário</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}