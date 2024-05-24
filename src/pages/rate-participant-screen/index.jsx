import { Container, Text, Progress } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { array } from "./array";
import { useState } from "react";
import ObservartionsPage from "./components/observationsPage";
import QuestionsPage from "./components/questionsPage";
import { toast } from "react-toastify";

export default function RateParticipantScreen() {
  const { participant } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const avaliation = {
    reviewer: localStorage.getItem("user") || "",
    reviewed: participant,
    questions: [],
  };

  const [questions, setQuestions] = useState([]);

  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1);
    handleAvaliation(rating);
    setRating(0);
    toast.dismiss();
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion((prev) => prev - 1);
    setRating(0);
    toast.dismiss();
  };

  const handleAvaliation = (rating) => {
    const newQuestion = {
      question: array[currentQuestion].question,
      rating: rating,
    };

    setQuestions((prev) => {
      const copyQuestionArray = [...prev];
      const updatedQuestions = {
        ...newQuestion,
        rating: rating,
      };
      copyQuestionArray[currentQuestion] = updatedQuestions;
      const newArrayQuestions = [...copyQuestionArray];
      return [...newArrayQuestions];
    });
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
          <ObservartionsPage
            currentQuestion={currentQuestion}
            handleNextQuestion={handleNextQuestion}
            handlePreviousQuestion={handlePreviousQuestion}
            userName={userName}
            participant={participant}
            avaliation={avaliation}
            questions={questions}
            handleAvaliation={handleAvaliation}
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
