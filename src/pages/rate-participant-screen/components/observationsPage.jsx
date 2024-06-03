import {
  Container,
  Text,
  Button,
  Heading,
  Textarea,
  Image,
} from "@chakra-ui/react";
import { array } from "../array";
import ButtonRate from "./buttonRate";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import logoAC from "../../../assets/aclogo.png";
import { format } from "date-fns";
import formatiingText from "../../../utils/formattingText";

export default function ObservationsPage({
  currentQuestion,
  handleNextQuestion,
  handlePreviousQuestion,
  participant,
  questions,
  avaliation,
  saveAvaliation,
}) {
  const navigate = useNavigate();
  const [observation, setObservation] = useState("");

  const handleClick = () => {
    const updatedQuestions = [
      ...questions,
      { question: array[currentQuestion].question, rating: observation },
    ];
    const updatedAvaliation = { ...avaliation, questions: updatedQuestions, id: Math.floor(Math.random() * 100), date: format(new Date(), 'dd/MM/yyyy') };
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
      border="1px solid"
      borderColor="#971520"
      borderRadius="8px"
      minH="500px"
      minW="500px"
      padding="0px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      flexDirection="column"
    >
      <Container
        textAlign="center"
        w="max-content"
        h="max-content"
        paddingTop="50px"
      >
        <Heading>{array[currentQuestion].question}</Heading>
        <Text color="#ffffff3d">
          {array[currentQuestion].questionDescription}
        </Text>
      </Container>
      <Container textAlign="center">
        <div
          style={{
            maxHeight: "225px",
          }}
        >
          <Textarea
            placeholder="Digite Aqui"
            resize={"none"}
            height="250px"
            value={observation}
            onChange={modObservation}
          />
        </div>
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
        />
        {observation === "" ? (
          <Button colorScheme="red" isDisabled>
            Enviar
          </Button>
        ) : (
          <Button colorScheme="red" onClick={handleClick}>
            Enviar
          </Button>
        )}
        <Text color="#ffffff3d" fontSize="15px" as="span">
          {formatiingText(participant)}
        </Text>
      </Container>
    </Container>
  );
}
