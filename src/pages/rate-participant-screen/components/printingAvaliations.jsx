import { useState } from "react";
import { Container, Heading, Button, Text } from "@chakra-ui/react";
import { ViewIcon, CalendarIcon } from "@chakra-ui/icons";
import { matchPath, useLocation } from "react-router-dom";
import formatiingText from "../../../utils/formattingText";
import SeeMoreAvaliation from "./seeMoreAvaliation";

export default function SubmittedAvaliation({ avaliations }) {
  const location = useLocation();
  const [selectedAvaliation, setSelectedAvaliation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [observation, setObservation] = useState("");
  const [averageRating, setAverageRating] = useState("");
  const [arrayRatings, setArrayRatings] = useState([]);

  const checkIfIsHomeScreen = () => {
    return matchPath("/home", location.pathname) ? true : false;
  };

  const getLastRating = () => {
    return avaliations[avaliations.length - 1];
  };

  const getAverageRating = (numbersArray) => {
    return (
      numbersArray.reduce((acc, val) => acc + val, 0) / numbersArray.length
    );
  };

  const createArrayRatings = (avaliation) => {
    const questions = avaliation.questions;
    const ratings = questions
      .filter((question) => !isNaN(question.rating))
      .map((question) => parseFloat(question.rating))
    setArrayRatings(ratings);
  }

  const handleOpenModal = (avaliation, observationRating, averageRating) => {
    setSelectedAvaliation(avaliation);
    setObservation(observationRating);
    setAverageRating(averageRating);
    setIsModalOpen(true);
    createArrayRatings(avaliation);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAvaliation(null);
  };

  const renderAvaliation = (avaliation) => {
    const questions = avaliation.questions;
    const filteredValidRatings = questions
      .filter((question) => !isNaN(question.rating))
      .map((question) => parseFloat(question.rating));

    const observationRating = questions.find((question) =>
      isNaN(question.rating)
    );

    const averageRating = getAverageRating(filteredValidRatings);

    return (
      <Container
        key={avaliation.id}
        as="div"
        bg="white"
        w="95%"
        minH="200px"
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
          <Heading>{formatiingText(avaliation.reviewer)}:</Heading>
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
            <Button
              bg="#971520"
              _hover={{}}
              _active={{ bgColor: "#5a0c12" }}
              color="#ffffff"
              padding="0px"
              size="sm"
              margin="5px"
              marginLeft="10px"
              onClick={() => handleOpenModal(avaliation, observationRating.rating, averageRating)}
            >
              <ViewIcon />
            </Button>
          </Container>
        </Container>
        <Container padding="0px">
          <Text color="white">
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
      {avaliations && checkIfIsHomeScreen ?
        renderAvaliation(getLastRating())
        :
        avaliations.map((avaliation) => renderAvaliation(avaliation))
      }
      {selectedAvaliation && (
        <SeeMoreAvaliation
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          avaliation={selectedAvaliation}
          observation={observation}
          averageRating={averageRating}
          arrayRatings={arrayRatings}
        />
      )}
    </>
  );
}
