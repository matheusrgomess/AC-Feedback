import { Button, Container, Heading } from "@chakra-ui/react"
import ModalAvaliationsDone from "./modalAvaliationsDone"

export default function CreatedAvaliations() {

    return (
        <Container bgColor="white" minHeight="200px" borderRadius="15px" padding="0px" paddingTop="10px" paddingBottom="10px">
            <Container display="flex" alignItems="center" justifyContent="space-between" minHeight="60px" borderBottom="2px solid">
                <Heading color="black">Avaliações criadas:</Heading>
            </Container>
            <Container
                className="scrollbar"
                padding="0px"
                paddingTop="15px"
                maxW="100%"
                maxH="306px"
                overflow="hidden"
                overflowY="auto"
                css={{
                    "&::-webkit-scrollbar": {
                        backgroundColor: "#ffffff",
                        borderRadius: "10px",
                        width: "8px",
                        direction: "rtl",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#1f1f1f",
                        borderRadius: "10px",
                        width: "8px",
                        transition: "background-color 0.5s ease",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "#2c2c2c",
                    }
                }}
            >
                <ModalAvaliationsDone />
            </Container>
            {/*}<Container display="flex" alignItems="center" justifyContent="center" minHeight="140px">
                <Heading color="#bebebe" fontFamily="'Inter', sans-serif" fontSize="40px">Empty</Heading>
            </Container>{*/}

        </Container>
    )
}