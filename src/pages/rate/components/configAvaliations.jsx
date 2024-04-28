import { Button, Modal, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"

export default function ConfigAvaliations() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    return (
        <>
            <Button onClick={onOpen} color="white" bgColor="#971520" _hover={{}} _active={{ bgColor:"#5a0c12" }}>
                Configurações
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader>
                            Configurações do formulário:
                        </ModalHeader>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </>
    )
}