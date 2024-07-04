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
  const user = JSON.parse(localStorage.getItem("user"))
  const savedAvaliations =
    JSON.parse(localStorage.getItem("avaliations")) || [];

  const avaliation = {
    reviewer: user.name || "",
    reviewed: participant,
    questions: questions,
    stars: localStorage.getItem("numberStars"),
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
        height: "100vh",
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
          h="525px"
          maxH="550px"
          width="700px"
          padding="0px"
          pt="30px"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexDirection="column"
        >
          <Container
            textAlign="center"
            display="flex"
            flexDir="column"
            flexGrow={1}
          >
            <Container
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDir="column"
              flexGrow={1}
              gap="6"
              pos="relative"
              top="30px"
            >
              <Container>
                {questions[currentQuestion] && (
                  <span style={{ color: "#ffffff2b" }}>
                    Essa foi a sua pontução anterior:{" "}
                    {questions[currentQuestion].rating}
                  </span>
                )}
                <Heading>{array[currentQuestion].question}</Heading>
                <Text>{array[currentQuestion].questionDescription}</Text>
              </Container>
              <Container>
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
                    avaliation={avaliation}
                    questions={questions}
                    saveAvaliation={saveAvaliation}
                  />
                )}
              </Container>
            </Container>
          </Container>
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
      </Container>
      <Container
        as="footer"
        minWidth="100%"
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
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
    </div>
  );
}
