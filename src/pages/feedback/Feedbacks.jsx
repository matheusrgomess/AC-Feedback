import { Box, Container, Heading } from "@chakra-ui/react";
import ButtonPages from "../generalComponents/headerPages/ButtonPages";
import Calendar from "../generalComponents/headerPages/Calendar";
import User from "../generalComponents/headerPages/User";

export default function Feedbacks() {
    return (
        <div style={{ backgroundColor: "#26272d", minHeight: "100vh" }}>
            <Box as="header" bg="#1c222b" padding="20px" display="flex" justifyContent="space-between" maxH="10vh" alignItems="center" w="100%">
                <Container maxW="294px" maxH="65px" padding="0px" margin="0px">

                </Container>
                <Container display="flex" justifyContent="space-between" alignItems="center" padding="0px" margin="0px" maxW="300px">
                    <ButtonPages title="AVALIAR" navigate="/home/rate" />
                    <ButtonPages title="HOME" navigate="/home" />
                </Container>
                <Container maxW="300px" padding="0px" margin="0px" display="flex">
                    <Calendar />
                    <User />
                </Container>
            </Box>
            <Container bg="#e6ded5" position="absolute" left="0px" padding="5px" maxW="225px">
                <Heading fontSize="35px" fontFamily="'Inter', sans-serif">
                    FEEDBACKS
                </Heading>
            </Container>
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