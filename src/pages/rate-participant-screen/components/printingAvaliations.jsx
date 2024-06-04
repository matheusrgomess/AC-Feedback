import { Container, Heading, Button, Text } from "@chakra-ui/react";
import { ViewIcon, CalendarIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { matchPath, useLocation } from "react-router-dom";
import formatiingText from "../../../utils/formattingText";

export default function SubmittedAvaliation({ avaliations }) {
    const location = useLocation();
    const [pageHome, setPageHome] = useState(false);

    useEffect(() => {
        checkingPage();
    }, []);

    const checkingPage = () => {
        if (matchPath("/home", location.pathname)) {
            setPageHome(true);
        } else {
            setPageHome(false);
        }
    };

    const renderAvaliation = (avaliation, index) => {
        const questions = avaliation.questions;
        let numericRatings = [];
        let observation = "";

        questions.forEach((question) => {
            if (!isNaN(question.rating)) {
                numericRatings.push(parseFloat(question.rating));
            } else {
                observation = question.rating;
            }
        });

        const averageRating = numericRatings.reduce((acc, val) => acc + val, 0) / numericRatings.length;

        return (
            <Container
                key={index}
                as="div"
                bg="white"
                w="95%"
                minH="200px"
                border="2px solid"
                borderColor="#971520"
                padding="10px"
                borderRadius="12px"
                marginBottom="15px"
                bgColor="#1c222b"
            >
                <Container
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    padding="0px"
                    marginBottom="5px"
                    borderBottom="2px solid"
                    borderColor="#ffffff"
                    overflow="hidden"
                    color="#ffffff"
                >
                    <Heading>{formatiingText(avaliation.reviewer)}:</Heading>
                    <Container
                        display="flex"
                        width="auto"
                        alignItems="center"
                        padding="0px"
                        margin="0px"
                    >
                        <CalendarIcon color="white" />
                        <Text paddingInline="8px" color="white">
                            {avaliation.date}
                        </Text>
                        <Button bg="#971520" _hover={{}} _active={{ bgColor: "#5a0c12" }} color="#ffffff" padding="0px" size="sm" margin="5px" marginLeft="10px"><ViewIcon /></Button>
                    </Container>
                </Container>
                <Container padding="0px">
                    <Text color="white">
                        <strong>Observação:</strong> {observation}
                    </Text>
                    <br />
                    <Text color="white">
                        <strong>Média dos Ratings:</strong> {averageRating}
                    </Text>
                    <br />
                </Container>
            </Container>
        );
    };

    return (
        <>
            {pageHome ? (
                avaliations && avaliations.length > 0 && renderAvaliation(avaliations[avaliations.length - 1], avaliations.length - 1)
            ) : (
                avaliations && avaliations.map((avaliation, index) => renderAvaliation(avaliation, index))
            )}
        </>
    )
}