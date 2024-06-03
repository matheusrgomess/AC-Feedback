import React from "react";
import {
    Box,
    Container,
    Link,
    Heading,
    Text
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import "react-toastify/dist/ReactToastify.css";
import SubmittedAvaliation from "../rate-participant-screen/components/submittedAvaliations";
import { useState, useEffect } from "react";
import CreatedReviews from "../rate-participant-screen/components/createdReviews";

export default function Home() {
    const user = localStorage.getItem("user");
    const avaliations = JSON.parse(localStorage.getItem("avaliations"));
    const [filteredAvaliations, setFilteredAvaliations] = useState([]);
    const [showFeedbacks, setShowFeedbacks] = useState(false);
    const [avaliationsCreated, setAvaliationsCreated] = useState([]);
    const [showFeedbacksCreated, setShowFeedbacksCreated] = useState(false)

    useEffect(() => {
        const userAvaliations = avaliations.filter(avaliation => avaliation.reviewed === user);
        setFilteredAvaliations(userAvaliations);
        if (userAvaliations.length > 0) {
            setShowFeedbacks(true)
        } else {
            setShowFeedbacks(false)
        }
    }, [user, avaliations]);

    useEffect(() => {
        const userAvaliationsCreated = avaliations.filter(avaliations => avaliations.reviewer === user);
        setAvaliationsCreated(userAvaliationsCreated);
        if (userAvaliationsCreated.length > 0) {
            setShowFeedbacksCreated(true)
        } else {
            setShowFeedbacksCreated(false)
        }
    }, [user, avaliations])

    return (
        <div style={{ maxHeight: "100vh" }}>

            <Box as="main" minH="83vh" display="flex" justifyContent="center" alignItems="center">
                <Container bg="#ffffff" minH="300px" borderRadius="20px" padding="10px">
                    <Heading color="#000000">Avaliações criadas:</Heading>
                    <Container
                        className="scrollbar"
                        padding="10px"
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
                        {showFeedbacksCreated ? <CreatedReviews avaliationsCreated={avaliationsCreated} /> : <Text>Nenhuma avaliacao criada</Text>}
                    </Container>

                </Container>
                <Container bg="#ffffff" minH="300px" borderRadius="20px" padding="10px">
                    <Heading color="#000000">Últimas avaliações recebidas:</Heading>
                    {showFeedbacks ? <SubmittedAvaliation filteredAvaliations={filteredAvaliations} /> : <Text>Nenhuma avaliacao recebida por enquanto</Text>}
                </Container>
            </Box>
            <Box as="footer" minH="7vh" display="flex" alignItems="center" paddingLeft="30px">
                <Link href="https://dev.azure.com/acertsisdesenvolvimento" bgColor="#1c222b" color="#ffffff" padding="5px" borderRadius="15px" fontSize="15pt" isExternal >
                    Azure DevOps <ExternalLinkIcon mx="2px" w={6} h={6} />
                </Link>
            </Box>

        </div>
    );
};