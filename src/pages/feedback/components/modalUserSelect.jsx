import {
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
  CloseButton,
  Container,
  Divider,
  Select,
  Tooltip,
  Icon,
  Heading,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import formattingText from "utils/formattingText";
import { listParticipants } from "services/participants";

export default function ModalUserSelect({ isOpen, onClose, setSelectedUser }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [selectedUserFilter, setSelectedUserFilter] = useState("");
  const [participants, setParticipants] = useState([]);

  const handleCloseModal = () => {
    onClose();
    setSelectedUser(selectedUserFilter);
  };

  const fetchParticipants = async () => {
    try {
      const response = await listParticipants();
      setParticipants(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent background="#212121" color="white">
          <ModalHeader display="flex" justifyContent="space-between">
            <Heading>
              Selecione um usuário
              <Tooltip
                label="Neste modal, você pode selecionar um usuário para ver seus feedbacks."
                aria-label="tooltip explicando como funciona o filtro de usuários"
              >
                <Icon
                  w={3}
                  position="relative"
                  bottom="10px"
                  _hover={{ cursor: "pointer" }}
                />
              </Tooltip>
            </Heading>
            <CloseButton onClick={onClose} />
          </ModalHeader>
          <Container paddingLeft="15px" paddingRight="15px">
            <Divider borderColor="red" marginBottom="4px" />
            <Text>
              Usuário selecionado neste momento:{" "}
              <strong>{formattingText(selectedUserFilter || user.name)}</strong>
            </Text>
          </Container>
          <ModalBody padding="15px">
            <Text>
              <strong>Usuário:</strong>
            </Text>
            <Select
              value={selectedUserFilter}
              onChange={(e) => setSelectedUserFilter(e.target.value)}
            >
              <option
                key={user.name}
                value={user.name}
                style={{ color: "black" }}
              >
                Você
              </option>
              {participants.map((user) => (
                <option
                  key={user.name}
                  value={user.name}
                  style={{ color: "black" }}
                >
                  {formattingText(user.name)}
                </option>
              ))}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              onClick={handleCloseModal}
              colorScheme="red"
              isDisabled={selectedUserFilter === ""}
            >
              Filtrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
