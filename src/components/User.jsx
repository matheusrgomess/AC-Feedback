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
    Divider,
    Box,
    useColorMode
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate, useLocation, matchPath } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import AlertExitPage from "./AlertExitPage";
import ListPagesUser from "./ListPagesUser";
import { formattingName, formattingFirstName } from "../utils/formattingTexts";
import { IoMdMoon, IoMdSunny } from "react-icons/io";

export default function User() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isIconRotated, setIsIconRotated] = useState(false);
    const { colorMode, toggleColorMode } = useColorMode()
    const nav = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const location = useLocation();
    const verifyAdm = localStorage.getItem("isAdmin") === "true";

    const navLogout = () => {
        if (matchPath("/rate-participant/:participant", location.pathname)) {
            setIsModalOpen(true);
        } else {
            localStorage.removeItem("user");
            nav("/");
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleModalConfirm = () => {
        setIsModalOpen(false);
        nav("/");
    };

    const handleMenuToggle = () => {
        setIsIconRotated(!isIconRotated);
    };

    const routes = [
        { name: "Home", path: "/home" },
        { name: "Avaliar", path: "/home/rate" },
        { name: "Feedbacks", path: "/home/feedbacks" },
        { name: "Configurações", path: "/home/settings" }
    ];

    return (
        <>
            <Menu onOpen={handleMenuToggle} onClose={handleMenuToggle}>
                <MenuButton
                    bg='#700e17'
                    as={Button}
                    rightIcon={
                        <ChevronDownIcon
                            style={{
                                transition: "transform 0.2s ease-in-out",
                                transform: isIconRotated ? "rotate(180deg)" : "rotate(0deg)",
                            }}
                            color="#ffffff"
                            w={6}
                            h={6}
                        />
                    }
                    _hover={{}}
                    _active={{}}
                    padding="0px"
                    minH="48px"
                >
                    <Box display="flex" alignItems="center">
                        <Avatar bg="#700e17" />
                        <Text marginLeft="5px" color="white" fontSize={20}>
                            {formattingFirstName(user.name)}
                        </Text>
                    </Box>
                </MenuButton>
                <MenuList marginTop="6px" padding="0px" minHeight="120px" border="none">
                    <Container bgColor="#700e17" borderTopRadius="6px" padding="5px">
                        <Text color="white">
                            <strong>
                                Olá, {formattingName(user.name)}!
                            </strong>
                        </Text>
                    </Container>
                    <Container border="2px solid" borderColor="#700e17" borderBottomRadius="6px" paddingTop="10px" minH="84px" paddingLeft="0px">
                        <Container borderLeft="1px solid" paddingLeft="5px" marginLeft="7px">
                            <Text>
                                <strong style={{ textTransform: "uppercase" }}>Páginas</strong>
                            </Text>
                            <UnorderedList styleType="'- '" position="relative" right="5px">
                                {routes.map((route, index) => (
                                    (route.name === "Configurações" && !verifyAdm) ? null : (
                                        <ListPagesUser
                                            title={route.name}
                                            navigate={route.path}
                                            key={index}
                                            isActualRoute={route.path === location.pathname}
                                        />
                                    )
                                ))}
                            </UnorderedList>
                        </Container>
                        <Container minWidth="100%" padding="0px" paddingLeft="15px">
                            <Divider my={4} borderColor="" opacity="100%" />
                        </Container>
                        <Container paddingLeft="15px" marginBottom="10px" display="flex" alignItems="center" justifyContent="space-between">
                            <Switch
                                colorScheme="red"
                                isChecked={colorMode === "dark"}
                                onChange={toggleColorMode}
                            />
                            Tema {colorMode === "dark" ? "escuro" : "claro"}
                            {colorMode === "dark" ? <IoMdMoon size={22} /> : <IoMdSunny size={22} />}
                        </Container>
                        <MenuItem paddingLeft="15px" onClick={navLogout} bgColor="transparent"><MdLogout /><Text paddingLeft="5px">Sair</Text></MenuItem>
                    </Container>
                </MenuList>
            </Menu>

            {isModalOpen && (
                <AlertExitPage isOpen={isModalOpen} onClose={handleModalClose} onClickConfirm={handleModalConfirm} onClickClose={handleModalClose} />
            )}
        </>
    );
}
