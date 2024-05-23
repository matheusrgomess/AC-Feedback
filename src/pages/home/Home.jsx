import React from "react";
import {
    Box,
    Container,
    Link,
    Heading,
    Text
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import ModalAvaliationsDone from "../rate/components/modalAvaliationsDone";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {

    return (
        <div style={{ backgroundColor: "#26272d", maxHeight: "100vh" }}>

            <Box as="main" minH="83vh" display="flex" justifyContent="center" alignItems="center">
                <Container bg="#ffffff" minH="300px" borderRadius="20px" padding="10px">
                    <Heading color="#000000">Avaliações criadas:</Heading>
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
                <Container bg="#ffffff" minH="300px" borderRadius="20px" padding="10px">
                    <Heading color="#000000">Avaliações recebidas:</Heading>
                    <Container bg="#000000">
                        <Text color="#ffffff">Nenhum</Text>
                    </Container>
                </Container>
            </Box>
            <Box as="footer" minH="7vh" display="flex" alignItems="center" paddingLeft="30px">
                <Link href="https://dev.azure.com/acertsisdesenvolvimento" bgColor="#1c222b" color="#ffffff" padding="5px" borderRadius="15px" fontSize="15pt" isExternal >
                    Azure DevOps <ExternalLinkIcon mx="2px" w={6} h={6} />
                </Link>
            </Box>
            <ToastContainer
                position="top-center"
                pauseOnHover={false}
                theme="dark"
                progressStyle={{ background: "#ff0000" }}
            />
        </div>
    );
};