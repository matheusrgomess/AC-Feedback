import { Container, Heading } from "@chakra-ui/react"

export default function CreatedAvaliations() {
    return (
        <Container bgColor="white" minHeight="200px" borderRadius="15px" padding="0px" paddingTop="10px" paddingBottom="10px">
        <Container display="flex" alignItems="center" justifyContent="space-between" minHeight="60px">
            <Heading color="black">Avaliações criadas:</Heading>
        </Container>
        <Container display="flex" alignItems="center" justifyContent="center" minHeight="140px">
            <Heading color="#bebebe" fontFamily="'Inter', sans-serif" fontSize="40px">Empty</Heading>
        </Container>
    </Container>
    )
}