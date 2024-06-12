import { Text, Container, Heading } from "@chakra-ui/react";
import { array } from "../array";
import Stars from "./stars";
import ButtonRate from "./buttonRate";
import formatiingText from "../../../utils/formattingText";
import InputJustification from "./inputJustification";

export default function QuestionsPage({
  currentQuestion,
  handleNextQuestion,
  handlePreviousQuestion,
  participant,
  hover,
  setHover,
  rating,
  setRating,
  handleAvaliation,
  questions
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
      <Container display="flex" alignItems="center" justifyContent="space-between" flexDirection="column" position="relative" bottom="20px" >
        <Container textAlign="center" >
          {questions[currentQuestion] && (
            <span style={{ color: "#ffffff2b" }}>
              Essa foi a sua pontução anterior: {questions[currentQuestion].rating}
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
      </Container>
          <InputJustification rating={rating}/>
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
        <Text color="#ffffff3d" fontSize="15px" as="span">
          {formatiingText(participant)}
        </Text>
      </Container>
    </Container>
  );
}
