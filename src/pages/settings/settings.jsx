import {
    Text,
    Container,
    Heading,
    useColorMode
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import PartConfig from "./components/partConfig";
import EditParticipants from "./components/users/editParticipants";
import CreatingGroupAvaliations from "./components/groupAvaliations/creatingGroupAvaliations";

export default function Settings() {
    const {colorMode} = useColorMode();
    return (
        <div
            style={{
                height: "inherit",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: "100px"
            }}
        >
            <Container
                border="2px solid"
                borderColor="#700e17"
                minWidth="760px"
                padding="10px"
                borderRadius="12px"
            >
                <Heading>
                    <SettingsIcon marginRight="5px" />
                    Configurações do formulários
                </Heading>
                <Text fontSize="16px" color="#808080" marginLeft="42px">Edite o que você quer que apareça no formulário</Text>
                <PartConfig title="Título:" />
                <PartConfig title="Descrição:" />
                <Container
                    margin="0px"
                    padding="0px"
                    w="70%"
                    h="45px"
                    borderBottom="2px solid"
                    borderColor={colorMode === "dark"? "#ffffff" : "#1c222b"}
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