import { Container, IconButton, InputRightAddon, Input, Text, Button, InputGroup, Heading, Checkbox } from "@chakra-ui/react";
import { CheckIcon, EditIcon } from "@chakra-ui/icons";
import { useState } from "react";

export default function CreatingGroupAvaliations() {
    const [nameGroupValue, setNameGroupValue] = useState("")
    const [showInputGroup, setShowInputGroup] = useState(false);
    const [arrayGroups, setArrayGroups] = useState([])

    const handleCreatingNewGroup = () => {
        const newGroup = {
            name: nameGroupValue,
            questions: [],
        }
        setArrayGroups(prevArrayGroups => [...prevArrayGroups, newGroup])
        setNameGroupValue("")
    }

    return (
        <>
            <Button _hover={{}} _active={{ bgColor: "#acacac" }} bgColor="#ffffff" onClick={() => setShowInputGroup(!showInputGroup)}>
                <Text marginRight="10px">
                    Criar novo grupo de avaliações
                </Text>
            </Button>
            {
                showInputGroup &&
                <InputGroup size="sm" marginTop="15px">
                    <Input
                        placeholder="Digite aqui o nome do agrupamento de avaliações"
                        marginBottom="10px"
                        variant="flushed"
                        _focus={{
                            boxShadow: "none",
                            borderColor: "#ffffff",
                        }}
                        color="white"
                        value={nameGroupValue}
                        onChange={(event) => setNameGroupValue(event.target.value)}
                    ></Input>
                    <InputRightAddon
                        width="50px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        bg="none"
                        border="none"
                        borderBottom="1px solid"
                        borderColor="white"
                        borderRadius="none"
                    >
                        <IconButton
                            bg="none"
                            _hover={{}}
                            _active={{}}
                            boxSize={1}
                            onClick={handleCreatingNewGroup}
                            isDisabled={nameGroupValue === ''}
                        >
                            <CheckIcon
                                style={{
                                    transition: "color 0.3s ease",
                                    color: "white",
                                }}
                                onMouseOver={(e) => e.currentTarget.style.color = "green"}
                                onMouseOut={(e) => e.currentTarget.style.color = "white"}
                            />
                        </IconButton>
                    </InputRightAddon>
                </InputGroup>
            }
            <Container width="100%" padding="10px" display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={4}>
                {arrayGroups.map((group, index) => (
                    <Container key={index} bgColor="red" borderRadius="10px">
                        <Container padding="0px" display="flex" alignItems="center" justifyContent="space-between">
                            <Heading  display="flex" alignItems="center">
                                <Checkbox paddingRight="10px"/>
                                {group.name}
                            </Heading>
                            <Button bg="transparent" _hover={{}} _active={{}}>
                                <EditIcon color="white"/>
                            </Button>
                        </Container>
                        <Text>Número de perguntas:</Text>
                        <Text>Última alteração realizada:</Text>
                    </Container>
                ))}
            </Container>
        </>
    )
}