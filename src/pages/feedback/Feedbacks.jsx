import { Box, Container, Menu, MenuButton, MenuItem, MenuList, Button, Switch, Avatar, Heading, Text } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import ButtonPages from "../home/components/header/ButtonPages";
import Calendar from "../home/components/header/Calendar";

export default function Feedbacks() {
    return (
        <div style={{ backgroundColor: "#26272D", minHeight: "100vh" }}>
            <Box as="header" bgColor="#1c222b" padding="20px" display="flex" justifyContent="space-between" maxHeight="10vh" alignItems="center" width="100%">
                <Container maxWidth="294px" maxHeight="65px" padding="0px" margin="0px">
                    
                </Container>
                <Container display="flex" justifyContent="space-between" alignItems="center" padding="0px" margin="0px" maxW="300px">
                    <ButtonPages title="AVALIAR" navigate="/home/rate" />
                    <ButtonPages title="HOME" navigate="/home" />
                </Container>
                <Container maxW="300px" padding="0px" margin="0px" display="flex">
                    <Calendar/>
                    <Menu>
                        <MenuButton bg='#BA303B' as={Button} rightIcon={<ChevronDownIcon color="white" w={6} h={6} />} _hover={{}} _active={{}} padding="0px" minH="48px">
                            <Avatar bg='#BA303B' />
                        </MenuButton>
                        <MenuList marginTop="6px">
                            <Container paddingLeft="10px">Tema escuro <Switch /></Container>
                            <MenuItem>Log out</MenuItem>
                        </MenuList>
                    </Menu>
                </Container>
            </Box>
            <Box as="main" minHeight="83vh" display="flex" justifyContent="center" alignItems="center">
                <Container bgColor="white">
                    <Heading color="black">
                        Essa página será a página de FEEDBACKS
                    </Heading>
                    <Text fontSize="22pt">
                        Página onde o usuário verá Feedbacks relacionados a ele, conterá todas as avaliações sobre ele listadas
                    </Text>
                    <br/>
                    <Text fontSize="16pt">
                        No feedback, o usuário poderá ampliar o formulário e ler todos os apontamentos indicados por outro usuário
                    </Text>
                </Container>
            </Box>
        </div>
    )
}