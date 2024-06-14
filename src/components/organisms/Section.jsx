import { data } from '../../data/imgs';
import React, { useState, useEffect } from 'react';
import './Section.css';
import Card from '../atoms/Card';

export default function Section() {
    const [cards, setCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [hasWon, setHasWon] = useState(false);

    const ClickButton = () => {
        const auxili = data.map((card, e) => ({ ...card, id: e, isFlipped: false }));
        const double = [...auxili, ...auxili].map((card, a) => ({ ...card, uniqueId: a }));
        setCards(shuffleArray(double));
        setMatchedCards([]);
        setFlippedCards([]);
        setHasWon(false);
    };

    const ClickCard = (id) => {
        if (flippedCards.length < 2 && !flippedCards.includes(id) && !matchedCards.includes(id)) {
            setCards(prevCards => prevCards.map(card => {
                if (card.uniqueId === id) {
                    return { ...card, isFlipped: true };
                } else {
                    return card;
                }
            }));
            setFlippedCards([...flippedCards, id]);
        }
    };

    useEffect(() => {
        if (flippedCards.length === 2) {
            const [firstId, secondId] = flippedCards;

            let card = null;
            let secon = null;
            for (let i = 0; i < cards.length; i++) {
                if (cards[i].uniqueId === firstId) {
                    card = cards[i];
                } else if (cards[i].uniqueId === secondId) {
                    secon = cards[i];
                }
                if (card && secon) {
                    i = cards.length;
                }
            }
            if (card.id === secon.id) {
                setMatchedCards([...matchedCards, firstId, secondId]);
                setFlippedCards([]);
            } else {
                setTimeout(() => {
                    setCards(prevCards => prevCards.map(card => {
                        if (card.uniqueId === firstId || card.uniqueId === secondId) {
                            return { ...card, isFlipped: false };
                        } else {
                            return card;
                        }
                    }));
                    setFlippedCards([]);
                }, 1000);
            }
        }
    }, [flippedCards, cards, matchedCards]);

    useEffect(() => {
        if (matchedCards.length === cards.length && cards.length > 0) {
            setHasWon(true);
        }
    }, [matchedCards, cards]);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    return (
        <>
            <div id="header">
                <button onClick={ClickButton}>Start</button>
            </div>
            <div id="board">
                {cards.map((item) => (
                    <Card 
                        key={item.uniqueId} 
                        card={item} 
                        onClick={() => ClickCard(item.uniqueId)} 
                    />
                ))}
            </div>
            {hasWon && <div className="victory-message animated">Felicidades has ganado 🎉</div>}
        </>
    );
}
