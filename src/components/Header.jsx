import { Box, Container, Image, useColorMode } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import ButtonPages from "./ButtonPages";
import User from "./User";
import AcDigitalLogoWhite from "../assets/acdigitalwhite.png";
import AcDigitalLogoBlack from "../assets/acdigitalblack.png";

function Header() {
  const location = useLocation();
  const verifyAdm = localStorage.getItem("isAdmin") === "true";
  const { colorMode } = useColorMode();

  const getMaxWidth = () => {
    return verifyAdm ? "600px" : "400px";
  };

  const routes = [
    {
      name: "Home",
      path: "/home"
    },
    {
      name: "Avaliar",
      path: "/home/rate"
    },
    {
      name: "Feedbacks",
      path: "/home/feedbacks"
    },
    {
      name: "Configurações",
      path: "/home/settings"
    },
  ]

  return <div>{!(location.pathname === '/') &&
    <Box as="header" padding="20px" display="flex" justifyContent="space-between" maxH="10vh" borderBottom="1px" borderBottomColor="" alignItems="center" w="100%" style={{
      fontFamily: "Montserrat, sans-serif",
    }}>
      <Container padding="0px" margin="0px" maxH="65px" maxW="294px" >
        <Image src={colorMode === "dark" ? AcDigitalLogoWhite : AcDigitalLogoBlack} w="100%" h="100%" objectFit="contain" />
      </Container>
      <Container display="flex" justifyContent="space-between" alignItems="center" padding="0px" margin="0px" maxW={getMaxWidth()} >
        {routes.map((route, index) => (
          (route.name === "Configurações" && !verifyAdm) ? null : (
            <ButtonPages title={route.name} navigate={route.path} key={index} isActualRoute={route.path === location.pathname} />
          )
        ))}
      </Container>
      <Container padding="0px" paddingRight="18px" margin="0px" display="flex" justifyContent="end" alignItems="center" maxW="294px">
        <User />
      </Container>
    </Box>
  }
  </div>
}

export default Header