import { Container, Heading, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import SubmittedAvaliation from "../rate-participant-screen/components/submittedAvaliations";

export default function Feedbacks() {
    const user = localStorage.getItem("user");
    const avaliations = JSON.parse(localStorage.getItem("avaliations"));
    const [filteredAvaliations, setFilteredAvaliations] = useState([]);
    const [showFeedbacks, setShowFeedbacks] = useState(false);

    useEffect(() => {
        const userAvaliations = avaliations.filter(avaliation => avaliation.reviewed === user);
        setFilteredAvaliations(userAvaliations);
        setShowFeedbacks(userAvaliations.length > 0);
    }, [user, avaliations]);

    return (
        <div style={{
            height: 'inherit',
            color: 'white',
            backgroundColor: '1c222b',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            {showFeedbacks ?
                <Container bg="#ffffff" minH="300px" borderRadius="20px" padding="0px">
                    <Container bgColor="red" padding="5px" minW="100%" borderTopRadius="20px" display="flex" alignItems="center" justifyContent="space-between">
                        <Heading>Avaliações Recebidas:</Heading>
                        <Button variant="outline" colorScheme="white">Filtrar</Button>
                    </Container>
                    <Container padding="8px">
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
                            <SubmittedAvaliation filteredAvaliations={filteredAvaliations} />
                        </Container>
                    </Container>
                </Container>
                :
                <Heading color="grey">Nenhum Feedback Recebido</Heading>
            }
        </div>
    );
}
