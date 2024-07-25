import React from "react";
import Stars from "./stars";
import InputJustification from "./inputJustification";
import { Container } from "@chakra-ui/react";

export default function QuestionsPage({
  hover,
  setHover,
  rating,
  setRating,
  justification,
  setJustification,
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
        <Stars
          hover={hover}
          setHover={setHover}
          rating={rating}
          setRating={setRating}
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
