import { Container, CloseButton, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Checkbox, Box, HStack, FormControl, FormLabel, Input } from "@chakra-ui/react";

export default function ModalFilter({ isOpen, onClose }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent bgColor="#26272d" color="white">
                <ModalHeader display="flex" alignItems="center" justifyContent="space-between">
                    Filtrar Avaliações
                    <CloseButton onClick={onClose} />
                </ModalHeader>
                <ModalBody>
                    <Box p={4}>
                        <HStack spacing={8}>
                            <FormControl>
                                <FormLabel fontSize="lg" color="white">Desde o dia</FormLabel>
                                <Input variant="flushed" placeholder="DD/MM/YYYY" />
                            </FormControl>
                            <FormControl>
                                <FormLabel fontSize="lg" color="white">Até o dia</FormLabel>
                                <Input variant="flushed" placeholder="DD/MM/YYYY" />
                            </FormControl>
                        </HStack>
                    </Box>
                    <Container display="flex" alignItems="center" justifyContent="space-between">
                        <Checkbox defaultChecked colorScheme="red">Mais recentes / Mais antigas</Checkbox>
                        <Checkbox defaultChecked colorScheme="red">Mais antigas / Mais recentes</Checkbox>
                    </Container>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
