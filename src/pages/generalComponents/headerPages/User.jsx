import { Menu, MenuButton, Avatar, MenuList, Container, MenuItem, Switch, Button } from "@chakra-ui/react"
import { ChevronDownIcon } from "@chakra-ui/icons"
import { useNavigate } from "react-router-dom"

export default function User() {
    const navigate = useNavigate()
    
    return (
        <Menu>
            <MenuButton bg='#BA303B' as={Button} rightIcon={<ChevronDownIcon color="white" w={6} h={6} />} _hover={{}} _active={{}} padding="0px" minH="48px">
                <Avatar bg='#BA303B' />
            </MenuButton>
            <MenuList marginTop="6px">
                <Container paddingLeft="10px"><Switch /> Tema escuro </Container>
                <MenuItem onClick={() => {navigate("/")}}>Log out</MenuItem>
            </MenuList>
        </Menu>
    )
}