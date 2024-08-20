import { Button, useColorMode } from "@chakra-ui/react";
import { IoMdMoon, IoMdSunny } from "react-icons/io";

export default function AlternanceTheme() {
    const { colorMode, toggleColorMode} = useColorMode();

    return (
        <Button onClick={toggleColorMode} pos="absolute" bottom="0px" left="0px" padding="0px" margin="10px">
            {colorMode === "dark" ? (
                <IoMdMoon size={22} />
            ) : (
                <IoMdSunny size={22} />
            )}
        </Button>
    )
}