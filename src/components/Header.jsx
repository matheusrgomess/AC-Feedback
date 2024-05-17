import { Box, Container, Image, Heading } from "@chakra-ui/react";
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
      route: "/home"
    },
    {
      name: "RATE",
      route: "/home/rate"
    },
    {
      name: "FEEDBACKS",
      route: "/home/feedbacks"
    },
  ]

  const filteredRoutes = routes && routes.filter((route) => route?.route !== location.pathname)

  return <div>
    <Box as="header" bg="#1c222b" padding="20px" display="flex" justifyContent="space-between" maxH="10vh" alignItems="center" w="100%" style={{
      fontFamily: "Montserrat, sans-serif",
    }}>
      <Container padding="0px" margin="0px" maxH="65px" maxW="294px" bgColor="green">
        <Image src={AcDigitalLogo} w="100%" h="100%" objectFit="contain" />
      </Container>
      {filteredRoutes.map((route, index) => (
        <Container display="flex" justifyContent="space-between" alignItems="center" padding="0px" margin="0px" maxW="300px" >
          <ButtonPages title={route.name} navigate={route.route} key={index} />
        </Container>
      ))}
      <Container padding="0px" margin="0px" display="flex" flexDirection='row' justifyContent="center" alignItems="center" gap="15px" maxW="360px">
        <div>
          <Calendar />
        </div>
        <div>
          <User />
        </div>
      </Container>
    </Box>
    <Container bg="#e6ded5" position="absolute" left="0px" padding="5px" width="fit-content">
      <Heading fontSize="35px" color="black">
        {props.namePage}
      </Heading>
    </Container>
  </div>
}

export default Header