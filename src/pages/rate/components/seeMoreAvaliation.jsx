import { Container, IconButton, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, ModalFooter, Text, Flex, Heading, Button, Progress, Textarea } from "@chakra-ui/react";
import { CalendarIcon, CloseIcon, ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import formatiingText from "../../../utils/formattingText";
import { array } from "../array";
import { useState } from "react";
import { TiStar } from "react-icons/ti";
import styled from '@emotion/styled';

export default function SeeMoreAvaliation({ isOpen, onClose, avaliation, observation, averageRating, arrayRatings, arrayJustification, stars }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const filteredQuestions = array.filter(item => item.type === "rate");
    const [alternanceObservationandQuestions, setAlternanceObservationandQuestions] = useState(false);
    const rating = arrayRatings[currentQuestion]
    const justifications = arrayJustification[currentQuestion];
    const numberStars = JSON.parse(localStorage.getItem("numberStars"));

    console.log(arrayJustification)
    const clickNext = () => {
        setCurrentQuestion((prev) => prev + 1);
    };

    const clickPrevious = () => {
        setCurrentQuestion((prev) => prev - 1);
    };

    const showObservations = () => {
        setAlternanceObservationandQuestions(!alternanceObservationandQuestions);
    };

    const StyledTextarea = styled.textarea`
  font-size: 1em;
  width: 100%;
  height: 70px;
  padding: 2px;
  resize: none;
  background: transparent;
  border: 2px solid #971520;
  border-radius: 4px;
  border-top-left-radius: 0px;
  outline: none;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    background-color: #ffffff;
    border-radius: 10px;
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #700e17;
    border-radius: 10px;
    width: 8px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #86111c;
  }
`;

    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay>
                    <ModalContent bg="#1c222b" minW="600px" minH="500px" borderLeft="6px solid" borderLeftColor="#971520">
                        <ModalHeader padding="0px">
                            <Container bg="#1c222b" minW="100%" display="flex" alignItems="center" justifyContent="space-between" borderTopRightRadius="8px" color="white">
                                <Heading size="ms">Avaliação feita por: {formatiingText(avaliation.reviewer)}</Heading>
                                <IconButton onClick={onClose} bg="transparent" _hover={{}} _active={{}}>
                                    <CloseIcon color="white" />
                                </IconButton>
                            </Container>
                        </ModalHeader>
                        <ModalBody color="#ffffff">
                            <Container display="flex" padding="0px" margin="0px" marginBottom="20px">
                                <Container padding="0px" fontSize="18px">
                                    <Flex>
                                        <strong>
                                            <Text marginRight="8px">Pessoa avaliada:</Text>
                                        </strong>
                                        {formatiingText(avaliation.reviewed)}
                                    </Flex>
                                    <Button bgColor="#700e17" color="white" marginTop="10px" onClick={showObservations} _hover={{}} _active={{ bgColor: "#520a11" }}>
                                        {alternanceObservationandQuestions === false ? "Mostrar Observação" : "Mostrar Perguntas"}
                                    </Button>
                                </Container>
                                <Container width="auto" padding="0px" fontSize="18px">
                                    <Flex alignItems="center" fontSize="20px">
                                        <CalendarIcon marginRight="5px" />
                                        <strong>
                                            <Text>{avaliation.date}</Text>
                                        </strong>
                                    </Flex>
                                    <strong>
                                        <Text whiteSpace="nowrap" marginTop="10px">Média dos Ratings: {averageRating}</Text>
                                    </strong>
                                </Container>
                            </Container>
                            {alternanceObservationandQuestions === false ?
                                <Container width="100%" minHeight="300px" display="flex" alignItems="center" justifyContent="center" flexDirection="column" position="absolute">
                                    <Container display="flex" alignItems="center" justifyContent="space-between" flexDirection="column" position="absolute" top="0px">
                                        <Container textAlign="center">
                                            <Heading fontSize="40px">{filteredQuestions[currentQuestion].question}</Heading>
                                            <Text fontSize="22px">{filteredQuestions[currentQuestion].questionDescription}</Text>
                                        </Container>
                                        <div style={{ display: "flex" }}>
                                            {[...Array(parseInt(stars))].map((star, i) => {
                                                const ratingValue = i + 1;

                                                return (
                                                    <label key={ratingValue}>
                                                        <input
                                                            type="radio"
                                                            style={{ opacity: "0" }}
                                                            name="rating"
                                                            value={ratingValue}
                                                        />
                                                        <TiStar
                                                            className="star"
                                                            color={ratingValue <= (rating) ? "#971520" : "#ffffff2b"}
                                                            size={50}
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
                                    </Container>

                                    <Container padding="0px" display="flex" justifyContent="center" width="100%" flexDirection="column" position="absolute" bottom="20px">
                                        <div style={{
                                            background: "#971520",
                                            width: "100px",
                                            paddingRight: "4px",
                                            paddingLeft: "4px",
                                            borderTopLeftRadius: "2px",
                                            borderTopRightRadius: "2px",
                                        }}
                                        >
                                            <strong>Justificativa</strong>
                                        </div>
                                        <StyledTextarea
                                            required
                                            readOnly
                                            value={justifications || "Esta questão não foi justificada"}
                                        />
                                    </Container>
                                </Container>
                                :
                                <Container width="100%" minHeight="300px" display="flex" alignItems="center" justifyContent="center" flexDirection="column" position="absolute" top="128px">
                                    <Heading fontSize="40px">
                                        Observação
                                    </Heading>
                                    <Textarea
                                        resize="none"
                                        readOnly
                                        fontSize="20px"
                                        height="200px"
                                        marginTop="25px"
                                        focusBorderColor="#ffffff"
                                        overflow="hidden"
                                        overflowY="auto"
                                        css={{
                                            "&::-webkit-scrollbar": {
                                                borderRadius: "10px",
                                                width: "6px",
                                                direction: "rtl",
                                            },
                                            "&::-webkit-scrollbar-thumb": {
                                                backgroundColor: "#700e17",
                                                borderRadius: "10px",
                                                width: "6px",
                                            },
                                            "&::-webkit-scrollbar-thumb:hover": {
                                                backgroundColor: "#86111c",
                                            },
                                        }}
                                    >
                                        {observation}
                                    </Textarea>
                                </Container>
                            }

                        </ModalBody>
                        <ModalFooter display="flex" alignItems="center" justifyContent="space-between" padding="5px" paddingLeft="20px" minW="100%">
                            {alternanceObservationandQuestions === false &&
                                <>
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
                                                onClick={clickPrevious}
                                            >
                                                <ArrowLeftIcon color="#ffffff" />
                                            </Button>
                                        )}
                                        {currentQuestion !== filteredQuestions.length - 1 && (
                                            <Button
                                                padding="0px"
                                                bg="transparent"
                                                _hover={{ border: "1px solid", borderColor: "#ffffff" }}
                                                _active={{ bgColor: "#00000057" }}
                                                onClick={clickNext}
                                            >
                                                <ArrowRightIcon color="#ffffff" />
                                            </Button>
                                        )}
                                    </Container>
                                    <Container maxWidth="300px" margin="0px">
                                        <Progress
                                            value={currentQuestion}
                                            max={filteredQuestions.length - 1}
                                            borderRadius="20px"
                                            colorScheme="red"
                                            size="xs"
                                            maxWidth="300px"
                                        />
                                    </Container>
                                </>

                            }
                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </div >
    );
}
