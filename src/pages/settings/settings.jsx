import {
    Text,
    Container,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import PartConfig from "./components/partConfig";
import EditParticipants from "./components/editParticipants";
import CreatingGroupAvaliations from "./components/creatingGroupAvaliations";

export default function Settings() {

    return (
        <div
            style={{
                height: "inherit",
                color: "white",
                backgroundColor: "#1c222b",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >

            <Container
                border="2px solid"
                borderColor="#971520"
                padding="10px"
                borderRadius="12px"
            >
                <Text fontSize="23px">
                    <SettingsIcon marginRight="5px" />
                    Configurações do formulários
                </Text>
                <Text fontSize="16px" color="#808080">Edite o que você quer que apareça no formulário</Text>
                <PartConfig title="Título:" />
                <PartConfig title="Descrição:" />
                <Container
                    margin="0px"
                    padding="0px"
                    w="70%"
                    h="45px"
                    borderBottom="2px solid"
                    borderColor="#808080"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    paddingRight="6px"
                    paddingBottom="5px"
                    marginBottom="15px"
                >
                    <EditParticipants />
                </Container>
                <CreatingGroupAvaliations />
            </Container>
        </div>
    );
}