import { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Container, Select } from "@chakra-ui/react";

export default function RatingModal({ isOpen, handleClose, handleClick }) {

  const [selectedOption, setSelectedOption] = useState('')

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    console.log('Selected option:', selectedValue);
    console.log('Selected option length:', selectedOption.length)
  };

  const handleExecuteClick = () => {
    handleClick(selectedOption)
  }

  return <>
    <Modal isOpen={isOpen} onClose={handleClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Escolha o participante que deseja avaliar</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Container>
            <Select placeholder="Escolha o participante" onChange={handleSelectChange}
              value={selectedOption}>
              <option value='arthur'>Arthur</option>
              <option value='cilene'>Cilene</option>
              <option value='dunia'>Dúnia</option>
              <option value='eduardo'>Eduardo</option>
              <option value='guilherme'>Guilherme</option>
              <option value='juan'>Juan</option>
              <option value='matheuseyng'>Matheus Eyng</option>
              <option value='matheusgomes'>Matheus Gomes</option>
              <option value='pablo'>Pablo</option>
              <option value='tomas'>Tomás</option>
            </Select>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleExecuteClick} colorScheme='red' isDisabled={(selectedOption === '')}>Go rating!!!</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>

}