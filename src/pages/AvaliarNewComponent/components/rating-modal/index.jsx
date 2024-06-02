import { useState } from "react";
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

export default function RatingModal({ isOpen, handleClose, handleClick }) {
  const [selectedOption, setSelectedOption] = useState("");
  const user = localStorage.getItem("user")

  const reviewers = [
    { value: "arthur", label: "Arthur" },
    { value: "cilene", label: "Cilene" },
    { value: "dunia", label: "Dúnia" },
    { value: "eduardo", label: "Eduardo" },
    { value: "juan", label: "Juan" },
    { value: "matheus-eyng", label: "Matheus Eyng" },
    { value: "matheus-gomes", label: "Matheus Gomes" },
    { value: "pablo", label: "Pablo" },
    { value: "tomas", label: "Tomás" },
  ]

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
                {reviewers
                  .filter(reviewer => reviewer.value !== user)
                  .map(reviewer => (
                    <option key={reviewer.value} value={reviewer.value}>
                      {reviewer.label}
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
