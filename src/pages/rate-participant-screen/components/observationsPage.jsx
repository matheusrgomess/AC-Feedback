import { Container, Text, Button, Heading, Textarea } from "@chakra-ui/react";
import { array } from "../array";
import ButtonRate from "./buttonRate";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ObservationsPage({ currentQuestion, handleNextQuestion, handlePreviousQuestion, userName, participant, avaliation, observation, setObservation }) {
    const navigate = useNavigate();

    const handleClick = () => {
        const updatedAvaliation = {
            ...avaliation,
            questions: [...avaliation.questions, { observations: observation }]
        };

        localStorage.setItem("avaliation", JSON.stringify(updatedAvaliation));
        navigate("/home");
        setTimeout(() => {
            toast('Formulário enviado com sucesso!', {
                position: "top-center",
                pauseOnHover: false,
                theme: "dark",
            });
        }, 100);
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
                <Button colorScheme="red" onClick={handleClick}>Enviar</Button>
                {userName(participant)}
            </Container>
        </Container>
    )
}