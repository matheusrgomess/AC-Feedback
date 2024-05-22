import { Text, Container, Heading } from "@chakra-ui/react";
import { array } from "../array";
import Stars from "./stars";
import ButtonRate from "./buttonRate";

export default function QuestionsPage({ currentQuestion, handleNextQuestion, handlePreviousQuestion, userName, participant, hover, setHover, rating, setRating }) {
    return (
        <Container
            border="1px solid"
            borderColor="#971520"
            borderRadius="8px"
            minH="500px"
            minW="500px"
            padding="0px"
            paddingTop="180px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flexDirection="column"
        >
            <Container textAlign="center">
                <Heading>{array[currentQuestion].question}</Heading>
                <Text>{array[currentQuestion].questionDescription}</Text>
            </Container>
            <Stars 
                hover={hover}
                setHover={setHover}
                rating={rating}
                setRating={setRating}
            />
            <Container
                minWidth="100%"
                padding="15px"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
            >
                <ButtonRate
                    currentQuestion={currentQuestion}
                    handleNextQuestion={handleNextQuestion}
                    handlePreviousQuestion={handlePreviousQuestion}
                />
                {userName(participant)}
            </Container>
        </Container>
    )
}