import { Box, Container, Image } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import ButtonPages from "./ButtonPages";
import Calendar from "./Calendar";
import User from "./User";
import AcDigitalLogo from '../assets/acdigital.png'

function Header(...props) {
  const location = useLocation()

  const routes = [
    {
      name: "HOME",
      path: "/home"
    },
    {
      name: "AVALIAR",
      path: "/home/rate"
    },
    {
      name: "FEEDBACKS",
      path: "/home/feedbacks"
    },
  ]

  return <div>{!(location.pathname === '/') &&
    <Box as="header" bg="#1c222b" padding="20px" display="flex" justifyContent="space-between" maxH="10vh" alignItems="center" w="100%" style={{
      fontFamily: "Montserrat, sans-serif",
    }}>
      <Container padding="0px" margin="0px" maxH="65px" maxW="294px" bgColor="green">
        <Image src={AcDigitalLogo} w="100%" h="100%" objectFit="contain" />
      </Container>
      <Container display="flex" justifyContent="space-between" alignItems="center" padding="0px" margin="0px" maxW="400px" >
        {routes.map((route, index) => (
          <ButtonPages title={route.name} navigate={route.path} key={index} isActualRoute={route.path === location.pathname} />
        ))}
      </Container>
      <Container padding="0px" margin="0px" display="flex" flexDirection='row' justifyContent="center" alignItems="center" gap="15px" maxW="360px">
        <div>
          <Calendar />
        </div>
        <div>
          <User />
        </div>
      </Container>
    </Box>
  }

  </div>
}

export default Header