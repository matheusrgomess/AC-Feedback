import React from "react";
import { Container, Text, Button, Textarea, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import logoAC from "../../../assets/aclogo.png";
import { format } from "date-fns";

export default function ObservationsPage({
  currentQuestion,
  questions,
  avaliation,
  saveAvaliation,
}) {
  const questionGroups = JSON.parse(localStorage.getItem("QuestionGroups"))
  const arrayQuestions = questionGroups
    .filter(group => group.activatedSet)
    .flatMap(group => group.questions);
  const navigate = useNavigate();
  const [observation, setObservation] = useState("");

  const handleClick = () => {
    const updatedQuestions = [
      ...questions,
      { type: "OBSERVATION", question: arrayQuestions[currentQuestion].question, rating: observation },
    ];
    const updatedAvaliation = {
      ...avaliation,
      questions: updatedQuestions,
      id: Math.floor(Math.random() * 100),
      date: format(new Date(), "dd/MM/yyyy"),
    };
    saveAvaliation(updatedAvaliation);
    navigate("/home");
    toast(
      <Container
        display="flex"
        padding="0px"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <Image
          src={logoAC}
          width="30px"
          paddingRight="5px"
          objectFit="contain"
        />
        <Text whiteSpace="nowrap">
          <strong>Formulário enviado com sucesso!</strong>
        </Text>
      </Container>,
      {
        position: "top-center",
        pauseOnHover: false,
        theme: "dark",
        closeOnClick: true,
        closeButton: false,
      }
    );
  };

  const modObservation = (event) => {
    const newObservation = event.target.value;
    setObservation(newObservation);
  };

  return (
    <Container
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="space-between"
      gap="20px"
    >
      <Textarea
        placeholder="Digite Aqui"
        resize={"none"}
        height="250px"
        w="550px"
        value={observation}
        onChange={modObservation}
        flexGrow={1}
      />

      <Container textAlign="center">
        <Button
          colorScheme="red"
          size="lg"
          onClick={handleClick}
          isDisabled={!observation}
        >
          Enviar
        </Button>
      </Container>
    </Container>
  );
}
