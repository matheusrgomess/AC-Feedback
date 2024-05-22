import { Container, Text, Button, Heading, Textarea } from "@chakra-ui/react";
import { array } from "../array";
import ButtonRate from "./buttonRate";

export default function ObservartionsPage({ currentQuestion, handleNextQuestion, handlePreviousQuestion, userName, participant }) {
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
                <Button colorScheme="red">Enviar</Button>
                {userName(participant)}
            </Container>
        </Container>
    )
}