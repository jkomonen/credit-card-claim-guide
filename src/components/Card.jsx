import React, { useState, useRef, useEffect } from 'react'

const OPTIONS = [
  { key: 'trip_delay', label: 'Trip delay' },
  { key: 'flight_cancel', label: 'Flight cancellation / trip interruption' },
  { key: 'baggage_delay', label: 'Baggage delay' },
  { key: 'lost_stolen', label: 'Lost or stolen baggage' }
]

export default function Card({ card, onSelect }) {
  const [open, setOpen] = useState(false)
  const popRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    function onDoc(e) {
      if (
        popRef.current && popRef.current.contains(e.target)
      ) {
        return
      }
      if (cardRef.current && cardRef.current.contains(e.target)) {
        return
      }
      setOpen(false)
    }
    document.addEventListener('pointerdown', onDoc)
    return () => document.removeEventListener('pointerdown', onDoc)
  }, [])

  return (
    <div className="card" ref={cardRef}>
      <img
        src={card.asset}
        alt={card.name}
        className="card-art"
        onClick={() => setOpen(o => !o)}
        style={{ cursor: 'pointer' }}
      />

      {open && (
        <div className="popover" ref={popRef}>
          <div className="popover-title">Choose a claim option</div>
          {OPTIONS.map(opt => (
            <button
              key={opt.key}
              className="opt"
              onClick={() => {
                onSelect(card.name, opt.label)
                setOpen(false)
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
