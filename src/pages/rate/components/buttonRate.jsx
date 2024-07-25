import { Container, Button } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { getActivatedGroup } from "services/questionsSet";

export default function ButtonRate({ currentQuestion, handleNextQuestion, handlePreviousQuestion, rating }) {
    const [activatedGroup, setActivatedGroup] = useState()

    useEffect(() => {
        async function fetchData() {
            try {
                setActivatedGroup(await getActivatedGroup())
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    return (
        <Container
            padding="0px"
            margin="0px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            maxW="100px"
        >
            <Button
                padding="0px"
                isDisabled={currentQuestion === 0}
                bg="transparent"
                _hover={{ border: "1px solid", borderColor: "#ffffff" }}
                _active={{ bgColor: "#00000057" }}
                onClick={handlePreviousQuestion}
            >
                <ArrowLeftIcon color="#ffffff" />
            </Button>
            {currentQuestion !== activatedGroup?.questions?.length - 1 && (rating === null || rating === 0) ?
                <Button
                    padding="0px"
                    bg="transparent"
                    _hover={{ border: "1px solid", borderColor: "#777a80", cursor: "not-allowed" }}
                    _active={{ bgColor: "#00000057" }}
                    onClick={() => {
                        toast.error('É necessário uma avaliação sobre este item', {
                            autoClose: 2500
                        });
                    }}
                >
                    <ArrowRightIcon color="#777a80" />
                </Button> :
                <Button
                    padding="0px"
                    isDisabled={currentQuestion === activatedGroup?.questions?.length - 1}
                    bg="transparent"
                    _hover={{ border: "1px solid", borderColor: "#ffffff" }}
                    _active={{ bgColor: "#00000057" }}
                    onClick={handleNextQuestion}
                >
                    <ArrowRightIcon color="#ffffff" />
                </Button>
            }
        </Container>
    )
}