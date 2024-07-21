import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    Input,
    Container,
    Select,
    Divider,
    UnorderedList,
    ListItem,
    Heading,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { createUser } from "services/users";
import { FaUserCog } from "react-icons/fa";
import { useState, useEffect } from "react";
import { FaUserPlus } from "react-icons/fa6";
import { listUsers } from "services/users";
import formattingText from "utils/formattingText";
import ModalEditingParticipant from "./modalEditingParticipant";
import normalizeNameToAPI from "utils/normalizeNameToAPI";

export default function EditParticipants() {
    const [isOpenPrincipalModal, setIsOpenPrincipalModal] = useState(false);
    const [isOpenEditParticipantSelected, setIsOpenEditParticipantSelected] = useState(false);
    const [showInputsNewUser, setShowInputsNewUser] = useState(false);
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

    const handleClosePrincipalModal = () => {
        setShowInputsNewUser(false);
        setIsOpenPrincipalModal(false);
    }

    const handleCloseEditParticipantSelected = () => {
        setIsOpenEditParticipantSelected(false);
        setShowButtonConfirm(false);
    }

    const handleOpenEditParticipantSelected = (participant) => {
        setIsOpenEditParticipantSelected(true);
        setInfoSelectedParticipant(participant);
    }

    const saveUser = async () => {
        const user = {
            email: valueEmail,
            name: normalizeNameToAPI(valueName),
            userType: userType,
        };

        try {
            await createUser({ user: user });
            await fetchParticipants()
            setValueName("");
            setValueEmail("");
            setUserType("PARTICIPANT");
            setShowInputsNewUser(false)
            toast.success("Novo usuário criado: " + user.name);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <>
            <Modal isOpen={isOpenPrincipalModal} onClose={handleClosePrincipalModal} isCentered>
                <ModalOverlay />
                <ModalContent bg="#1c222b" color="white">
                    <ModalHeader>
                        <Heading>
                            Editar usuários
                        </Heading>
                        <ModalCloseButton onClick={handleClosePrincipalModal} />
                    </ModalHeader>
                    <ModalBody>
                        <Text fontSize="18px">Esses são todos os usuários cadastrados:</Text>
                        <UnorderedList>
                            {participants?.map(participant =>
                                <ListItem key={participant.name} color="#ffffff" marginBottom="10px">
                                    <Button variant="ghost" _hover={{ bgColor: "rgba(0, 0, 0, 0.5)" }} onClick={() => handleOpenEditParticipantSelected(participant)}>
                                        <Text textColor="white"><strong>{formattingText(participant.name)}</strong></Text>
                                    </Button>
                                </ListItem>)}
                        </UnorderedList>
                        <Button onClick={() => { setShowInputsNewUser(!showInputsNewUser) }} bg="transparent" borderLeft={showInputsNewUser ? "1px solid" : "none"} color="white" borderRadius="none" _hover={{}} _active={{ bgColor: "rgba(0,0,0,0.1)" }}>
                            <Text marginRight="10px">
                                Criar novo usuário
                            </Text>
                            <FaUserPlus size={20} />
                        </Button>
                        {showInputsNewUser &&
                            <Container borderLeft="1px solid" paddingLeft="10px">
                                <Divider marginBottom="10px" />
                                <Text><strong>Nome do usuário:</strong></Text>
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
                                <Text><strong>Email do usuário:</strong></Text>
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
                                <Container display="flex" alignItems="center" padding="0px" marginTop="15px" justifyContent="space-between">
                                    <Text><strong>Tipo de usuário:</strong></Text>
                                    <Select width="45%" border="none" _focus={{ boxShadow: "0px 0px 0px 1px #971520" }} value={userType} onChange={(event) => setUserType(event.target.value)}>
                                        <option style={{ color: "black" }} value="PARTICIPANT">Participante</option>
                                        <option style={{ color: "black" }} value="ADMIN">Administrador</option>
                                    </Select>
                                </Container>
                                <Button onClick={saveUser}>Salvar novo usuário</Button>
                            </Container>

                        }
                    </ModalBody>
                </ModalContent>
            </Modal>
            <ModalEditingParticipant
                isOpenEditParticipantSelected={isOpenEditParticipantSelected}
                infoSelectedParticipant={infoSelectedParticipant}
                setInfoSelectedParticipant={setInfoSelectedParticipant}
                handleCloseEditParticipantSelected={handleCloseEditParticipantSelected}
                setParticipants={setParticipants}
                showButtonConfirm={showButtonConfirm}
                setShowButtonConfirm={setShowButtonConfirm}
            />
            <Button
                onClick={() => { setIsOpenPrincipalModal(!isOpenPrincipalModal) }}
                padding="0px"
                color="white"
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