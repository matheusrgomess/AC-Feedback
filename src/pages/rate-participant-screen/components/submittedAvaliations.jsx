import { Container, Heading, Button, Text } from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";

export default function SubmittedAvaliation() {
    const avaliations = JSON.parse(localStorage.getItem("avaliations"))


    return (
        <>
            {avaliations.map((avaliation, index) => (
                <Container
                    as="div"
                    bg="white"
                    w="95%"
                    minH="200px"
                    border="2px solid"
                    borderColor="#000000"
                    padding="10px"
                    borderRadius="12px"
                    marginBottom="15px"
                >
                    <Container
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        padding="0px"
                        marginBottom="5px"
                        borderBottom="2px solid"
                        borderColor="#000000"
                        overflow="hidden"
                        color="#000000"
                    >
                        <Heading>{avaliation.reviewer}:</Heading>
                        <Button bg="#971520" _hover={{}} _active={{ bgColor: "#5a0c12" }} color="#FFFFFF"><ViewIcon marginRight="5px" />Visualizar</Button>
                    </Container>
                    <Container padding="0px">
                        <Text color="black">
                            <strong>Observacoes:</strong>
                        </Text>
                        <br />
                    </Container>
                </Container>
            ))}

        </>

    )
}