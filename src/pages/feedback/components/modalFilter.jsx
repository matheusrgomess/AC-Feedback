import { CloseButton, Modal, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";

export default function ModalFilter ({ isOpen, onClose }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>
                    <CloseButton onClick={onClose}/>
                </ModalHeader>
            </ModalContent>
        </Modal>
    )
}