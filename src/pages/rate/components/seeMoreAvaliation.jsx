import {
  Container,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  Text,
  Flex,
  Heading,
  Button,
  Progress,
  Textarea,
} from "@chakra-ui/react";
import {
  CalendarIcon,
  CloseIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@chakra-ui/icons";
import formattingText from "../../../utils/formattingText";
import { useState } from "react";
import { TiStar } from "react-icons/ti";
import { parseISO, format } from "date-fns";
import { ptBR } from 'date-fns/locale';

export default function SeeMoreAvaliation({
  isOpen,
  onClose,
  avaliation,
  getAverageRating,
  filterValidRatings,
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const filteredQuestionsRATING = avaliation.questions.filter(
    (question) => question.questionType === "RATING"
  );
  const filteredQuestionsOBSERVATION = avaliation.questions.filter(
    (question) => question.questionType === "OBSERVATION"
  );

  const [
    alternanceObservationandQuestions,
    setAlternanceObservationandQuestions,
  ] = useState(false);
  const rating = avaliation.questions[currentQuestion].rating;
  const justification = avaliation.questions[currentQuestion].justification;

  const clickNext = () => {
    setCurrentQuestion((prev) => prev + 1);
  };

  const clickPrevious = () => {
    setCurrentQuestion((prev) => prev - 1);
  };

  const showObservations = () => {
    setAlternanceObservationandQuestions(!alternanceObservationandQuestions);
  };

  const handleClose = () => {
    onClose();
    setCurrentQuestion(0);
    setAlternanceObservationandQuestions(false)
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={handleClose} isCentered>
        <ModalOverlay>
          <ModalContent
            bg="#1c222b"
            minW="600px"
            minH="500px"
            borderLeft="6px solid"
            borderLeftColor="#971520"
          >
            <ModalHeader paddingBottom="10px">
              <Container
                padding="0px"
                minW="100%"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                borderTopRightRadius="8px"
                color="white"
              >
                <Text display="flex" gap="10px" fontWeight="400">
                  Avaliação feita por:<strong>{formattingText(avaliation.reviewer)}</strong>
                </Text>
                <IconButton
                  onClick={handleClose}
                  bg="transparent"
                  _hover={{}}
                  _active={{}}
                >
                  <CloseIcon color="white" />
                </IconButton>
              </Container>
            </ModalHeader>
            <ModalBody color="#ffffff" padding="5px">
              <Container
                display="flex"
                padding="0px"
                margin="0px"
                marginBottom="20px"
                flexDir="column"
                alignItems="center"
                gap="20px"
              >
                <Container display="flex" flexDir="row">
                  <Container padding="0px" fontSize="18px">
                    <Flex>
                      <strong>
                        <Text marginRight="8px">Pessoa avaliada:</Text>
                      </strong>
                      {formattingText(avaliation.reviewed)}
                    </Flex>
                    <Button
                      bgColor="#700e17"
                      color="white"
                      marginTop="10px"
                      onClick={showObservations}
                      _hover={{}}
                      _active={{ bgColor: "#520a11" }}
                    >
                      {!alternanceObservationandQuestions
                        ? "Mostrar Observação"
                        : "Mostrar Perguntas"}
                    </Button>
                  </Container>
                  <Container width="auto" padding="0px" fontSize="18px">
                    <Flex alignItems="center" fontSize="20px">
                      <CalendarIcon marginRight="5px" />
                      <strong>
                        <Text>{format(parseISO(avaliation.date), "dd/MM/yyyy", {
                          locale: ptBR,
                        })}</Text>
                      </strong>
                    </Flex>
                    <strong>
                      <Text whiteSpace="nowrap" marginTop="10px">
                        Média dos Ratings:{" "}
                        {getAverageRating(
                          filterValidRatings(avaliation.questions)
                        )}
                      </Text>
                    </strong>
                  </Container>
                </Container>
                {alternanceObservationandQuestions === false ? (
                  <Container
                    width="100%"
                    display="flex"
                    flexDir="column"
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                    padding="0px"
                  >
                    <Container
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexDirection="column"
                      top="0px"
                    >
                      <Container textAlign="center">
                        <Heading fontSize="40px">
                          {filteredQuestionsRATING[currentQuestion].questionName}
                        </Heading>
                        <Text fontSize="22px">
                          {
                            filteredQuestionsRATING[currentQuestion]
                              .questionDescription
                          }
                        </Text>
                      </Container>
                      <div style={{ display: "flex" }}>
                        {[
                          ...Array(
                            parseInt(avaliation.avaliationInfo.numberOfStars)
                          ),
                        ].map((_, i) => {
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
                                color={
                                  ratingValue <= rating
                                    ? "#971520"
                                    : "#ffffff2b"
                                }
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
                    <Container
                      padding="0px"
                      display="flex"
                      justifyContent="start"
                      width="96%"
                      flexDirection="column"
                      bottom="20px"
                    >
                      <div
                        style={{
                          background: "#971520",
                          width: "110px",
                          paddingLeft: "4px",
                          borderTopLeftRadius: "2px",
                          borderTopRightRadius: "2px",
                        }}
                      >
                        <strong>Justificativa</strong>
                      </div>
                      <textarea
                        style={{
                          fontSize: "1.1em",
                          width: "100%",
                          height: "70px",
                          padding: "2px",
                          resize: "none",
                          background: "transparent",
                          border: "1px solid #971520",
                          borderRadius: "6px",
                          borderTopLeftRadius: "0px",
                          outline: "none",
                          overflowY: "scroll",
                        }}
                        required
                        readOnly
                        value={
                          justification || "Esta questão não foi justificada"
                        }
                      />
                    </Container>
                  </Container>
                ) : (
                  <Container
                    width="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                    padding="0px"
                  >
                    <Heading fontSize="40px">Observação</Heading>
                    <Textarea
                      maxWidth="96%"
                      resize="none"
                      readOnly
                      fontSize="20px"
                      height="200px"
                      marginTop="25px"
                      focusBorderColor="#ffffff"
                      overflow="hidden"
                      overflowY="auto"
                      defaultValue={filteredQuestionsOBSERVATION[0].observation}
                    />
                  </Container>
                )}
              </Container>
            </ModalBody>
            <ModalFooter
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              padding="5px"
              paddingLeft="20px"
              minW="100%"
              minH="60px"
            >
              {!alternanceObservationandQuestions && (
                <>
                  <Container
                    padding="0px"
                    margin="0px"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    maxW="100px"
                    paddingBottom="10px"
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
                    {currentQuestion !== filteredQuestionsRATING.length - 1 && (
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
                      max={filteredQuestionsRATING.length - 1}
                      borderRadius="20px"
                      colorScheme="red"
                      size="xs"
                      maxWidth="300px"
                    />
                  </Container>
                </>
              )}
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </div>
  );
}
