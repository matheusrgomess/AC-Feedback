import React, { useState } from 'react';
import { Button, ListItem } from "@chakra-ui/react";
import { useNavigate, useLocation, matchPath } from "react-router-dom";
import AlertExitPage from './AlertExitPage';

export default function ListPagesUser({ title, navigate }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const nav = useNavigate();
    const location = useLocation();

    const navNewPage = () => {
        if (matchPath("/rate-participant/:participant", location.pathname)) {
            setIsModalOpen(true);
        } else {
            nav(navigate);
        }
    }

    const handleModalClose = () => {
        setIsModalOpen(false);
    }

    const handleModalConfirm = () => {
        setIsModalOpen(false);
        nav(navigate);
    }

    const isCurrentRoute = location.pathname === navigate;

    return (
        <>
            <ListItem>
                <Button
                    isDisabled={isCurrentRoute} padding="0px" bg="transparent" _hover={{}} _active={{ bg: "rgba(0, 0, 0, 0.173)" }} onClick={navNewPage}>
                    {title}
                </Button>
            </ListItem>
            {isModalOpen && (
                <AlertExitPage isOpen={isModalOpen} onClose={handleModalClose} onClickConfirm={handleModalConfirm} onClickClose={handleModalClose} />
            )}
        </>
    )
}