import { useState } from "react";
import {
    Menu,
    MenuButton,
    Avatar,
    MenuList,
    Container,
    MenuItem,
    Switch,
    Button,
    Text,
    UnorderedList,
    Divider
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate, useLocation, matchPath } from "react-router-dom";
import AlertExitPage from "./AlertExitPage";
import formatiingText from "../utils/formattingText";
import { MdLogout } from "react-icons/md";
import ListPagesUser from "./ListPagesUser";

export default function User() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const nav = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const location = useLocation();
    const verifyAdm = localStorage.getItem("isAdmin") === "true";

    const navLogout = () => {
        if (matchPath("/rate-participant/:participant", location.pathname)) {
            setIsModalOpen(true);
        } else {
            localStorage.removeItem("user")
            nav("/");
        }
    }

    const handleModalClose = () => {
        setIsModalOpen(false);
    }

    const handleModalConfirm = () => {
        setIsModalOpen(false);
        nav("/");
    }

    const routes = [
        {
            name: "Home",
            path: "/home"
        },
        {
            name: "Avaliar",
            path: "/home/rate"
        },
        {
            name: "Feedbacks",
            path: "/home/feedbacks"
        },
        {
            name: "Configurações",
            path: "/home/settings"
        },
    ]

    return (
        <>
            <Menu>
                <MenuButton bg='#ba303b' as={Button} rightIcon={<ChevronDownIcon color="#ffffff" w={6} h={6} />} _hover={{}} _active={{}} padding="0px" minH="48px">
                    <Avatar bg='#ba303b' />
                </MenuButton>
                <MenuList marginTop="6px" padding="0px" minHeight="120px">
                    <Container bgColor="#971520" borderTopRadius="6px" padding="5px">
                        <Text color="white">
                            <strong>
                                Olá,
                                {formatiingText(user.name)}!
                            </strong>
                        </Text>
                    </Container>
                    <Container border="2px solid" borderColor="#971520" borderBottomRadius="6px" paddingTop="10px" minH="84px" paddingLeft="0px">
                        <Container borderLeft="1px solid" paddingLeft="5px" marginLeft="7px">
                            <Text>
                                <strong style={{textTransform: "uppercase"}}>Páginas</strong>
                            </Text>
                            <UnorderedList styleType="'- '" position="relative" right="5px">
                                {routes.map((route, index) => (
                                    (route.name === "Configurações" && !verifyAdm) ? null : (
                                        <ListPagesUser title={route.name} navigate={route.path} key={index} isActualRoute={route.path === location.pathname} />
                                    )
                                ))}
                            </UnorderedList>
                        </Container>
                        <Container minWidth="100%" padding="0px" paddingLeft="15px">
                            <Divider my={4} borderColor="#000000" />
                        </Container>
                        <Container paddingLeft="10px"><Switch /> Tema escuro </Container>
                        <MenuItem onClick={navLogout}><MdLogout /><Text paddingLeft="5px">Sair</Text></MenuItem>
                    </Container>
                </MenuList>
            </Menu>
            {isModalOpen && (
                <AlertExitPage isOpen={isModalOpen} onClose={handleModalClose} onClickConfirm={handleModalConfirm} onClickClose={handleModalClose} />
            )}
        </>

    );
};