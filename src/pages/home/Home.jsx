import React from "react";
import {
    Box,
    Container,
    Link,
    Heading,
    Button
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import "react-toastify/dist/ReactToastify.css";
import SubmittedAvaliation from "../rate-participant-screen/components/printingAvaliations";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const user = localStorage.getItem("user");
    const avaliations = JSON.parse(localStorage.getItem("avaliations"));
    const [filteredAvaliations, setFilteredAvaliations] = useState([]);
    const [showFeedbacks, setShowFeedbacks] = useState(false);
    const [avaliationsCreated, setAvaliationsCreated] = useState([]);
    const [showFeedbacksCreated, setShowFeedbacksCreated] = useState(false);
    const nav = useNavigate();

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
                {showFeedbacksCreated ?
                    <Container bg="#ffffff" minH="300px" borderRadius="20px" padding="10px">
                        <Heading color="#000000">Últimas avaliações criadas:</Heading>
                        <SubmittedAvaliation avaliations={avaliationsCreated} />
                        <Button colorScheme="red" onClick={() => {nav('/home/feedbacks')}}>Ver mais</Button>
                    </Container>
                    :
                    <Container>
                        <Heading color="grey">Nenhuma avaliacao criada</Heading>
                    </Container>
                }
                {showFeedbacks ?
                    <Container bg="#ffffff" minH="300px" borderRadius="20px" padding="10px">
                        <Heading color="#000000">Últimas avaliações recebidas:</Heading>
                        <SubmittedAvaliation avaliations={filteredAvaliations} />
                        <Button colorScheme="red" onClick={() => {nav('/home/feedbacks')}}>Ver mais</Button>
                    </Container>
                    :
                    <Container>
                        <Heading color="grey">Nenhuma avaliacao recebida por enquanto</Heading>
                    </Container>
                }
            </Box>
            <Box as="footer" minH="7vh" display="flex" alignItems="center" paddingLeft="30px">
                <Link href="https://dev.azure.com/acertsisdesenvolvimento" bgColor="#1c222b" color="#ffffff" padding="5px" borderRadius="15px" fontSize="15pt" isExternal >
                    Azure DevOps <ExternalLinkIcon mx="2px" w={6} h={6} />
                </Link>
            </Box>

        </div>
    );
};