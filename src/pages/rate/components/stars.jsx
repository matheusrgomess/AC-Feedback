import { Text } from "@chakra-ui/react";
import { TiStar } from "react-icons/ti";

export default function Stars({ hover, setHover, rating, setRating }) {
  const numberStars = JSON.parse(localStorage.getItem("numberStars"));

  return (
    <div style={{ display: "flex" }}>
      {[...Array(numberStars)].map((_, i) => {
        const ratingValue = i + 1;
        return (
          <label key={ratingValue}>
            <input
              type="radio"
              style={{ opacity:"0" }}
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <TiStar
              className="star"
              color={ratingValue <= (hover || rating) ? "#971520" : "#ffffff2b"}
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
  );
}
