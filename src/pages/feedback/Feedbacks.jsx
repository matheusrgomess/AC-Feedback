import { Box, Container, Heading } from "@chakra-ui/react";
import ButtonPages from "../generalComponents/headerPages/ButtonPages";
import Calendar from "../generalComponents/headerPages/Calendar";
import User from "../generalComponents/headerPages/User";


export default function Feedbacks() {
    return (
        <div style={{ backgroundColor: "#26272D", minHeight: "100vh" }}>
            <Box as="header" bgColor="#1c222b" padding="20px" display="flex" justifyContent="space-between" maxHeight="10vh" alignItems="center" width="100%">
                <Container maxWidth="294px" maxHeight="65px" padding="0px" margin="0px">

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
            <Container bgColor="#e6ded5" position="absolute" left="0px" padding="5px" maxWidth="210px">
                <Heading fontSize="35px">
                    FEEDBACKS
                </Heading>
            </Container>
            <Box as="main" minHeight="83vh" display="flex" justifyContent="center" alignItems="center">
                <Container bgColor="white" minHeight="200px" borderRadius="15px" padding="0px" paddingTop="10px" paddingBottom="10px">
                    <Container display="flex" alignItems="center" justifyContent="space-between" minHeight="60px">
                        <Heading color="black">Feedbacks Recebidos:</Heading>
                    </Container>
                    <Container display="flex" alignItems="center" justifyContent="center" minHeight="140px">
                        <Heading color="#bebebe" fontFamily="'Inter', sans-serif" fontSize="40px">Nenhum</Heading>
                    </Container>
                </Container>
            </Box>
        </div>
    )
}