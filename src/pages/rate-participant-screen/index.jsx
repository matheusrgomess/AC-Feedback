import { Heading, Container, Text, Progress, Button } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import Header from "../../components/Header";
import { TiStar } from "react-icons/ti";
import { array } from "./array";
import { useState } from "react";

export default function RateParticipantScreen() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1);
  }

  const handlePreviousQuestion = () => {
    setCurrentQuestion((prev) => prev - 1);
  }

  return (
    <div style={{
      maxHeight: '100vh',
      color: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Header namePage="AVALIAÇÃO DO: " /*colocar aqui o nome do avaliado*/ />
      <Container as='main' minH='85vh' display="flex" alignItems="center" justifyContent="center" minWidth="100%">
        <Container border="1px solid" borderColor="#971520" borderRadius="8px" minH="500px" minW="500px" padding="0px" paddingTop="180px" display="flex" alignItems="center" justifyContent="space-between" flexDirection="column">
          <Container textAlign="center">
            <Heading>
              {array[currentQuestion].question}
            </Heading>
            <Text>
              {array[currentQuestion].questionDescription}
            </Text>
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
                    color={ratingValue <= (hover || rating) ? "#cda90e" : "#000000"}
                    size={50}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                  />
                  <Text
                    textAlign="center"
                    position="relative"
                    bottom="10px"
                    color={ratingValue <= (hover || rating) ? "#cda90e" : "#000000"}
                  >
                    <strong>{ratingValue}</strong>
                  </Text>
                </label>
              );
            })}
          </div>
          <Container minWidth="100%" padding="15px">
            <Container padding="0px" margin="0px" display="flex" alignItems="center" justifyContent="space-between" maxW="100px">
              {currentQuestion !== 0 && <Button padding="0px" bg="transparent" _hover={{ border: "1px solid", borderColor: "#ffffff" }} _active={{ bgColor: "#00000057" }} onClick={handlePreviousQuestion}><ArrowLeftIcon color="#ffffff" /></Button>}
              {currentQuestion !== array.length - 1 && <Button padding="0px" bg="transparent" _hover={{ border: "1px solid", borderColor: "#ffffff" }} _active={{ bgColor: "#00000057" }} onClick={handleNextQuestion}><ArrowRightIcon color="#ffffff" /></Button>}
            </Container>
          </Container>
        </Container>
      </Container>
      <Container as="footer" minH='5vh' minWidth='100%' display='flex' alignItems='center' justifyContent='center'>
        <Container>
          <Progress value={currentQuestion} max={array.length - 1} borderRadius="20px" colorScheme='blue' size='xs' />
        </Container>
      </Container>
    </div>
  )
}