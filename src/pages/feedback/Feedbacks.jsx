import { Box, Container, Heading } from "@chakra-ui/react";

export default function Feedbacks() {
    return (
        <div style={{ minHeight: "100vh" }}>
            <Box as="main" minH="83vh" display="flex" justifyContent="center" alignItems="center">
                <Container bgColor="#ffffff" minH="200px" borderRadius="15px" padding="0px" paddingTop="10px" paddingBottom="10px">
                    <Container display="flex" alignItems="center" justifyContent="space-between" minH="60px">
                        <Heading color="#000000">Feedbacks Recebidos:</Heading>
                    </Container>
                    <Container display="flex" alignItems="center" justifyContent="center" minH="140px">
                        <Heading color="#bebebe" fontFamily="'Inter', sans-serif" fontSize="40px">Nenhum</Heading>
                    </Container>
                </Container>
            </Box>
        </div>
    );
};