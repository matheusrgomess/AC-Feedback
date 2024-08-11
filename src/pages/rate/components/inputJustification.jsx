import { Input, useColorMode } from "@chakra-ui/react";

export default function InputJustification({
  rating,
  justification,
  setJustification,
}) {
  const { colorMode } = useColorMode();
  return (
    <>
      <Input
        width="100%"
        placeholder="Justifique sua avaliação se desejar"
        onChange={(event) => {
          setJustification(event.target.value);
        }}
        value={justification}
        isDisabled={rating === null || rating === 0}
        borderColor={rating === null || rating === 0 ? "#971520" : ""}
        focusBorderColor={colorMode === "dark" ? "white" : "black"}
        _hover={{}}
      />
    </>
  );
}
