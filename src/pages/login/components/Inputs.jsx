import { useState } from "react";
import { Text, Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function Inputs({ title, placeholder, type, value, onChange }) {
    const [showPassword, setShowPassword] = useState(false);

    const handleClick = () => setShowPassword(!showPassword);

    return (
        <>
            <Text>
                <strong>
                    {title}:
                </strong>
            </Text>
            <InputGroup marginBottom="10px">
                <Input
                    placeholder={placeholder}
                    type={type === "password" && showPassword ? "text" : type}
                    borderBottom="1px solid"
                    borderBottomColor="#000000"
                    borderRadius="0px"
                    padding="0px"
                    paddingRight={type === "password" ? "2.5rem" : "0px"}
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
                    }}
                    value={value}
                    onChange={onChange}
                />
                {type === "password" && (
                    <InputRightElement>
                        <Button h="1.75rem" size="sm" onClick={handleClick} bg="transparent" _hover={{ bg: "transparent" }}>
                            {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        </Button>
                    </InputRightElement>
                )}
            </InputGroup>
        </>
    );
};