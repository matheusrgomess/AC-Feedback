import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Text, Heading } from "@chakra-ui/react";
import { RiAlertFill } from "react-icons/ri";

export default function AlertExitPage({ isOpen, onClose, onClickConfirm, onClickClose }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent bgColor="black" color="white">
                <ModalHeader display="flex" alignItems="center" justifyContent="space-between"><Heading>Aviso!</Heading><RiAlertFill size="36px" /></ModalHeader>
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