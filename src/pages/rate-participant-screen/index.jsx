import { Container, Text, Progress } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { array } from "./array";
import { useState, useEffect } from "react";
import ObservationsPage from "./components/observationsPage";
import QuestionsPage from "./components/questionsPage";
import { toast } from "react-toastify";

export default function RateParticipantScreen() {
  const { participant } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [questions, setQuestions] = useState([]);
  const savedAvaliations = JSON.parse(localStorage.getItem("avaliations")) || [];
  const [avaliations, setAvaliations] = useState(savedAvaliations);

  useEffect(() => {
    localStorage.setItem("avaliations", JSON.stringify(avaliations));
  }, [avaliations]);

  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1);
    handleAvaliation(rating);
    setRating(0);
    toast.dismiss();
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion((prev) => prev - 1);
    setRating(questions[currentQuestion - 1]?.rating || 0);
    toast.dismiss();
  };

  const handleAvaliation = (rating) => {
    const newQuestion = {
      question: array[currentQuestion].question,
      rating: rating,
    };

    setQuestions((prev) => {
      const copyQuestionArray = [...prev];
      copyQuestionArray[currentQuestion] = newQuestion;
      return copyQuestionArray;
    });
  };

  const saveAvaliation = (finalAvaliation) => {
    setAvaliations((prev) => {
      const updatedAvaliations = [...prev, finalAvaliation];
      localStorage.setItem("avaliations", JSON.stringify(updatedAvaliations));
      return updatedAvaliations;
    });
    setCurrentQuestion(0);
    setRating(null);
    setHover(null);
    setQuestions([]);
  };

  const userName = (name) => {
    const formattedName = name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    return (
      <Text color="#ffffff3d" fontSize="15px" as="span">
        {formattedName}
      </Text>
    );
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
        minWidth="100%"
      >
        {array[currentQuestion].type === "rate" ? (
          <QuestionsPage
            currentQuestion={currentQuestion}
            handleNextQuestion={handleNextQuestion}
            handlePreviousQuestion={handlePreviousQuestion}
            userName={userName}
            participant={participant}
            hover={hover}
            setHover={setHover}
            rating={rating}
            setRating={setRating}
            questions={questions}
          />
        ) : (
          <ObservationsPage
            currentQuestion={currentQuestion}
            handleNextQuestion={handleNextQuestion}
            handlePreviousQuestion={handlePreviousQuestion}
            userName={userName}
            participant={participant}
            avaliation={{
              reviewer: localStorage.getItem("user") || "",
              reviewed: participant,
              questions: questions,
            }}
            questions={questions}
            handleAvaliation={handleAvaliation}
            saveAvaliation={saveAvaliation}
          />
        )}
      </Container>
      <Container
        as="footer"
        minH="5vh"
        minWidth="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
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
