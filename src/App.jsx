import React, { useState } from 'react'
import Card from './components/Card'

const initialCards = [
  { id: 'rogers', name: 'Rogers World Elite Mastercard', asset: '/src/assets/images/rogers-world-elite-mastercard.jpeg' },
  { id: 'wealthsimple', name: 'Wealthsimple Visa Infinite', asset: '/src/assets/images/wealthsimple-visa-infinite.jpeg' }
]

export default function App() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState({ card: null, option: null })

  const filtered = initialCards.filter(c => c.name.toLowerCase().includes(query.toLowerCase()))

  function handleSelect(cardName, option) {
    setSelected({ card: cardName, option })
  }

  return (
    <div className="page">
      <header className="header">
        <h1>Credit Card Claim Guide</h1>
        <input
          className="search"
          placeholder="Search cards"
          value={query}
          onChange={e => setQuery(e.target.value)}
          aria-label="Search cards"
        />
      </header>

      <main className="cards">
        {filtered.map(card => (
          <Card key={card.id} card={card} onSelect={handleSelect} />
        ))}
      </main>

      <footer className="placeholder">
        {selected.card ? (
          <div>{selected.card} — {selected.option}</div>
        ) : (
          <div className="empty">Click a card and choose an option</div>
        )}
      </footer>
    </div>
  )
}
