import { Container, Progress } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { array } from "./array";
import { useState } from "react";
import ObservationsPage from "./components/observationsPage";
import QuestionsPage from "./components/questionsPage";

export default function RateParticipantScreen() {
  const { participant } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [rating, setRating] = useState(null);
  const [justification, setJustification] = useState('');
  const [hover, setHover] = useState(null);
  const [questions, setQuestions] = useState([]);
  const savedAvaliations =
    JSON.parse(localStorage.getItem("avaliations")) || [];
  const avaliation = {
    reviewer: localStorage.getItem("user") || "",
    reviewed: participant,
    questions: questions,
  };

  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1);
    handleAvaliation(rating);
    setRating(null);
    setJustification('');
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion((prev) => prev - 1);
    setRating(questions[currentQuestion - 1]?.rating || 0);
    setJustification(questions[currentQuestion - 1]?.justification || '')
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

  // a ideia da separação dos componentes é boa, mas pode ser melhorada, se percebermos no código, apenas o conteúdo dos cards fica diferente dependendo do tipo
  // da pergunta, em vez de separar os dois componentes, poderia trazer toda a criação e estilização do card e os botões, assim, deixando apenas isolado o que realmente difere
  // se não entender, pode me chamar 
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
            participant={participant}
            hover={hover}
            setHover={setHover}
            rating={rating}
            setRating={setRating}
            questions={questions}
            justification={justification}
            setJustification={setJustification}
          />
        ) : (
          <ObservationsPage
            currentQuestion={currentQuestion}
            handleNextQuestion={handleNextQuestion}
            handlePreviousQuestion={handlePreviousQuestion}
            participant={participant}
            avaliation={avaliation}
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
