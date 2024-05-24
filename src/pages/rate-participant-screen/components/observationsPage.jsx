import { Container, Text, Button, Heading, Textarea, Image } from "@chakra-ui/react";
import { array } from "../array";
import ButtonRate from "./buttonRate";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import logoAC from "../../../assets/aclogo.png"

export default function ObservationsPage({
  currentQuestion,
  handleNextQuestion,
  handlePreviousQuestion,
  userName,
  participant,
  questions,
  avaliation,
}) {
  const [observation, setObservation] = useState("");

  const navigate = useNavigate();

  const handleClick = () => {
    console.log("question reviewed ->", questions)
    questions.push({ observation: observation });
    const updatedAvaliation = { ...avaliation, questions: questions };
    localStorage.setItem("avaliation", JSON.stringify(updatedAvaliation));
    navigate("/home");
    toast(
      <Container display="flex" padding="0px" alignItems="center" justifyContent="space-between" width="100%">
        <Image src={logoAC} width="30px" paddingRight="5px" objectFit="contain" />
        <Text whiteSpace="nowrap">
          <strong>Formulário enviado com sucesso!</strong>
        </Text>
      </Container>, {
      position: "top-center",
      pauseOnHover: false,
      theme: "dark",
      closeOnClick: true,
      closeButton: false
    });
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
        {observation === '' ?
                    <Button colorScheme="red" isDisabled>Enviar</Button> :
                    <Button colorScheme="red" onClick={handleClick}>Enviar</Button>
                }
        {userName(participant)}
      </Container>
    </Container>
  );
}
