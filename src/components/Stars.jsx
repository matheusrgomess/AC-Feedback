import { Text } from "@chakra-ui/react";
import { TiStar } from "react-icons/ti";

export const SeeMoreStars = ({ numStars, rating }) => {
  console.log(numStars);
  return (
    <div style={{ display: "flex" }}>
      {[...Array(parseInt(numStars))].map((_, i) => {
        const ratingValue = i + 1;

        return (
          <label key={ratingValue}>
            <input
              type="radio"
              style={{ opacity: "0" }}
              name="rating"
              value={ratingValue}
            />
            <TiStar
              className="star"
              color={ratingValue <= rating ? "#700e17" : "#42474f"}
              size={50}
            />
            <Text textAlign="center" position="relative" bottom="10px">
              <strong>{ratingValue}</strong>
            </Text>
          </label>
        );
      })}
    </div>
  );
};

export function StarsForQuestionsPage({
  hover,
  setHover,
  rating,
  setRating,
  numberOfStars
}) {
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
            <Text textAlign="center" position="relative" bottom="10px">
              <strong>{ratingValue}</strong>
            </Text>
          </label>
        );
      })}
    </div>
  );
}

export function StarsNumberOfStars(numberOfStars) {
  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        right: "3px",
        bottom: "5px",
        padding: "0px",
        alignItems: "center",
        height: "25px",
        maxWidth: "85%"
      }}
    >
      {[...Array(parseInt(numberOfStars.numberOfStars))].map(() => {
        return (
          <TiStar
            className="star"
            color="#971520"
            style={{ margin: "0", padding: "0" }}
            size={25}
          />
        );
      })}
    </div>
  );
}
