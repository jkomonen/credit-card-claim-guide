import React, { useState, useEffect } from 'react'
import Card from './components/Card'
import CardDetail from './components/CardDetail'

const initialCards = [
  { id: 'rogers', name: 'Rogers World Elite Mastercard', asset: '/src/assets/images/rogers-world-elite-mastercard.jpeg' },
  { id: 'ws-visa-infinite', name: 'Wealthsimple Visa Infinite', asset: '/src/assets/images/wealthsimple-visa-infinite.jpeg' },
  { id: 'ws-visa-infinite-privilege', name: 'Wealthsimple Visa Infinite Privilege', asset: '/src/assets/images/wealthsimple-visa-infinite-privilege.webp' },
  { id: 'scotia-gold-amex', name: 'Scotiabank Gold American Express', asset: '/src/assets/images/amex-scotiabank-gold.avif' },
  { id: 'simply-cash', name: 'American Express SimplyCash', asset: '/src/assets/images/amex-simply-cash.webp' },
  { id: 'cobalt', name: 'American Express Cobalt', asset: '/src/assets/images/amex-cobalt.jpeg' }
]

export default function App() {
  const [query, setQuery] = useState('')
  const [route, setRoute] = useState(window.location.hash || '')

  useEffect(() => {
    function onHash() {
      setRoute(window.location.hash || '')
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const filtered = initialCards.filter(c => c.name.toLowerCase().includes(query.toLowerCase()))

  if (route.startsWith('#/card/')) {
    const id = route.replace('#/card/', '')
    const card = initialCards.find(c => c.id === id)
    if (card) {
      return <CardDetail card={card} onBack={() => { window.location.hash = '' }} />
    }
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
          <Card key={card.id} card={card} />
        ))}
      </main>
    </div>
  )
}
