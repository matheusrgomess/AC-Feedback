import { Container, Text, Image, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Inputs from "./components/Inputs";

export default function Autentificacao() {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate("/home");
        console.log()
    }
    return (
        <div className="body" style={{ backgroundImage: "url(imgs/backgroundlogo.png)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Container bgColor="white" minW="320px" minH="338px" maxW="440px" padding="44px" display="flex" flexDirection="column" justifyContent="space-between">
                <Container display="flex" justifyContent="space-between" padding="0px" paddingBottom="40px" alignItems="center">
                    <Image src="imgs/bannerlogo.png" maxH="36px" />
                    <Text fontSize="1.2rem">Entrar em AC Feedbacks</Text>
                </Container>
                <Container padding="0px">
                    <Inputs title="Email" placeholder="nome.sobrenome@acdigital.com.br" />
                    <Inputs type="password" title="Senha" placeholder="Senha" />
                    <Button onClick={handleClick} marginBottom="20px" bgColor="transparent" _hover={{bgColor:"#2758c0FF", color:"#FFFFFF"}}>Entrar</Button>
                </Container>
                <Container padding="0px">
                    <Text>#euACredito</Text>
                </Container>
            </Container>
        </div>

    )
}