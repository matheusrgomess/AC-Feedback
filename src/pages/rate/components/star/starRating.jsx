import React, { useState } from "react";
import { Text } from "@chakra-ui/react";
import { TiStar } from "react-icons/ti";
import './styleStar.css';

export default function StarRating() {
    const [rating, setRating] = useState(null);

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
                            <div >
                                <TiStar
                                    className="star"
                                    size={50}
                                    as="button"
                                    _hover={{ color: "#cba993" }}
                                />
                                <Text
                                    textAlign="center"
                                    position="relative"
                                    bottom="10px"
                                >
                                    <strong>{ratingValue}</strong>
                                </Text>
                            </div>
                        </label>
                    );
                })}
            </div>
        </div>
    );
};