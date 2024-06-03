import { Container, Heading, Button, Text } from "@chakra-ui/react";
import { ViewIcon, CalendarIcon } from "@chakra-ui/icons";

export default function CreatedReviews({ avaliationsCreated }) {

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
                borderColor="#000000"
                padding="10px"
                borderRadius="12px"
                marginBottom="15px"
            >
                <Container
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    padding="0px"
                    marginBottom="5px"
                    borderBottom="2px solid"
                    borderColor="#000000"
                    overflow="hidden"
                    color="#000000"
                >
                    <Heading>{avaliation.reviewer}:</Heading>
                    <Container
                        display="flex"
                        width="auto"
                        alignItems="center"
                        padding="0px"
                        margin="0px"
                    >
                        <CalendarIcon color="black" />
                        <Text paddingInline="8px" color="black">
                            {avaliation.date}
                        </Text>
                        <Button bg="#971520" _hover={{}} _active={{ bgColor: "#5a0c12" }} color="#FFFFFF" padding="0px"><ViewIcon /></Button>
                    </Container>
                </Container>
                <Container padding="0px">
                    <Text color="black">
                        <strong>Observação:</strong> {observation}
                    </Text>
                    <br />
                    <Text color="black">
                        <strong>Média dos Ratings:</strong> {averageRating}
                    </Text>
                    <br />
                </Container>
            </Container>
        );
    };

    return (
        <>
            {avaliationsCreated && avaliationsCreated.map((avaliation, index) => renderAvaliation(avaliation, index))}
        </>
    )
}