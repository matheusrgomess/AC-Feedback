import { Container, Text, Progress } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { array } from "./array";
import { useState } from "react";
import ObservartionsPage from "./components/observationsPage";
import QuestionsPage from "./components/questionsPage";

export default function RateParticipantScreen() {
  const { participant } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [avaliation, setAvaliation] = useState({
    reviewer: localStorage.getItem("user") || '',
    reviewed: participant,
    questions: []
  });

  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1);
    handleAvaliation(rating);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion((prev) => prev - 1);
  };

  const handleAvaliation = (rating) => {
    console.log("avaliation", avaliation)
    const newQuestion = {
      question: array[currentQuestion].question,
      rating: rating
    }
    console.log('newQuestion', newQuestion)
  
    setAvaliation(prevAvaliation => {
      return {
        ...prevAvaliation,
        questions: [...prevAvaliation.questions, newQuestion]
      };
    });
  }

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
          />
        ) : (
          <ObservartionsPage
            currentQuestion={currentQuestion}
            handleNextQuestion={handleNextQuestion}
            handlePreviousQuestion={handlePreviousQuestion}
            userName={userName}
            participant={participant}
            avaliation={avaliation}

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
