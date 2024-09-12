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
  Heading
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { printQuestionSet } from "services/questionsSet";

export default function ModalSetGroup({
  isOpen,
  onClose,
  newGroupFiltred
}) {
  const [selectedGroup, setSelectedGroup] = useState({ id: "", name: "" });
  const [groups, setGroups] = useState([]);
  const [finalSelected, setFinalSelected] = useState();

  const fetchGroups = async () => {
    try {
      const response = await printQuestionSet();
      setGroups(response.questions);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleModalClose = () => {
    setFinalSelected(selectedGroup.name);
    newGroupFiltred(selectedGroup);
    onClose();
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display="flex" justifyContent="space-between">
            <Heading>
              Selecione um grupo
              <Tooltip
                label="Neste modal, você pode selecionar um grupo para ver os seus feedbacks relacionados."
                aria-label="Tooltip explicando como funciona o filtro de grupo"
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
              Grupo selecionado neste momento:{" "}
              <strong>
                {finalSelected && finalSelected}
              </strong>
            </Text>
          </Container>
          <ModalBody padding="15px">
            <Text>
              <strong>Grupos:</strong>
            </Text>
            <Select
              value={selectedGroup.id}
              onChange={(e) => {
                const selectedOption = groups.find(
                  (group) => group.id === e.target.value
                );
                setSelectedGroup({
                  id: e.target.value,
                  name: selectedOption ? selectedOption.questionSetName : ""
                });
              }}
              focusBorderColor="#FF0000"
              borderColor="#777a80"
              _hover={{}}
            >
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.questionSetName}
                </option>
              ))}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="red" onClick={handleModalClose} color="white">
              Selecionar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
