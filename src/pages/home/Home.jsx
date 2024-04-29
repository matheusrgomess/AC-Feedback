import React from "react";
import { Image, Box, Container, Link, Heading, Text } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import ButtonPages from "../generalComponents/headerPages/ButtonPages";
import Calendar from "../generalComponents/headerPages/Calendar";
import User from "../generalComponents/headerPages/User";
import ModalAvaliationsDone from "../rate/components/modalAvaliationsDone";

export default function Home() {

    return (
        <div style={{ backgroundColor: "#26272D", minHeight: "100vh" }}>
            <Box as="header" bgColor="#1c222b" padding="20px" display="flex" justifyContent="space-between" maxHeight="10vh" alignItems="center" width="100%">
                <Container maxWidth="294px" maxHeight="65px" padding="0px" margin="0px">
                    <Image src="imgs/acdigital.png" width="100%" height="100%" />
                </Container>
                <Container display="flex" justifyContent="space-between" alignItems="center" padding="0px" margin="0px" maxW="300px">
                    <ButtonPages title="AVALIAR" navigate="/home/rate" />
                    <ButtonPages title="FEEDBACKS" navigate="/home/feedbacks" />
                </Container>
                <Container maxW="300px" padding="0px" margin="0px" display="flex">
                    <Calendar />
                    <User />
                </Container>
            </Box>
            <Container bgColor="#e6ded5" position="absolute" left="0px" padding="5px" maxWidth="120px">
                <Heading fontSize="35px">
                    HOME
                </Heading>
            </Container>
            <Box as="main" minHeight="83vh" display="flex" justifyContent="center" alignItems="center">
                <Container bgColor="white" minH="300px" borderRadius="20px" padding="10px">
                    <Heading color="black">Avaliações criadas:</Heading>
                    <Container
                        className="scrollbar"
                        padding="0px"
                        paddingTop="15px"
                        maxW="100%"
                        maxH="306px"
                        overflow="hidden"
                        overflowY="auto"
                        css={{
                            "&::-webkit-scrollbar": {
                                backgroundColor: "#ffffff",
                                borderRadius: "10px",
                                width: "8px",
                                direction: "rtl",
                            },
                            "&::-webkit-scrollbar-thumb": {
                                backgroundColor: "#1f1f1f",
                                borderRadius: "10px",
                                width: "8px",
                                transition: "background-color 0.5s ease",
                            },
                            "&::-webkit-scrollbar-thumb:hover": {
                                backgroundColor: "#2c2c2c",
                            }
                        }}
                    >
                        <ModalAvaliationsDone />
                    </Container>
                </Container>
                <Container bgColor="white" minH="300px" borderRadius="20px" padding="10px">
                    <Heading color="black">Avaliações recebidas:</Heading>
                    <Container bgColor="black">
                        <Text color="white">Nenhum</Text>
                    </Container>
                </Container>
            </Box>
            <Box as="footer" minHeight="7vh" display="flex" alignItems="center" paddingLeft="30px">
                <Link href="https://dev.azure.com/acertsisdesenvolvimento" bgColor="#1c222b" color="white" padding="5px" borderRadius="15px" fontSize="15pt" isExternal >
                    Azure DevOps <ExternalLinkIcon mx="2px" w={6} h={6} />
                </Link>
            </Box>
        </div>

    )
}