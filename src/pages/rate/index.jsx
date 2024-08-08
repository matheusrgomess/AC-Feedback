import React from "react";
import { Container, Heading, Progress, Text, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ObservationsPage from "./components/observationsPage";
import QuestionsPage from "./components/questionsPage";
import ButtonRate from "./components/buttonRate";
import { formattingName } from "utils/formattingTexts";
import { getActivatedGroup } from "services/questionsSet";
import { postFeedback } from "services/feedbacks";

export default function RateParticipantScreen() {
  const { participant } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [rating, setRating] = useState(null);
  const [justification, setJustification] = useState("");
  const [hover, setHover] = useState(null);
  const [questions, setQuestions] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [activatedGroup, setActivatedGroup] = useState();
  const [loading, setLoading] = useState(true);
  const [numberOfStars, setNumberOfStars] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const group = await getActivatedGroup();
        const sortedQuestions = group.questions.sort((a, b) => {
          if (a.questionType === "OBSERVATION") return 1;
          if (b.questionType === "OBSERVATION") return -1;
          return 0;
        });
        setNumberOfStars(group.numberOfStars);
        setActivatedGroup({ ...group, questions: sortedQuestions });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const avaliation = {
    reviewer: user.name || "",
    reviewed: participant,
    questions: questions,
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
      questionName: activatedGroup.questions[currentQuestion].questionName,
      rating: rating,
      questionType: "RATING",
      questionDescription: activatedGroup.questions[currentQuestion].questionDescription,
      justification: justification,
    };

    setQuestions((prev) => {
      const copyQuestionArray = [...prev];
      copyQuestionArray[currentQuestion] = newQuestion;
      return copyQuestionArray;
    });
  };

  const saveAvaliation = (finalAvaliation) => {
    postFeedback(finalAvaliation)
    setQuestions([]);
  };

  return (
    <div
      style={{
        height: "100vh",
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
        {loading ?
          <Spinner
            thickness="5px"
            width="75px"
            height="75px"
            speed="0.55s"
            emptyColor="white"
            color="#700e17"
          />
          :
          <Container
            border="1px solid"
            borderColor="#700e17"
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
            <Text position="absolute">Grupo de questões:{" "}{activatedGroup.questionSetName}</Text>
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
                  <Heading>{activatedGroup?.questions[currentQuestion].questionName}</Heading>
                  <Text>{activatedGroup?.questions[currentQuestion].questionDescription}</Text>
                </Container>
                <Container>
                  {activatedGroup?.questions[currentQuestion].questionType === "RATING" ? (
                    <QuestionsPage
                      participant={participant}
                      hover={hover}
                      setHover={setHover}
                      rating={rating}
                      setRating={setRating}
                      justification={justification}
                      setJustification={setJustification}
                      numberOfStars={numberOfStars}
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
              <Text fontSize="15px" as="span">
                {formattingName(participant)}
              </Text>
            </Container>
          </Container>
        }
      </Container>
      {!loading &&
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
              max={activatedGroup?.questions.length - 1}
              borderRadius="20px"
              colorScheme="red"
              size="xs"
            />
          </Container>
        </Container>
      }
    </div>
  );
}
