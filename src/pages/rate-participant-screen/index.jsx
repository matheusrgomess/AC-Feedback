import {
  Heading,
  Container,
  Text,
  Progress,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { TiStar } from "react-icons/ti";
import { array } from "./array";
import { useState } from "react";

export default function RateParticipantScreen() {
  const { participant } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion((prev) => prev - 1);
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
          <Container
            border="1px solid"
            borderColor="#971520"
            borderRadius="8px"
            minH="500px"
            minW="500px"
            padding="0px"
            paddingTop="180px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flexDirection="column"
          >
            <Container textAlign="center">
              <Heading>{array[currentQuestion].question}</Heading>
              <Text>{array[currentQuestion].questionDescription}</Text>
            </Container>
            <div style={{ display: "flex" }}>
              {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;

                return (
                  <label key={ratingValue}>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={() => setRating(ratingValue)}
                    />
                    <TiStar
                      className="star"
                      color={
                        ratingValue <= (hover || rating)
                          ? "#971520"
                          : "#ffffff2b"
                      }
                      size={50}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(null)}
                    />
                    <Text
                      textAlign="center"
                      position="relative"
                      bottom="10px"
                      color="white"
                    >
                      <strong>{ratingValue}</strong>
                    </Text>
                  </label>
                );
              })}
            </div>
            <Container
              minWidth="100%"
              padding="15px"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Container
                padding="0px"
                margin="0px"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                maxW="100px"
              >
                {currentQuestion !== 0 && (
                  <Button
                    padding="0px"
                    bg="transparent"
                    _hover={{ border: "1px solid", borderColor: "#ffffff" }}
                    _active={{ bgColor: "#00000057" }}
                    onClick={handlePreviousQuestion}
                  >
                    <ArrowLeftIcon color="#ffffff" />
                  </Button>
                )}
                {currentQuestion !== array.length - 1 && (
                  <Button
                    padding="0px"
                    bg="transparent"
                    _hover={{ border: "1px solid", borderColor: "#ffffff" }}
                    _active={{ bgColor: "#00000057" }}
                    onClick={handleNextQuestion}
                  >
                    <ArrowRightIcon color="#ffffff" />
                  </Button>
                )}
              </Container>
              {userName(participant)}
            </Container>
          </Container>
        ) : (
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
                  maxHeight: "200px",
                }}
              >
                <Textarea
                  placeholder="Observações"
                  resize={"none"}
                  height="200px"
                />
              </div>
            </Container>
            <Container maxW="100%" paddingY="15px" display="flex">
              <Container
                w="100%"
                flexDir="row"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                textAlign="center"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    maxWidth: "100px",
                  }}
                >
                  {currentQuestion !== 0 && (
                    <div>
                      <Button
                        padding="0px"
                        bg="transparent"
                        _hover={{ border: "1px solid", borderColor: "red" }}
                        _active={{ bgColor: "#00000057" }}
                        onClick={handlePreviousQuestion}
                      >
                        <ArrowLeftIcon color="#ffffff" />
                      </Button>
                    </div>
                  )}
                  {currentQuestion !== array.length - 1 && (
                    <Button
                      padding="0px"
                      bg="transparent"
                      _hover={{ border: "1px solid", borderColor: "red" }}
                      _active={{ bgColor: "#00000057" }}
                      onClick={handleNextQuestion}
                    >
                      <ArrowRightIcon color="#ffffff" />
                    </Button>
                  )}
                </div>
                <div>
                  <Button colorScheme="red">Enviar</Button>
                </div>
                <div>{userName(participant)}</div>
              </Container>
            </Container>
          </Container>
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
