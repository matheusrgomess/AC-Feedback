import { Text, Input } from "@chakra-ui/react"

export default function Inputs(props) {
    return (
        <>
            <Text>
                <strong>
                    {props.title}:
                </strong>
            </Text>
            <Input placeholder={props.placeholder}
                type={props.type}
                borderBottom="1px solid"
                borderBottomColor="#000000"
                borderRadius="0px"
                padding="0px"
                marginBottom="10px"
                borderTopColor="transparent"
                borderLeftColor="transparent"
                borderRightColor="transparent"
                _hover={{}}
                _focus={{
                    borderColor: "#0d45ac",
                    borderTopColor: "transparent",
                    borderLeftColor: "transparent",
                    borderRightColor: "transparent",
                    boxShadow: "none"
                }}>

            </Input >
        </>

    )
}