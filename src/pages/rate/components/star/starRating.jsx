import React from "react";
import { useState } from "react";
import { TiStar } from "react-icons/ti";
import { Text } from "@chakra-ui/react";
import '/Usuario/Matheus/Desktop/AC-Feedback/src/pages/rate/components/star/styleStar.css';

export default function StarRating() {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Text color="#000000" whiteSpace="nowrap" marginLeft="10px"><strong>A análise sobre a pergunta foi de: {rating ? rating : 0} ponto(s)</strong></Text>
            <div style={{ display: "flex" }}>
                {[...Array(10)].map((star, i) => {
                    const ratingValue = i + 1;

                    return (
                        <label>
                            <input
                                type="radio"
                                name="rating"
                                value={ratingValue}
                                onClick={() => setRating(ratingValue)}
                            />
                            <TiStar
                                className="star"
                                color={ratingValue <= (hover || rating) ? "#cda90e" : "#000000"}
                                size={50}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(null)}
                            />
                            <Text
                                textAlign="center"
                                position="relative"
                                bottom="10px"
                                color={ratingValue <= (hover || rating) ? "#cda90e" : "#000000"}
                            >
                                <strong>{ratingValue}</strong>
                            </Text>
                        </label>
                    );
                })}
            </div>
        </div>
    );
};