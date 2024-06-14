import React, { useState } from 'react';
import './Card.css';

export default function Card({ card, onClick, pairsCount, setPairsCount }) {
    const [moves, setMoves] = useState(0);

    let cartas = "card";
    if (card.isFlipped) {
        cartas += "-flipped";
    }

    let cardImage;
    if (card.isFlipped) {
        cardImage = <img src={card.img} alt={card.alt} />;
    } else {
        cardImage = <img src={card.front} alt={card.alt} />;
    }

    const handleCardClick = () => {
        setMoves(moves + 1);
        if (!card.isFlipped) {
            onClick();
            if (moves % 2 !== 0) {
                setPairsCount(pairsCount + 1);
            }
        }
    };

    return (
        <div id={cartas} onClick={handleCardClick}>
            <div className="moves">moves: {moves}</div>
            {cardImage}
        </div>
    );
}
