import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    UnorderedList,
    ListItem,
    Heading,
    Container,
    Divider,
    useColorMode
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { FaUserCog } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { createUser, listUsers } from "services/users";
import { formattingName, APIformattingName } from "utils/formattingTexts";
import ModalEditingLogParticipant from "./modalEditingLogParticipant";
import ModalCreatingUsers from "./modalCreatingUsers";

export default function EditParticipants() {
    const { colorMode } = useColorMode();
    const [isOpenPrincipalModal, setIsOpenPrincipalModal] = useState(false);
    const [isOpenModalCreateParticipant, setIsOpenModalCreateParticipant] = useState(false);
    const [isOpenEditParticipantSelected, setIsOpenEditParticipantSelected] = useState(false);
    const [valueEmail, setValueEmail] = useState("");
    const [valueName, setValueName] = useState("");
    const [participants, setParticipants] = useState([]);
    const [userType, setUserType] = useState("PARTICIPANT");
    const [infoSelectedParticipant, setInfoSelectedParticipant] = useState();
    const [showButtonConfirm, setShowButtonConfirm] = useState(false);

    const fetchParticipants = async () => {
        const participantsList = await listUsers();
        setParticipants(participantsList);
    }

    useEffect(() => {
        fetchParticipants();
    }, []);

    const saveUser = async () => {
        const user = {
            email: valueEmail,
            name: APIformattingName(valueName),
            userType: userType,
        };
        try {
            await createUser({ user: user });
            await fetchParticipants()
            setValueName("");
            setValueEmail("");
            setUserType("PARTICIPANT");
            setIsOpenModalCreateParticipant(false);
            toast.success("Novo usuário criado: " + formattingName(user.name));
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const handleClosePrincipalModal = () => {
        setIsOpenPrincipalModal(false);
    }

    //Controlando abertura e fechura do Modal de criação de um usuário
    const handleOpenModalCreateParticipant = () => {
        setIsOpenModalCreateParticipant(true);
    }

    const handleCloseModalCreateParticipant = () => {
        setIsOpenModalCreateParticipant(false);
        setValueName("");
        setValueEmail("");
        setUserType("PARTICIPANT");
    }

    //Controlando abertura e fechura do Modal de edição de um usuário
    const handleOpenEditParticipantSelected = (participant) => {
        setIsOpenEditParticipantSelected(true);
        setInfoSelectedParticipant(participant);
    }

    const handleCloseEditParticipantSelected = () => {
        setIsOpenEditParticipantSelected(false);
        setShowButtonConfirm(false);
    }

    return (
        <>
            <Modal isOpen={isOpenPrincipalModal} onClose={handleClosePrincipalModal} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Heading>
                            Editar usuários
                        </Heading>
                        <ModalCloseButton onClick={handleClosePrincipalModal} />
                    </ModalHeader>
                    <ModalBody>
                        <Text fontSize="18px"><strong>Esses são todos os usuários cadastrados:</strong></Text>
                        <Container padding="0px" maxHeight="300px" maxWidth="96%" position="relative" right="7px">
                            <Container
                                className="scrollbar"
                                padding="10px"
                                maxW="100%"
                                maxH="306px"
                                overflow="hidden"
                                overflowY="auto"
                                bgColor={colorMode === "dark" ? "#14181e60" : "transparent"}
                                border={colorMode === "dark" ? "none" : "1px solid black"}
                                borderRadius="10px"
                            >
                                <UnorderedList listStyleType="none">
                                    {participants?.map(participant =>
                                        <ListItem key={participant.name} color="#ffffff" marginBottom="10px">
                                            <Button variant="ghost" _hover={{ bgColor: "rgba(0, 0, 0, 0.5)" }} onClick={() => handleOpenEditParticipantSelected(participant)}>
                                                <Text><strong>{formattingName(participant.name)}</strong></Text>
                                            </Button>
                                        </ListItem>)}
                                </UnorderedList>
                            </Container>
                        </Container>
                        <Divider marginTop="20px" borderColor="" opacity="100%" />
                        <Button marginTop="10px" onClick={handleOpenModalCreateParticipant} bg="transparent" borderRadius="none" _hover={{}} _active={{ bgColor: "rgba(0,0,0,0.1)" }}>
                            <Text marginRight="10px">
                                Criar novo usuário
                            </Text>
                            <FaUserPlus size={20} />
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <ModalEditingLogParticipant
                isOpenEditParticipantSelected={isOpenEditParticipantSelected}
                infoSelectedParticipant={infoSelectedParticipant}
                setInfoSelectedParticipant={setInfoSelectedParticipant}
                handleCloseEditParticipantSelected={handleCloseEditParticipantSelected}
                setParticipants={setParticipants}
                showButtonConfirm={showButtonConfirm}
                setShowButtonConfirm={setShowButtonConfirm}
            />
            <ModalCreatingUsers
                handleCloseModalCreateParticipant={handleCloseModalCreateParticipant}
                isOpenModalCreateParticipant={isOpenModalCreateParticipant}
                userType={userType}
                setUserType={setUserType}
                saveUser={saveUser}
                valueEmail={valueEmail}
                valueName={valueName}
                setValueEmail={setValueEmail}
                setValueName={setValueName}
            />
            <Button
                onClick={() => { setIsOpenPrincipalModal(!isOpenPrincipalModal) }}
                padding="0px"
                variant="ghost"
                bg="transparent"
                _hover={{ bg: "rgba(0, 0, 0, 0.3)" }}
            >
                <Text display="flex" marginRight="10px"><strong>Editar usuários</strong></Text>
                <FaUserCog size={22.5}></FaUserCog>
            </Button>
        </>
    )
}