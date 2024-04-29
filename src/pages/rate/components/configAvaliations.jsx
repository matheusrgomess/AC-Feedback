import { Button, Modal, ModalContent, ModalHeader, ModalOverlay, useDisclosure, IconButton, ModalBody, Text, Container, Select, Switch } from "@chakra-ui/react"
import { CloseIcon, EditIcon } from "@chakra-ui/icons";
import PartConfig from "./partConfig";
import StarsList from "./StarsList";

export default function ConfigAvaliations() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button onClick={onOpen} color="white" bgColor="#971520" _hover={{}} _active={{ bgColor: "#5a0c12" }}>
                Configurações
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay>
                    <ModalContent padding="15px">
                        <ModalHeader borderBottom="2px solid" borderColor="#000000" paddingBottom="10px" paddingLeft="0px" paddingRight="0px" paddingTop="0px" display="flex" alignItems="center" justifyContent="space-between">
                            <Text fontSize="23px">
                                <EditIcon marginRight="5px" />
                                Configurações do formulários
                            </Text>
                            <IconButton onClick={onClose} bgColor="transparent" _hover={{}} _active={{}}>
                                <CloseIcon />
                            </IconButton>
                        </ModalHeader>
                        <Text fontSize="16px" color="grey">Edite o que você quer que apareça no formulário</Text>
                        <ModalBody paddingLeft="0px" marginTop="10px">
                            <PartConfig title="Título:"/>
                            <PartConfig title="Descrição:"/>
                            <Container bgColor="#7a7a7a" padding="10px" borderRadius="6px">
                                <Button>Nova escala de avaliação</Button>
                                <StarsList/>
                            </Container>
                            
                        </ModalBody>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </>
    )
}