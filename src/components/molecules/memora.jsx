import React from 'react'
import Card from '../atoms/Card'

export default function CardMemo(props) {
  return (
    <div id="cards-memo">
      {
        props.cards.map( (card) => {
          return <Card card={card} key={i}/> 
        })
      }
    </div>
  )
}
