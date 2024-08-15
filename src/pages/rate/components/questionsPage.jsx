import React from "react";
import InputJustification from "./inputJustification";
import { Container } from "@chakra-ui/react";
import { StarsForQuestionsPage } from "components/Stars";

export default function QuestionsPage({
  hover,
  setHover,
  rating,
  setRating,
  justification,
  setJustification,
  numberOfStars
}) {
  return (
    <div style={{ position: "relative" }}>
      <Container
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDirection="column"
        position="relative"
        bottom="20px"
      >
        <StarsForQuestionsPage
          hover={hover}
          setHover={setHover}
          rating={rating}
          setRating={setRating}
          numberOfStars={numberOfStars}
        />
      </Container>
      <InputJustification
        rating={rating}
        justification={justification}
        setJustification={setJustification}
      />
    </div>
  );
}
