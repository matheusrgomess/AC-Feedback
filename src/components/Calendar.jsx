import { Container, Image, Text } from "@chakra-ui/react";
import CalendarImage from '../assets/calendar.png'

export default function Calendar() {

    const getActualDate = () => {
        const date = new Date();
        const dia = date.getDate();
        const mes = date.toLocaleDateString('pt-BR', { month: 'long' }).replace('.', '');
        const ano = date.getFullYear();
        return `${dia} de ${mes} de ${ano}`
    }

    return (
        <Container bg="#26272d" border="3px solid" borderColor="white" borderRadius="10px" padding="0px" paddingRight="3px" alignItems="center" display="flex" flexDirection="row">
            <Image src={CalendarImage} alt='Icon Calendar' maxWidth='37px' height='40px' marginRight="3px"/>
            <strong><Text fontSize="18px" color="#ffffff" whiteSpace="nowrap">{getActualDate()}</Text></strong>
        </Container>
    );
};
