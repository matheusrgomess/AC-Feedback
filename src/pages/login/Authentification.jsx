import { useNavigate } from "react-router-dom";
import { Container, Text, Image, Button, Spinner } from "@chakra-ui/react";
import Inputs from "./components/Inputs";
import BackgroundImage from "../../assets/backgroundlogo.png";
import Banner from "../../assets/bannerlogo.png";
import { useState } from "react";
import { authentifyUser } from "services/users";
import { toast } from "react-toastify";

export default function Authentication() {
  const nav = useNavigate();
  const [valueEmail, setValueEmail] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);
  const user = {
    email: valueEmail,
    password: valuePassword
  };

  const handleClick = () => {
    loginUser(user);
    setLoadingLogin(true);
  };

  const handleNavRegister = () => {
    nav("/register");
  };

  const loginUser = async (user) => {
    try {
      const response = await authentifyUser({ user: user });
      localStorage.setItem("user", JSON.stringify(response.data));
      nav("/home");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingLogin(false);
    }
  };

  return (
    <div
      className="body"
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Container
        display="grid"
        gridTemplateColumns="repeat(2, 1fr)"
        gridTemplateRows="1fr"
        gridColumnGap="0px"
        gridRowGap="0px"
        maxW="100%"
        h="100%"
      >
        <Container
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          textAlign="center"
        >
          <Image src={Banner} maxH="150px" />
          <Text fontSize="30px" color="white" fontWeight="bold">
            Acesse sua conta para começar a avaliar os membros da sua equipe
          </Text>
        </Container>
        <Container display="flex" justifyContent="center" alignItems="center">
          <Container
            bg="#ffffff"
            maxH="500px"
            maxW="500px"
            padding="50px"
            borderRadius="10px"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Container
              padding="0px"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Inputs
                title="Email"
                placeholder="nome.sobrenome@acdigital.com.br"
                value={valueEmail}
                onChange={(event) => {
                  setValueEmail(event.target.value);
                }}
              />
              <Inputs
                type="password"
                title="Senha"
                placeholder="Senha"
                value={valuePassword}
                onChange={(event) => {
                  setValuePassword(event.target.value);
                }}
              />

              <Container
                padding="0px"
                marginBottom="20px"
                display="flex"
                flexDirection="column"
                w="100%"
                alignItems="center"
                gap="10px"
              >
                <Button
                  isDisabled={!valueEmail || !valuePassword}
                  width="100%"
                  onClick={handleClick}
                  bg="#971520"
                  color="white"
                  _hover={{ bg: "#750d16", color: "#ffffff" }}
                  isLoading={loadingLogin}
                >
                  {loadingLogin ? (
                    <Spinner marginLeft="20px" color="white" size="sm" />
                  ) : (
                    "Entrar"
                  )}
                </Button>
                <Container
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text color="black">Você não possui uma conta?</Text>
                  <Button
                    color="#971520"
                    padding="3px"
                    _hover={{
                      color: "#750d16"
                    }}
                    onClick={handleNavRegister}
                  >
                    Registre-se
                  </Button>
                </Container>
              </Container>
            </Container>
          </Container>
        </Container>
      </Container>
    </div>
  );
}
