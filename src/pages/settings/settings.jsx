import {
    Text,
    Container,
    Heading,
    Divider,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import EditParticipants from "./components/users/editParticipants";
import CreatingGroupAvaliations from "./components/groupAvaliations/creatingGroupAvaliations";
import AnalyticsUsers from "./components/analytics/analyticsUsers";

export default function Settings() {
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
                <Text fontSize="16px" color="#808080" marginLeft="42px">Configure aqui o grupos de avaliações e todos os usuários</Text>
                <Container
                    margin="0px"
                    gap="10px"
                    padding="0px"
                    w="22%"
                    h="90px"
                    display="grid"
                    marginTop="20px"
                    marginBottom="30px"
                >
                    <EditParticipants />
                    <Divider borderColor="" opacity="100%"/>
                    <AnalyticsUsers />
                </Container>
                <CreatingGroupAvaliations />
            </Container>
        </div>
    );
}