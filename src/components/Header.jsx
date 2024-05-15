import { Box, Container, Image } from "@chakra-ui/react";
import ButtonPages from "../pages/generalComponents/headerPages/ButtonPages";
import Calendar from "../pages/generalComponents/headerPages/Calendar";
import User from "../pages/generalComponents/headerPages/User";
import AcDigitalLogo from '../assets/acdigital.png'

function Header() {

  return <div>
    <Box as="header" bg="#1c222b" padding="20px" display="flex" justifyContent="space-between" maxH="10vh" alignItems="center" w="100%" style={{
      fontFamily: "Montserrat, sans-serif",
    }}>
      <Container padding="0px" margin="0px" h="64px">
        <Image src={AcDigitalLogo} w="100%" h="100%" objectFit="contain" />
      </Container>
      <Container display="flex" justifyContent="space-between" alignItems="center" padding="0px" margin="0px" >
        <ButtonPages title="HOME" navigate="/home" />
        <ButtonPages title="AVALIAR" navigate="/home/rate" />
        <ButtonPages title="FEEDBACKS" navigate="/home/feedbacks" />
      </Container>
      <Container padding="0px" margin="0px" display="flex" flexDirection='row' ustifyContent="center" alignItems="center" gap="15px">
        <div>
          <Calendar />
        </div>
        <div>
          <User />
        </div>
      </Container>
    </Box>
  </div>
}

export default Header