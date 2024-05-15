import { Box, Container, Heading } from "@chakra-ui/react";
import NewAvaliation from "./components/NewAvaliation";
import CreatedAvaliations from "./components/CreatedAvaliations";


export default function Avaliar() {
    return (
        <div style={{ backgroundColor: "#26272D", minHeight: "100vh" }}>
            <Container bg="#e6ded5" position="absolute" left="0px" padding="5px" maxW="160px">
                <Heading fontSize="35px" fontFamily="'Inter', sans-serif">
                    AVALIAR
                </Heading>
            </Container>
            <Box as="main" minH="83vh" display="flex" justifyContent="center" alignItems="center">
                <CreatedAvaliations />
                <NewAvaliation />
            </Box>
        </div>
    )
}