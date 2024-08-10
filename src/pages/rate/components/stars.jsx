import { Text } from "@chakra-ui/react";
import { TiStar } from "react-icons/ti";

export default function Stars({ hover, setHover, rating, setRating, numberOfStars }) {

  return (
    <div style={{ display: "flex" }}>
      {[...Array(numberOfStars)].map((_, i) => {
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
              color={ratingValue <= (hover || rating) ? "#700e17" : "#42474f"}
              size={50}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
            <Text
              textAlign="center"
              position="relative"
              bottom="10px"
            >
              <strong>{ratingValue}</strong>
            </Text>
          </label>
        );
      })}
    </div>
  )
}
