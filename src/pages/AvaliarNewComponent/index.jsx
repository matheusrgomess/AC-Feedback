import { Button } from "@chakra-ui/react";
import { useState } from "react";
import RatingModal from "./components/rating-modal";
import { useNavigate } from "react-router-dom";

export default function AvaliarNewComponent() {
  const [openRatingModal, setOpenRatingModal] = useState(false)
  const navigate = useNavigate()


  const handleClose = () => {
    setOpenRatingModal(false)
  }

  const handleOpen = () => {
    setOpenRatingModal(true)
  }

  const handleChangeRoute = (param) => {
    navigate(`/rate-participant/${param}`)
  }


  return <>
    <div style={{
      height: '100%',
      color: 'white',
      backgroundColor: '1c222b',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <RatingModal handleClose={handleClose} isOpen={openRatingModal} handleClick={handleChangeRoute} />
      <h1>
        <Button variant="outline" colorScheme="whiteAlpha" onClick={handleOpen}>Iniciar avaliação</Button>
      </h1>
    </div>
  </>
}