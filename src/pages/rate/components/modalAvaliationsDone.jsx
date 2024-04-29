import { CloseIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import { Button, Container, Heading, IconButton, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { useState } from "react"

export default function ModalAvaliationsDone() {
    const [open, setOpen] = useState(false)
    const [formsSelect, setFormsSelect] = useState({});
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')

    const valueForms = JSON.parse(localStorage.getItem("valueForms"));

    const getFormsById = (id) => {
        const formsId = valueForms.find((value) => value.id === id);

        setFormsSelect(formsId);
        setTitle(formsId.title);
        setDesc(formsId.desc);
    }

    const handleOpen = (id) => {
        getFormsById(id);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false)
        setFormsSelect({})
    }

    return (
        <>
            {valueForms && valueForms.map((valueForms) => {

                return (
                        <div key={valueForms.id}>
                            <Modal isOpen={open} onClose={handleClose} isCentered>
                                <ModalOverlay>
                                    <ModalContent bg="#26272D" minWidth="1200px" minHeight="550px" borderLeft="6px solid" borderLeftColor="#971520">
                                        <ModalHeader padding="0px">
                                            <Container bgColor="white" minWidth="100%" display="flex" alignItems="center" justifyContent="space-between" borderTopRightRadius="8px">
                                                {title}:
                                                <IconButton onClick={handleClose} bg="transparent" _hover={{}} _active={{}}>
                                                    <CloseIcon />
                                                </IconButton>
                                            </Container>
                                        </ModalHeader>
                                        <ModalBody color="white">
                                            <Container margin="0px" bgColor="white" color="black" borderRadius="6px">
                                                <Text><strong>Descrição:</strong></Text>
                                                {desc}
                                            </Container>
                                        </ModalBody>
                                    </ModalContent>
                                </ModalOverlay>
                            </Modal>

                            <Container
                                as="div"
                                bg="white"
                                width="95%"
                                minHeight="200px"
                                border="2px solid"
                                borderColor="black"
                                padding="10px"
                                borderRadius="12px"
                                marginBottom="15px"
                            >
                                <Container
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    padding="0px"
                                    marginBottom="5px"
                                    borderBottom="2px solid"
                                    borderColor="black"
                                    overflow="hidden"
                                >
                                    <Heading color="black">{valueForms.title}:</Heading>
                                    <Button onClick={() => handleOpen(valueForms.id)} bgColor="#971520" _hover={{}} _active={{bgColor: "#5a0c12"}} color="white"><ViewIcon marginRight="5px"/>Visualizar</Button>
                                </Container>
                                <Container padding="0px">
                                    <strong>Descrição:</strong>
                                    <br />
                                    {valueForms.desc}
                                </Container>
                                
                            </Container>
                        </div>
                )
            })}
        </>
    )
}