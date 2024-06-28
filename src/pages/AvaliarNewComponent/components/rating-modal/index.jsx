import { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Container,
  Select,
} from "@chakra-ui/react";
import formattingText from "utils/formattingText";
import { listParticipants } from "services/participants";

export default function RatingModal({ isOpen, handleClose, handleClick }) {
  const [selectedOption, setSelectedOption] = useState("");
  const user = localStorage.getItem("user");
  const [participants, setParticipants] = useState([]);

  const fetchParticipants = async () => {
    try {
      const response = await listParticipants();
      setParticipants(response.participants);
    } catch (error) {
      console.error(error);
    }
  
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
  };

  const handleCloseModal = () => {
    setSelectedOption("");
    handleClose();
  };

  const handleExecuteClick = () => {
    handleClick(selectedOption);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Escolha o participante que deseja avaliar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Container>
              <Select
                placeholder="Escolha o participante"
                onChange={handleSelectChange}
                value={selectedOption}
              >
                {participants
                  ?.filter((participant) => participant.name !== user)
                  .map((reviewer) => (
                    <option key={reviewer.name} value={reviewer.name}>
                      {formattingText(reviewer.name)}
                    </option>
                  ))}
              </Select>
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={handleClose}>
              Cancelar
            </Button>
            <Button
              onClick={handleExecuteClick}
              colorScheme="red"
              isDisabled={selectedOption === ""}
            >
              Começar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
