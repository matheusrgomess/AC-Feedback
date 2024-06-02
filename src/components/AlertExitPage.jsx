import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Text, Heading } from "@chakra-ui/react"

export default function AlertExitPage({ isOpen, onClose, onClickConfirm, onClickClose}) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent bgColor="black" color="white">
                <ModalHeader><Heading>Aviso!</Heading></ModalHeader>
                <ModalBody>
                    Você tem certeza que deseja <Text as="span" color="white" textDecoration="underline" textDecorationColor="red">sair da página atual</Text>?
                    <Text mt={4} color="red">
                        <strong>Você perderá toda a avaliação iniciada!</strong>
                    </Text>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClickConfirm} colorScheme="red">
                        Sim
                    </Button>
                    <Button onClick={onClickClose} ml={3}>
                        Não
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}