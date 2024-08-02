import { useNavigate } from "react-router-dom";
import { Container, Text, Image, Button, Spinner } from "@chakra-ui/react";
import Inputs from "./components/Inputs";
import BackgroundImage from "../../assets/backgroundlogo.png";
import Banner from "../../assets/bannerlogo.png";
import { useState } from "react";
import { authentifyUser } from "services/users";
import { toast } from "react-toastify";

export default function Authentification() {
  const navigate = useNavigate();
  const [valueEmail, setValueEmail] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);
  const user = {
    email: valueEmail,
    password: valuePassword
  }

  const loginUser = async (user) => {
    try {
      const response = await authentifyUser({ user: user });
      localStorage.setItem('user', JSON.stringify(response.data))
      const responseParse = JSON.parse(JSON.stringify(response.data))
      localStorage.setItem("isAdmin", responseParse.role === "ADMIN");
      navigate("/home");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoadingLogin(false);
    }
  }

  const handleClick = () => {
    loginUser(user);
    setLoadingLogin(true);
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
            <Container padding="0px" marginBottom="20px" display="flex" alignItems="center">
              <Button
              onClick={handleClick}
              bg="transparent"
              _hover={{ bg: "#971520", color: "#ffffff" }}
            >
              Entrar
            </Button>
            {loadingLogin && <Spinner marginLeft="20px" color="red" size="sm"/>}
            </Container>
          )}
        </Container>
        <Container padding="0px">
          <Text>#euACredito</Text>
        </Container>
      </Container>
    </div>
  );
}
