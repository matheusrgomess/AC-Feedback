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
    Text
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate, useLocation, matchPath } from "react-router-dom";
import AlertExitPage from "./AlertExitPage";

export default function User() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const nav = useNavigate();
    const user = localStorage.getItem("user");
    const location = useLocation();

    const userName = (name) => {
        const formattedName = name
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");

        return (
            <Text color="#ffffff" fontSize="15px" as="span">
                {formattedName}
            </Text>
        );
    };

    const navLogout = () => {
        if (matchPath("/rate-participant/:participant", location.pathname)) {
            setIsModalOpen(true);
        } else {
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
                                {userName(user)}
                            </strong>
                        </Text>
                    </Container>
                    <Container border="2px solid" borderColor="#971520" borderBottomRadius="6px" paddingTop="10px" minH="84px" paddingLeft="0px">
                        <Container paddingLeft="10px"><Switch /> Tema escuro </Container>
                        <MenuItem onClick={navLogout}>Log out</MenuItem>
                    </Container>
                </MenuList>
            </Menu>
            {isModalOpen && (
                <AlertExitPage isOpen={isModalOpen} onClose={handleModalClose} onClickConfirm={handleModalConfirm} onClickClose={handleModalClose}/>
            )}
        </>

    );
};