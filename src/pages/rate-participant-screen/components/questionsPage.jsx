import { Text, Container, Heading } from "@chakra-ui/react";
import { array } from "../array";
import Stars from "./stars";
import ButtonRate from "./buttonRate";

export default function QuestionsPage({
  currentQuestion,
  handleNextQuestion,
  handlePreviousQuestion,
  userName,
  participant,
  hover,
  setHover,
  rating,
  setRating,
  handleAvaliation,
  questions,
}) {
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
        {questions[currentQuestion] && (
          <span>
            Essa foi a sua pontução anterior:{questions[currentQuestion].rating}
          </span>
        )}
        <Heading>{array[currentQuestion].question}</Heading>
        <Text>{array[currentQuestion].questionDescription}</Text>
      </Container>
      <Stars
        hover={hover}
        setHover={setHover}
        rating={rating}
        setRating={setRating}
        handleAvaliation={handleAvaliation}
        handleNextQuestion={handleNextQuestion}
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
          rating={rating}
        />
        {userName(participant)}
      </Container>
    </Container>
  );
}
