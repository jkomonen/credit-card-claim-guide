import { useState, useEffect, useMemo } from 'react'
import Card from './components/Card'
import CardDetail from './components/CardDetail'
import cards from './data/cards.json'

function groupCards(cards) {
  const map = {}
  for (const card of cards) {
    const key = card.family || card.id
    if (!map[key]) {
      map[key] = { cards: [], best: null, bestRank: -1 }
    }
    map[key].cards.push(card)
    const rank = card.familyRank ?? 0
    if (rank > map[key].bestRank) {
      map[key].bestRank = rank
      map[key].best = card
    }
  }
  return Object.values(map)
}

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

  const groups = useMemo(() => groupCards(cards), [])

  const filtered = useMemo(
    () => groups.filter(g =>
      g.cards.some(c => c.name.toLowerCase().includes(query.toLowerCase()))
    ),
    [query, groups]
  )

  if (route.startsWith('#/card/')) {
    const id = route.replace('#/card/', '')
    const card = cards.find(c => c.id === id)
    if (card) {
      return <CardDetail card={card} allCards={cards} onBack={() => { window.location.hash = '' }} />
    }
    return (
      <div className="page">
        <p className="not-found">Card not found. <a href="/" onClick={e => { e.preventDefault(); window.location.hash = '' }}>Go back</a></p>
      </div>
    )
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
        {filtered.length > 0 ? (
          filtered.map(group => {
            const rep = group.best
            const siblingCount = group.cards.length - 1
            return (
              <Card key={group.cards[0].family || rep.id} card={rep} siblingCount={siblingCount} />
            )
          })
        ) : (
          <p className="empty-state">No cards found matching &ldquo;{query}&rdquo;</p>
        )}
      </main>
    </div>
  )
}
