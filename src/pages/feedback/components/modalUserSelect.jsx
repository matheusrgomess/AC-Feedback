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
import { useState } from "react";
import formattingText from "utils/formattingText";

export default function ModalUserSelect({ isOpen, onClose, setSelectedUser }) {
  const user = localStorage.getItem("user");
  const [selectedUserFilter, setSelectedUserFilter] = useState("");

  const handleCloseModal = () => {
    onClose();
    setSelectedUser(selectedUserFilter);
  };
  const users = [
    { value: "admin", label: "Você" },
    { value: "arthur", label: "Arthur" },
    { value: "cilene", label: "Cilene" },
    { value: "dunia", label: "Dúnia" },
    { value: "eduardo", label: "Eduardo" },
    { value: "juan", label: "Juan" },
    { value: "matheus-eyng", label: "Matheus Eyng" },
    { value: "matheus-gomes", label: "Matheus Gomes" },
    { value: "pablo", label: "Pablo" },
    { value: "tomas", label: "Tomás" },
  ];

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
              <strong>{formattingText(selectedUserFilter || user)}</strong>
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
              {users.map((user) => (
                <option
                  key={user.value}
                  value={user.value}
                  style={{ color: "black" }}
                >
                  {user.label}
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
