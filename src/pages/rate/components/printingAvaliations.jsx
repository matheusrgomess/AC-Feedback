import { useState } from "react";
import { Container, Heading, Button, Text, Tooltip } from "@chakra-ui/react";
import { ViewIcon, CalendarIcon } from "@chakra-ui/icons";
import formattingText from "utils/formattingText";
import { useLocation } from "react-router-dom";
import SeeMoreAvaliation from "./seeMoreAvaliation";

export default function SubmittedAvaliation({ avaliations }) {
  const [selectedAvaliation, setSelectedAvaliation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const checkIfIsHomeScreen = () => {
    return location.pathname === "/home";
  };

  const getLastRating = () => {
    return avaliations[avaliations.length - 1];
  };

  const getAverageRating = (numbersArray) => {
    return (
      numbersArray.reduce((acc, val) => acc + val, 0) / numbersArray.length
    );
  };

  const filterValidRatings = (questions) => {
    return questions
      .filter((question) => typeof question.rating === "number")
      .map((question) => parseFloat(question.rating));
  };

  const findObservation = (questions) => {
    return questions.find((question) => typeof question.rating === "string");
  };

  const handleOpenModal = (avaliation) => {
    setIsModalOpen(true);
    setSelectedAvaliation(avaliation);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const renderAvaliation = (avaliation) => {
    const questions = avaliation.questions;
    const filteredValidRatings = filterValidRatings(questions);

    const observationRating = findObservation(questions);

    const averageRating = getAverageRating(filteredValidRatings);

    return (
      <Container
        key={avaliation.id}
        as="div"
        bg="white"
        w="95%"
        maxH="200px"
        border="2px solid"
        borderColor="#971520"
        padding="10px"
        borderRadius="12px"
        marginBottom="15px"
        bgColor="#1c222b"
      >
        <Container
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          padding="0px"
          marginBottom="5px"
          borderBottom="2px solid"
          borderColor="#ffffff"
          overflow="hidden"
          color="#ffffff"
        >
          <Heading>{formattingText(avaliation.reviewer)}:</Heading>
          <Container
            display="flex"
            width="auto"
            alignItems="center"
            padding="0px"
            margin="0px"
          >
            <CalendarIcon color="white" />
            <Text paddingInline="8px" color="white">
              {avaliation.date}
            </Text>
            <Tooltip
              label="Ver avaliação completa"
              aria-label="tooltip para botão de visualizar"
            >
              <Button
                bg="#971520"
                _hover={{}}
                _active={{ bgColor: "#5a0c12" }}
                color="#ffffff"
                padding="0px"
                size="sm"
                margin="5px"
                marginLeft="10px"
                onClick={() => handleOpenModal(avaliation)}
              >
                <ViewIcon />
              </Button>
            </Tooltip>
          </Container>
        </Container>
        <Container padding="0px">
          <Text
            color="white"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              WebkitLineClamp: 3,
            }}
          >
            {observationRating && (
              <>
                <strong>Observação:</strong> {observationRating.rating}
              </>
            )}
          </Text>
          <br />
          <Text color="white">
            <strong>Média dos Ratings:</strong> {averageRating}
          </Text>
          <br />
        </Container>
      </Container>
    );
  };

  return (
    <>
      {avaliations && checkIfIsHomeScreen()
        ? renderAvaliation(getLastRating())
        : avaliations.map((avaliation) => renderAvaliation(avaliation))}
      {selectedAvaliation && (
        <SeeMoreAvaliation
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          avaliation={selectedAvaliation}
          getAverageRating={getAverageRating}
          getObservation={findObservation}
          filterValidRatings={filterValidRatings}
        />
      )}
    </>
  );
}
