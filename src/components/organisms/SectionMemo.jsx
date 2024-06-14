import React from 'react'
import CardMemo from '../molecules/memora'
import { useState, useEffect } from 'react';
import data from '../../data/imgs';


export default function SectionMemo() {

  const [cardsShuffled, setCardsShuffled] = useState([])

  useEffect( () => {
    const shuffledCards = shuffleCard([...data.img, ...data.img])
    setCardsShuffled(shuffleArray.map( (img, i) => ({
      index: i, img, flipped: false
    })))

  }, []);

  const shuffleArray = e => {
    for (let i = e.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [e[i], e[j]] = [e[j], e[i]];
    }
    return a;
  }

  return (
    <CardMemo cards = { cardsShuffled }/>
  )
}
