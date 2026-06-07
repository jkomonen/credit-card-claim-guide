import React from 'react'

export default function Card({ card }) {
  function handleClick() {
    window.location.hash = `/card/${card.id}`
  }

  return (
    <div className="card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <img src={card.asset} alt={card.name} className="card-art" />
    </div>
  )
}
