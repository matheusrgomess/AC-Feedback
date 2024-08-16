import { useState } from "react";
import {
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Container
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function Inputs({ title, placeholder, type, value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => setShowPassword(!showPassword);

  return (
    <>
      <Container padding="0px">
        <Text color="black">
          <strong>{title}:</strong>
        </Text>
        <InputGroup marginBottom="10px">
          <Input
            color="black"
            paddingY="20px"
            border="1px solid #971520"
            borderRadius="5px"
            placeholder={placeholder}
            type={type === "password" && showPassword ? "text" : type}
            paddingRight={type === "password" ? "2.5rem" : "0px"}
            variant="filled"
            value={value}
            onChange={onChange}
          />
          {type === "password" && (
            <InputRightElement>
              <Button
                h="1.75rem"
                size="sm"
                onClick={handleClick}
                bg="transparent"
                _hover={{ bg: "transparent" }}
              >
                {showPassword ? (
                  <ViewOffIcon color="black" />
                ) : (
                  <ViewIcon color="black" />
                )}
              </Button>
            </InputRightElement>
          )}
        </InputGroup>
      </Container>
    </>
  );
}
