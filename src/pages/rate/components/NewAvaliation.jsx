import { useState } from "react";
import {
    Container,
    Heading,
    Button,
    Modal,
    Text,
    Textarea,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    IconButton,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    ModalFooter,
    FormHelperText,
    Progress
} from "@chakra-ui/react"
import {
    CloseIcon,
    ArrowLeftIcon,
    ArrowRightIcon
} from "@chakra-ui/icons";
import {
    Form,
    Formik,
    Field,
    ErrorMessage
} from "formik";
import ConfigAvaliations from "./configAvaliations";
import * as Yup from "yup";
import { TiStar } from "react-icons/ti";
import '/Usuario/Matheus/Desktop/AC-Feedback/src/pages/rate/components/star/styleStar.css';

export default function NewAvaliation() {
    const [open1stModal, setOpen1stModal] = useState(false);
    const [open2ndModal, setOpen2ndModal] = useState(false);
    const [arrayForms, setArrayForms] = useState(JSON.parse(localStorage.getItem("valueForms")) || []);
    const [definingQuestions, setDefiningQuestions] = useState(0)
    //useStates das Estrelas
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const numberStars = JSON.parse(localStorage.getItem("numberStars"))

    const questionsList = JSON.parse(localStorage.getItem("questionsList"));

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("É obrigatório este campo"),
        desc: Yup.string().required("É obrigatório este campo"),
    });

    const handleSubmit = (values) => {
        const newForm = { ...values, id: Math.floor(Math.random() * 100) };
        const newArray = [...arrayForms, newForm];
        localStorage.setItem("valueForms", JSON.stringify(newArray));
        setArrayForms(newArray);
        setOpen1stModal(false);
    };

    const handleOpen1st = () => {
        setOpen1stModal(true);
    };

    const handleClose1st = () => {
        setOpen1stModal(false);
        setDefiningQuestions(0);
    };

    const handleOpen2nd = () => {
        setOpen2ndModal(true);
    };

    const handleClose2nd = () => {
        setOpen2ndModal(false);
    };

    const handleCloseAll = () => {
        setOpen2ndModal(false);
        setOpen1stModal(false);
        setDefiningQuestions(0);
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
            <Container bg="#ffffff" minH="100px" borderRadius="15px" padding="20px">
                <Container display="flex" alignItems="center" justifyContent="space-between">
                    <Heading color="#000000">Nova Avaliação:</Heading>
                </Container>
                <Container marginTop="50px" display="flex" alignItems="center" justifyContent="space-between">
                    <Button
                        onClick={handleOpen1st}
                        bg="#007700"
                        color="#FFFFFF"
                        border="2px solid"
                        borderColor="#000000"
                        _hover={{}}
                        _active={{ bg: "#2d6800" }}
                        fontSize="20px"
                    >
                        Criar
                    </Button>
                    <ConfigAvaliations />
                </Container>
            </Container>
            <Modal isOpen={open1stModal} onClose={handleClose1st} isCentered>
                <ModalOverlay>
                    <ModalContent bg="#26272d" minW="1200px" minH="550px" borderLeft="6px solid" borderLeftColor="#971520">
                        <ModalHeader padding="0px">
                            <Container bg="#FFFFFF" minW="100%" display="flex" alignItems="center" justifyContent="space-between" color="#000000" borderTopRightRadius="8px">
                                Nova Avaliação:
                                <IconButton onClick={handleClose1st} bg="transparent" _hover={{}} _active={{}}>
                                    <CloseIcon />
                                </IconButton>
                            </Container>
                        </ModalHeader>
                        <ModalBody padding="15px">
                            <Formik
                                initialValues={{ title: "", desc: "" }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <Field name="title">
                                            {({ field }) => (
                                                <FormControl>
                                                    <FormLabel color="#ffffff">Título da Avaliação:</FormLabel>
                                                    <Input borderRadius="10px" color="#ffffff" {...field} id="title" />
                                                    <ErrorMessage
                                                        name="title"
                                                        component={FormHelperText}
                                                        color="red.500"
                                                    />
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name="desc">
                                            {({ field }) => (
                                                <FormControl marginTop="20px">
                                                    <FormLabel color="#ffffff">Descrição:</FormLabel>
                                                    <Textarea
                                                        borderRadius="10px"
                                                        color="#ffffff"
                                                        resize="none"
                                                        minH="120px"
                                                        maxH="200px"
                                                        {...field}
                                                        id="desc"
                                                    />
                                                    <ErrorMessage
                                                        name="desc"
                                                        component={FormHelperText}
                                                        color="red.500"
                                                    />
                                                </FormControl>
                                            )}
                                        </Field>
                                        {/*}<FormControl>
                                        <Container
                                            W="100%"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="space-between"
                                            paddingRight="6px"
                                            paddingLeft="0px"
                                        >
                                            <Text color="#ffffff">
                                                <strong>Avaliação sobre o colega:</strong>
                                            </Text>
                                            <Select
                                                color="#ffffff"
                                                w="50%"
                                                height="30px"
                                                border="none"
                                                focusBorderColor="#ffffff"
                                            >
                                                <option value="0" style={{ backgroundColor: "#1f1f1f" }}>

                                                </option>
                                                <option value="1" style={{ backgroundColor: "#1f1f1f" }}>
                                                    Arthur
                                                </option>
                                                <option value="2" style={{ backgroundColor: "#1f1f1f" }}>
                                                    Cilene
                                                </option>
                                                <option value="3" style={{ backgroundColor: "#1f1f1f" }}>
                                                    Dúnia
                                                </option>
                                                <option value="4" style={{ backgroundColor: "#1f1f1f" }}>
                                                    Guilherme
                                                </option>
                                                <option value="5" style={{ backgroundColor: "#1f1f1f" }}>
                                                    Juan
                                                </option>
                                                <option value="6" style={{ backgroundColor: "#1f1f1f" }}>
                                                    Matheus Eyng
                                                </option>
                                                <option value="7" style={{ backgroundColor: "#1f1f1f" }}>
                                                    Matheus Gomes
                                                </option>
                                                <option value="8" style={{ backgroundColor: "#1f1f1f" }}>
                                                    Pablo
                                                </option>
                                            </Select>
                                        </Container>
                                    </FormControl>{*/}
                                        <Button
                                            type="submit"
                                        >
                                            Enviar
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                            {questionsList &&
                                <Container alignItems="center" justifyContent="center" border="2px solid" borderColor="black" borderRadius="8px" minHeight="200px" padding="0px">
                                    
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
                                        <Text>
                                            *Avalie seu Colega de Trabalho
                                        </Text>
                                    </Container>
                                    <Container display="flex" alignItems="center" justifyContent="center" bgColor="#ffffff" minHeight="131px" borderBottomRadius="8px">
                                        <div style={{ display: "flex", flexDirection: "column", minWidth:"100%" }}>
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
                                                                color={ratingValue <= (hover || rating) ? "#cda90e" : "#000000"}
                                                                size={50}
                                                                onMouseEnter={() => setHover(ratingValue)}
                                                                onMouseLeave={() => setHover(null)}
                                                            />
                                                            <Text
                                                                textAlign="center"
                                                                position="relative"
                                                                bottom="10px"
                                                                color={ratingValue <= (hover || rating) ? "#cda90e" : "#000000"}
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
                                {definingQuestions != null && questionsList && (<Progress value={definingQuestions} max={questionsList.length-1} borderRadius="20px" colorScheme='blue' size='xs'/>)}
                            </Container>
                            <Button
                                onClick={handleOpen2nd}
                                bg="##007700"
                                color="#ffffff"
                                border="2px solid"
                                borderColor="#ffffff"
                                _hover={{}}
                                _active={{ bg: "#2d6800" }}
                            >
                                Enviar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
            <Modal isOpen={open2ndModal} onClose={handleClose2nd} isCentered>
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader display="flex" alignItems="center" justifyContent="space-between">
                            <Heading>
                                Você tem certeza?
                            </Heading>
                            <IconButton onClick={handleClose2nd} bg="transparent" _hover={{}} _active={{}}>
                                <CloseIcon />
                            </IconButton>
                        </ModalHeader>
                        <ModalBody>
                            <Text>
                                Deseja realmente enviar este formulário? (esta ação não poderá ser desfeita!)
                            </Text>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="#ffffff" bg="#858585" _hover={{}} _active={{ bgColor: "#0000009c" }} onClick={handleClose2nd}>
                                Cancelar
                            </Button>
                            <Button color="#ffffff" bg="#971520" _hover={{}} _active={{ bgColor: "#6f0f17" }} onClick={handleCloseAll} marginLeft="20px">
                                Confirmar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </>
    );
};