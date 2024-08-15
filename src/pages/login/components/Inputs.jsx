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
                    _placeholder={{ color: "gray.500" }}
                    _hover={{}}
                    _focus={{
                        boxShadow: "none",
                        borderColor: "red",
                        borderTopColor: "transparent",
                        borderLeftColor: "transparent",
                        borderRightColor: "transparent",
                    }}
                    value={value}
                    onChange={onChange}
                />
                {type === "password" && (
                    <InputRightElement>
                        <Button h="1.75rem" size="sm" onClick={handleClick} bg="transparent" _hover={{ bg: "transparent" }}>
                            {showPassword ? <ViewOffIcon color="black" /> : <ViewIcon color="black" />}
                        </Button>
                    </InputRightElement>
                )}
            </InputGroup>
        </>
    );
};