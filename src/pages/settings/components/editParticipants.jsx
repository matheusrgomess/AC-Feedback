import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    Input,
    Container,
    Select,
    Divider,
    UnorderedList,
    ListItem
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { createUser } from "services/users";
import { FaUserEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import { FaUserPlus } from "react-icons/fa6";
import { listParticipants } from "services/participants";
import formattingText from "utils/formattingText";

export default function EditParticipants() {
    const [isOpen, setIsOpen] = useState(false)
    const [showInputsNewUser, setShowInputsNewUser] = useState(false)
    const [participants, setParticipants] = useState([])

    useEffect(() => {
        async function fetchParticipants() {
            const participantsList = await listParticipants();
            setParticipants(participantsList);
        }

        fetchParticipants();
    }, []);

    const handleClose = () => {
        setShowInputsNewUser(false)
        setIsOpen(false)
    }

    const saveUser = async () => {
        const user = {
            email: "teste@gmail.com.br",
            name: "teste-teste",
            userType: "PARTICIPANT",
        };

        try {
            const response = await createUser({ user: user });
            handleClose()
            toast.success(response.message);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={handleClose} isCentered>
                <ModalOverlay />
                <ModalContent bg="#1c222b" color="white">
                    <ModalHeader>
                        Editar usuários
                        <ModalCloseButton onClick={handleClose} />
                    </ModalHeader>
                    <ModalBody>
                        <Text fontSize="18px">Esses são todos os usuários cadastrados:</Text>
                        <UnorderedList>
                            {participants.map(participant =>
                                <ListItem key={participant.name} color="#ffffff" marginBottom="10px">
                                    <Text>
                                        <strong>{formattingText(participant.name)}</strong>
                                    </Text>
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
                                    <Select width="45%" border="none" _focus={{ boxShadow: "0px 0px 0px 1px #971520" }}>
                                        <option style={{ color: "black" }}>Participante</option>
                                        <option style={{ color: "black" }}>Administrador</option>
                                    </Select>
                                </Container>

                            </Container>

                        }
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={saveUser}>Salvar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Button
                onClick={() => { setIsOpen(!isOpen) }}
                padding="0px"
                color="white"
                bg="transparent"
                _hover={{ bg: "rgba(0, 0, 0, 0.1)" }}
            >
                <Text display="flex" textDecoration="underline" marginRight="10px"><strong>Editar usuários</strong></Text>
                <FaUserEdit size={22.5}></FaUserEdit>
            </Button>
        </>

    )
}