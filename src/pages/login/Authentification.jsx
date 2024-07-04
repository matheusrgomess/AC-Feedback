import { useNavigate } from "react-router-dom";
import { Container, Text, Image, Button } from "@chakra-ui/react";
import Inputs from "./components/Inputs";
import BackgroundImage from "../../assets/backgroundlogo.png";
import Banner from "../../assets/bannerlogo.png";
import { useState } from "react";
import { authentifyUser } from "services/authentificationUsers";
import { toast } from "react-toastify";

export default function Autentificacao() {
  const navigate = useNavigate();
  const [valueEmail, setValueEmail] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const user = {
    email: valueEmail,
    password: valuePassword
  }

  const userValidation = async (user) => {
    try {
      const response = await authentifyUser({ user: user });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const handleClick = () => {
    navigate("/home");
    userValidation(user)
  };

  return (
    <div
      className="body"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container
        bg="#ffffff"
        minW="320px"
        minH="338px"
        maxW="440px"
        padding="44px"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Container
          display="flex"
          justifyContent="space-between"
          padding="0px"
          paddingBottom="40px"
          alignItems="center"
        >
          <Image src={Banner} maxH="36px" />
          <Text fontSize="1.2rem">Entrar em AC Feedbacks</Text>
        </Container>
        <Container padding="0px">
          <Inputs
            title="Email"
            placeholder="nome.sobrenome@acdigital.com.br"
            value={valueEmail}
            onChange={(event) => { setValueEmail(event.target.value) }}
          />
          <Inputs
            type="password"
            title="Senha"
            placeholder="Senha"
            value={valuePassword}
            onChange={(event) => { setValuePassword(event.target.value) }}
          />
          {valueEmail === "" || valuePassword === "" ? (
            <Button isDisabled marginBottom="20px" bg="transparent">
              Entrar
            </Button>
          ) : (
            <Button
              onClick={handleClick}
              marginBottom="20px"
              bg="transparent"
              _hover={{ bg: "#2758c0", color: "#ffffff" }}
            >
              Entrar
            </Button>
          )}
        </Container>
        <Container padding="0px">
          <Text>#euACredito</Text>
        </Container>
      </Container>
    </div>
  );
}
