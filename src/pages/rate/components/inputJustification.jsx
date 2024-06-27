import { Input } from "@chakra-ui/react";

export default function InputJustification({
  rating,
  justification,
  setJustification,
}) {
 
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
      />
    </>
  );
}
