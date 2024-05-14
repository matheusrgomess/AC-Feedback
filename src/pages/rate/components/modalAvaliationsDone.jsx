import { useState } from "react";
import {
    Button,
    Container,
    Heading,
    IconButton,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    ModalFooter,
    Progress
} from "@chakra-ui/react";
import {
    CloseIcon,
    ViewIcon,
    ArrowLeftIcon,
    ArrowRightIcon
} from "@chakra-ui/icons";
import { TiStar } from "react-icons/ti";
import '/Usuario/Matheus/Desktop/AC-Feedback/src/pages/rate/components/star/styleStar.css';

export default function ModalAvaliationsDone() {
    const [definingQuestions, setDefiningQuestions] = useState(0);
    const [open, setOpen] = useState(false);
    const [formsSelect, setFormsSelect] = useState({});
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    const numberStars = JSON.parse(localStorage.getItem("numberStars"))
    const valueForms = JSON.parse(localStorage.getItem("valueForms"));
    const questionsList = JSON.parse(localStorage.getItem("questionsList"));

    const getFormsById = (id) => {
        const formsId = valueForms.find((value) => value.id === id);

        setFormsSelect(formsId);
        setTitle(formsId.title);
        setDesc(formsId.desc);
    };

    const handleOpen = (id) => {
        getFormsById(id);
        setOpen(true);
        console.log(formsSelect)
    };

    const handleClose = () => {
        setOpen(false);
        setFormsSelect({});
    };

    const nextQuestion = () => {
        if (definingQuestions < questionsList.length - 1) {
            setDefiningQuestions(definingQuestions + 1)
            setRating(0)
        }
    }

    const returnQuestion = () => {
        if (definingQuestions > 0) {
            setDefiningQuestions(definingQuestions - 1)
            setRating(0)
        }
    }

    return (
        <>
            {valueForms && valueForms.map((valueForms) => {

                return (
                    <div key={valueForms.id}>
                        <Modal isOpen={open} onClose={handleClose} isCentered>
                            <ModalOverlay>
                                <ModalContent bg="#26272D" minW="1200px" minH="550px" borderLeft="6px solid" borderLeftColor="#971520">
                                    <ModalHeader padding="0px">
                                        <Container bg="#ffffff" minW="100%" display="flex" alignItems="center" justifyContent="space-between" borderTopRightRadius="8px">
                                            {title}:
                                            <IconButton onClick={handleClose} bg="transparent" _hover={{}} _active={{}}>
                                                <CloseIcon />
                                            </IconButton>
                                        </Container>
                                    </ModalHeader>
                                    <ModalBody color="#ffffff">
                                        <Container margin="0px" bg="#ffffff" color="#000000" borderRadius="6px">
                                            <Text><strong>Descrição:</strong></Text>
                                            {desc}
                                        </Container>
                                        {questionsList &&
                                            <Container alignItems="center" justifyContent="center" border="2px solid" borderColor="black" borderRadius="8px" minHeight="200px" padding="0px" marginTop="100px">
                                                <Container
                                                    display="grid"
                                                    color="white"
                                                    bgColor="red"
                                                    borderBottom="2px solid"
                                                    borderColor="black"
                                                    minWidth="100%"
                                                    borderTopRadius="8px"
                                                    maxHeight="140px"
                                                    overflow="hidden"
                                                    overflowY="auto"
                                                    minHeight="50px"
                                                    css={{
                                                        "&::-webkit-scrollbar": {
                                                            width: "5px",
                                                        },
                                                        "&::-webkit-scrollbar-thumb": {
                                                            backgroundColor: "#1f1f1f",
                                                            borderRadius: "5px",
                                                            transition: "background-color 0.5s ease",
                                                        },
                                                        "&::-webkit-scrollbar-thumb:hover": {
                                                            backgroundColor: "#2c2c2c",
                                                        }
                                                    }}>
                                                    <Heading overflow='hidden'>
                                                        {questionsList[definingQuestions]}
                                                    </Heading>
                                                </Container>
                                                <Container display="flex" alignItems="center" justifyContent="center" bgColor="#ffffff" minHeight="146px" borderBottomRadius="8px">
                                                    <div style={{ display: "flex", flexDirection: "column", minWidth: "100%" }}>
                                                        <Text color="#000000" whiteSpace="nowrap" marginLeft="10px"><strong>A análise sobre a pergunta foi de: {rating ? rating : 0} ponto(s)</strong></Text>
                                                        <div style={{ display: "flex" }}>
                                                            {[...Array(numberStars)].map((star, i) => {
                                                                const ratingValue = i + 1;

                                                                return (
                                                                    <label key={ratingValue}>
                                                                        <input
                                                                            type="radio"
                                                                            name="rating"
                                                                            value={ratingValue}
                                                                            onClick={() => setRating(ratingValue)}
                                                                        />
                                                                        <TiStar
                                                                            className="star"
                                                                            color="#000000"
                                                                            size={50}
                                                                            onMouseEnter={() => setHover(ratingValue)}
                                                                            onMouseLeave={() => setHover(null)}
                                                                        />
                                                                        <Text
                                                                            textAlign="center"
                                                                            position="relative"
                                                                            bottom="10px"
                                                                            color="#000000"
                                                                        >
                                                                            <strong>{ratingValue}</strong>
                                                                        </Text>
                                                                    </label>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>

                                                </Container>
                                            </Container>
                                        }
                                    </ModalBody>
                                    <ModalFooter display="flex" alignItems="center" justifyContent="space-between" padding="5px" paddingLeft="20px" paddingRight="20px" minW="100%">
                                        <Container padding="0px" margin="0px" display="flex" alignItems="center" justifyContent="space-between" maxW="100px">
                                            {definingQuestions != null && (definingQuestions !== 0 && (<Button padding="0px" bg="transparent" _hover={{ border: "1px solid", borderColor: "#ffffff" }} _active={{ bgColor: "#00000057" }} onClick={returnQuestion}><ArrowLeftIcon color="#ffffff" /></Button>))}
                                            {definingQuestions != null && questionsList && (definingQuestions !== questionsList.length - 1 && (<Button padding="0px" bg="transparent" _hover={{ border: "1px solid", borderColor: "#ffffff" }} _active={{ bgColor: "#00000057" }} onClick={nextQuestion}><ArrowRightIcon color="#ffffff" /></Button>))}
                                        </Container>
                                        <Container padding="0px" margin="0px">
                                            {definingQuestions != null && questionsList && (<Progress value={definingQuestions} max={questionsList.length - 1} borderRadius="20px" colorScheme='blue' size='xs' />)}
                                        </Container>
                                    </ModalFooter>
                                </ModalContent>
                            </ModalOverlay>
                        </Modal>

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
                            >
                                <Heading color="#000000">{valueForms.title}:</Heading>
                                <Button onClick={() => handleOpen(valueForms.id)} bg="#971520" _hover={{}} _active={{ bgColor: "#5a0c12" }} color="#FFFFFF"><ViewIcon marginRight="5px" />Visualizar</Button>
                            </Container>
                            <Container padding="0px">
                                <strong>Descrição:</strong>
                                <br />
                                {valueForms.desc}
                            </Container>
                        </Container>
                    </div>
                );
            })};
        </>
    );
};