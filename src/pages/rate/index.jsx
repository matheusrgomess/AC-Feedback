import React from "react";
import { Container, Heading, Progress, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { array } from "./array";
import { useState } from "react";
import ObservationsPage from "./components/observationsPage";
import QuestionsPage from "./components/questionsPage";
import ButtonRate from "./components/buttonRate";
import formattingText from "utils/formattingText";

export default function RateParticipantScreen() {
  const { participant } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [rating, setRating] = useState(null);
  const [justification, setJustification] = useState("");
  const [hover, setHover] = useState(null);
  const [questions, setQuestions] = useState([]);
  const savedAvaliations =
    JSON.parse(localStorage.getItem("avaliations")) || [];

  const avaliation = {
    reviewer: localStorage.getItem("user") || "",
    reviewed: participant,
    questions: questions,
    stars: 5,
  };

  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1);
    handleAvaliation(rating);
    setRating(null);
    setJustification("");
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion((prev) => prev - 1);
    setRating(questions[currentQuestion - 1]?.rating || 0);
    setJustification(questions[currentQuestion - 1]?.justification || "");
  };

  const handleAvaliation = (rating) => {
    const newQuestion = {
      question: array[currentQuestion].question,
      rating: rating,
      justification: justification,
    };

    setQuestions((prev) => {
      const copyQuestionArray = [...prev];
      copyQuestionArray[currentQuestion] = newQuestion;
      return copyQuestionArray;
    });
  };

  const saveAvaliation = (finalAvaliation) => {
    savedAvaliations.push(finalAvaliation);
    localStorage.setItem("avaliations", JSON.stringify(savedAvaliations));
    setQuestions([]);
  };

  return (
    <div
      style={{
        maxHeight: "100vh",
        color: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container
        as="main"
        minH="85vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection={"column"}
        minWidth="100%"
      >
        <Container
          border="1px solid"
          borderColor="#971520"
          borderRadius="8px"
          maxH="500px"
          minW="500px"
          padding="0px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Container textAlign="center">
            {questions[currentQuestion] && (
              <span style={{ color: "#ffffff2b" }}>
                Essa foi a sua pontução anterior:{" "}
                {questions[currentQuestion].rating}
              </span>
            )}
            <Heading>{array[currentQuestion].question}</Heading>
            <Text>{array[currentQuestion].questionDescription}</Text>
          </Container>
          {array[currentQuestion].type === "rate" ? (
            <QuestionsPage
              participant={participant}
              hover={hover}
              setHover={setHover}
              rating={rating}
              setRating={setRating}
              justification={justification}
              setJustification={setJustification}
            />
          ) : (
            <ObservationsPage
              currentQuestion={currentQuestion}
              participant={participant}
              avaliation={avaliation}
              questions={questions}
              saveAvaliation={saveAvaliation}
            />
          )}
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
              {formattingText(participant)}
            </Text>
          </Container>
        </Container>
        <Container
          as="footer"
          minH="100%"
          minWidth="100%"
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          flexGrow={0.5}
        >
          <Container>
            <Progress
              value={currentQuestion}
              max={array.length - 1}
              borderRadius="20px"
              colorScheme="red"
              size="xs"
            />
          </Container>
        </Container>
      </Container>
    </div>
  );
}
