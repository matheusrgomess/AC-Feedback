import { Container, Heading, Button, Modal, Text, Textarea, ModalOverlay, Select, ModalContent, ModalHeader, IconButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, FormHelperText } from "@chakra-ui/react"
import { CloseIcon, ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Form, Formik, Field, ErrorMessage } from "formik";
import '../rate.css'
import StarsList from "./StarsList";
import { useState } from "react";
import ConfigAvaliations from "./configAvaliations";
import * as Yup from "yup";

export default function NewAvaliation() {
    const [open1stModal, setOpen1stModal] = useState(false);
    const [open2ndModal, setOpen2ndModal] = useState(false);
    const [arrayForms, setArrayForms] = useState(JSON.parse(localStorage.getItem("valueForms")) || []);

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Required field"),
        desc: Yup.string().required("Required field"),
    })

    const handleSubmit = (values) => {
        const newForm = { ...values, id: Math.floor(Math.random() * 100) };
        const newArray = [...arrayForms, newForm];
        localStorage.setItem("valueForms", JSON.stringify(newArray));
        setArrayForms(newArray);
        setOpen1stModal(false);
    }

    const handleOpen1st = () => {
        setOpen1stModal(true);
    }

    const handleClose1st = () => {
        setOpen1stModal(false);
    }

    const handleOpen2nd = () => {
        setOpen2ndModal(true);
    }

    const handleClose2nd = () => {
        setOpen2ndModal(false);
    }

    const handleCloseAll = () => {
        setOpen2ndModal(false);
        setOpen1stModal(false);
    }

    return (
        <>
            <Container bgColor="white" minH="100px" borderRadius="15px" padding="20px">
                <Container display="flex" alignItems="center" justifyContent="space-between">
                    <Heading color="black">Nova Avaliação:</Heading>

                </Container>
                <Container marginTop="50px" display="flex" alignItems="center" justifyContent="space-between">
                    <Button
                        onClick={handleOpen1st}
                        bg="green"
                        color="white"
                        border="2px solid"
                        borderColor="black"
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
                    <ModalContent bgColor="#26272D" minWidth="1200px" minHeight="550px" borderLeft="6px solid" borderLeftColor="#971520">
                        <ModalHeader padding="0px">
                            <Container bgColor="white" minWidth="100%" display="flex" alignItems="center" justifyContent="space-between" color="#000000" borderTopRightRadius="8px">
                                Nova Avaliação:
                                <IconButton onClick={handleClose1st} bgColor="transparent" _hover={{}} _active={{}}>
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
                                                    <FormLabel color="#FFFFFF">Título da Avaliação:</FormLabel>
                                                    <Input borderRadius="10px" color="#FFFFFF" {...field} id="title" />
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
                                                    <FormLabel color="#FFFFFF">Descrição:</FormLabel>
                                                    <Textarea
                                                        borderRadius="10px"
                                                        color="#FFFFFF"
                                                        resize="none"
                                                        minHeight="120px"
                                                        maxHeight="200px"
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
                                            <Text color="#FFFFFF">
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

                        </ModalBody>
                        <ModalFooter display="flex" alignItems="center" justifyContent="space-between" padding="5px" paddingLeft="20px" paddingRight="20px" minWidth="100%">
                            <Container padding="0px" margin="0px" display="flex" alignItems="center" justifyContent="space-between" maxWidth="100px">
                                <Button padding="0px" bgColor="transparent" _hover={{ border: "1px solid", borderColor: "white" }} _active={{ bgColor: "#00000057" }}><ArrowLeftIcon color="white" /></Button>
                                <Button padding="0px" bgColor="transparent" _hover={{ border: "1px solid", borderColor: "white" }} _active={{ bgColor: "#00000057" }}><ArrowRightIcon color="white" /></Button>
                            </Container>
                            <Button
                                onClick={handleOpen2nd}
                                bg="green"
                                color="white"
                                border="2px solid"
                                borderColor="#FFFFFF"
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
                            <IconButton onClick={handleClose2nd} bgColor="transparent" _hover={{}} _active={{}}>
                                <CloseIcon />
                            </IconButton>
                        </ModalHeader>
                        <ModalBody>
                            <Text>
                                Deseja realmente enviar este formulário? (esta ação não poderá ser desfeita!)
                            </Text>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="white" bgColor="#858585" _hover={{}} _active={{ bgColor: "#0000009c" }} onClick={handleClose2nd}>
                                Cancelar
                            </Button>
                            <Button color="white" bgColor="#971520" _hover={{}} _active={{ bgColor: "#6f0f17" }} onClick={handleCloseAll} marginLeft="20px">
                                Confirmar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </>

    )
}