import { Container, Text, Switch, useColorMode } from "@chakra-ui/react";

export default function PartConfig(props) {
    const {colorMode} = useColorMode();
    return (
        <Container
            margin="0px"
            padding="0px"
            w="70%"
            h="40px"
            borderBottom="2px solid"
            borderColor={colorMode === "dark"? "#ffffff" : "#000000" }
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            paddingRight="6px"
            marginBottom="15px"
        >
            <Text>
                <strong>{props.title}</strong>
            </Text>
            <Switch isDisabled defaultChecked colorScheme="red"/>
        </Container>
    )
}