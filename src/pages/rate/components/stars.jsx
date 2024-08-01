import { Text, Spinner, Container } from "@chakra-ui/react";
import { TiStar } from "react-icons/ti";
import { useState, useEffect } from "react";
import { getActivatedGroup } from "services/questionsSet";

export default function Stars({ hover, setHover, rating, setRating }) {
  const [activatedGroup, setActivatedGroup] = useState();
  const [loadingStars, setLoadingStars] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setActivatedGroup(await getActivatedGroup())
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingStars(false);
      }
    }
    fetchData();
  }, []);

  return (
    loadingStars ?
      <Container display="flex" alignItems="center" justifyContent="center" minH="98px">
        <Spinner />
      </Container>
      :
      (
        <div style={{ display: "flex" }}>
          {[...Array(activatedGroup?.numberOfStars)].map((_, i) => {
            const ratingValue = i + 1;
            return (
              <label key={ratingValue}>
                <input
                  type="radio"
                  style={{ opacity: "0" }}
                  name="rating"
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                />
                <TiStar
                  className="star"
                  color={ratingValue <= (hover || rating) ? "#700e17" : "#ffffff2b"}
                  size={50}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                />
                <Text
                  textAlign="center"
                  position="relative"
                  bottom="10px"
                  color="white"
                >
                  <strong>{ratingValue}</strong>
                </Text>
              </label>
            );
          })}
        </div>
      )
  )
}
