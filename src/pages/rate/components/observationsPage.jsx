import React from "react";
import { Container, Text, Button, Textarea, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import logoAC from "../../../assets/aclogo.png";
import { getActivatedGroup } from "services/questionsSet";

export default function ObservationsPage({
  currentQuestion,
  questions,
  avaliation,
  saveAvaliation,
}) {
  const [activatedGroup, setActivatedGroup] = useState()

  useEffect(() => {
    async function fetchData() {
      try {
        setActivatedGroup(await getActivatedGroup())
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  const navigate = useNavigate();
  const [observation, setObservation] = useState("");
  const handleClick = () => {
    const updatedQuestions = [
      ...questions,
      { questionName: activatedGroup.questions[currentQuestion].questionName, questionType: "OBSERVATION", observation: observation },
    ];
    const updatedAvaliation = {
      ...avaliation,
      questions: updatedQuestions,
      questionSetId: activatedGroup.id
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
        focusBorderColor="#700e17"
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
