import { Container, Text, Switch } from "@chakra-ui/react";

export default function PartConfig(props) {
    return (
        <Container
            margin="0px"
            padding="0px"
            w="70%"
            h="40px"
            borderBottom="2px solid"
            borderColor="white"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            paddingRight="6px"
            marginBottom="15px"
        >
            <Text>
                <strong>{props.title}</strong>
            </Text>
            <Switch isDisabled defaultChecked />
        </Container>
    )
}