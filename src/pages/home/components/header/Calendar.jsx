import { Container, Image, Text } from "@chakra-ui/react";

export default function Calendar() {
    /* Funcionamento da data (Date) */
    const data = new Date();

    const dia = data.getDate();
    const mes = data.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');
    const ano = data.getFullYear();
    
    return (
        <Container bg="#26272D" border="3px solid" borderColor="white" maxWidth="200px" borderRadius="10px" padding="0px" alignItems="center" display="flex">
            <Image src='imgs/calendar.png' alt='Icon Calendar' width='37px' height='40px'></Image>
            <Text fontFamily="Inter, sans-serif" fontSize="18px" color="white">{`${dia} de ${mes} de ${ano}`}</Text>
        </Container>
    )
}