import { Input } from "@chakra-ui/react";
import { toast } from "react-toastify";

export default function InputJustification({ rating, justification, setJustification }) {

    const clickInDisabled = () => {
        toast.error('Primeiro, avalie selecionando uma das notas para poder justificar sobre', {
            autoClose: 2500
        })
    }

    return (
        <>
            {
                rating === null || rating === 0 ?
                    <Input
                        width="80%"
                        style={{
                            pointerEvents: 'auto',
                            cursor: 'not-allowed',
                            opacity: "0.4"
                        }}
                        _hover={{}}
                        readOnly
                        value=''
                        _focus={{ borderColor: 'red' }}
                        onClick={clickInDisabled}
                    />
                    :
                    <Input width="80%" placeholder="Justifique sua avaliação se desejar" onChange={(event) => {setJustification(event.target.value)}} value={justification}/>
            }
        </>

    )
}