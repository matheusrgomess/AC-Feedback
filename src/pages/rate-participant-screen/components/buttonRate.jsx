import { Container, Button } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { array } from "../array";

export default function ButtonRate({ currentQuestion, handleNextQuestion, handlePreviousQuestion }) {
    return (
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
    )
}