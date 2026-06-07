import React, { useState } from 'react'

const WS_COVERAGES = [
  {
    key: 'travel_medical',
    label: 'Travel medical insurance',
    valueLabel: '$1,000,000 (14 days, under 65)',
    value: 1000000,
    expl: 'Covers emergency medical expenses while travelling outside your province. Must be under age 65 and covered by a government health plan. First 14 consecutive days only. Note: Not available to residents of Quebec.',
    example: 'You are hospitalized for a sudden illness during a trip — up to $1M for hospital, physician, ambulance, and prescription costs are covered.'
  },
  {
    key: 'trip_cancellation',
    label: 'Trip cancellation',
    valueLabel: '$1,000 per person ($3,000 per trip)',
    value: 1000,
    expl: 'Reimburses prepaid non-refundable trip costs if you must cancel for a covered reason before departure. Full cost of trip must be charged to the card. Note: Not available to residents of Quebec.',
    example: 'You fall ill before departure and your physician recommends cancelling — prepaid flights and hotels up to $1,000 per person ($3,000 total) may be reimbursed.'
  },
  {
    key: 'trip_interruption',
    label: 'Trip interruption',
    valueLabel: '$1,000 per person ($3,000 per trip)',
    value: 1000,
    expl: 'Pays extra transportation costs and unused prepaid expenses if your trip is interrupted after departure due to a covered cause. Note: Not available to residents of Quebec.',
    example: 'A family emergency forces you to return home early — the cost of a last-minute flight and unused hotel nights may be covered up to $1,000.'
  },
  {
    key: 'flight_delay',
    label: 'Flight / trip delay',
    valueLabel: '$1,000 per person ($2,500 per occurrence)',
    value: 1000,
    expl: 'Reimburses reasonable expenses for hotel, meals, refreshments, emergency purchases and sundry items when your flight is delayed, you miss a connection, or are denied boarding. Coverage begins 3 hours after the delay/missed connection. Note: Not available to residents of Quebec.',
    example: 'Your flight is delayed 4 hours — you buy meals and toiletries and get reimbursed up to $1,000.'
  },
  {
    key: 'baggage',
    label: 'Delayed & lost baggage',
    valueLabel: '$500 delay / $750 loss ($1,000 total)',
    value: 1000,
    expl: 'Covers emergency purchases if checked baggage is delayed more than 6 hours (up to $500). Covers damage to or loss of checked baggage and contents (up to $750). Combined maximum $1,000. Note: Not available to residents of Quebec.',
    example: 'Your bags are delayed for a day — you buy basic clothes and toiletries and get reimbursed up to $500. If never returned, you get up to $750 for the lost contents.'
  }
]

const WS_PRIVILEGE_COVERAGES = [
  {
    key: 'travel_medical',
    label: 'Travel medical insurance',
    valueLabel: '$1,000,000 (14 days, under 65)',
    value: 1000000,
    expl: 'Covers emergency medical expenses while travelling outside your province. Must be under age 65 and covered by a government health plan. First 14 consecutive days only. Note: Not available to residents of Quebec.',
    example: 'You are hospitalized for a sudden illness during a trip — up to $1M for hospital, physician, ambulance, and prescription costs are covered.'
  },
  {
    key: 'trip_cancellation',
    label: 'Trip cancellation',
    valueLabel: '$1,000 per person ($3,000 per trip)',
    value: 1000,
    expl: 'Reimburses prepaid non-refundable trip costs if you must cancel for a covered reason before departure. Full cost of trip must be charged to the card. Note: Not available to residents of Quebec.',
    example: 'You fall ill before departure and your physician recommends cancelling — prepaid flights and hotels up to $1,000 per person ($3,000 total) may be reimbursed.'
  },
  {
    key: 'trip_interruption',
    label: 'Trip interruption',
    valueLabel: '$1,000 per person ($3,000 per trip)',
    value: 1000,
    expl: 'Pays extra transportation costs and unused prepaid expenses if your trip is interrupted after departure due to a covered cause. Note: Not available to residents of Quebec.',
    example: 'A family emergency forces you to return home early — the cost of a last-minute flight and unused hotel nights may be covered up to $1,000.'
  },
  {
    key: 'flight_delay',
    label: 'Flight / trip delay',
    valueLabel: '$1,000 per person ($2,500 per occurrence)',
    value: 1000,
    expl: 'Reimburses reasonable expenses for hotel, meals, refreshments, emergency purchases and sundry items when your flight is delayed, you miss a connection, or are denied boarding. Coverage begins 3 hours after the delay/missed connection. Note: Not available to residents of Quebec.',
    example: 'Your flight is delayed 4 hours — you buy meals and toiletries and get reimbursed up to $1,000.'
  },
  {
    key: 'baggage',
    label: 'Delayed & lost baggage',
    valueLabel: '$500 delay / $750 loss ($1,000 total)',
    value: 1000,
    expl: 'Covers emergency purchases if checked baggage is delayed more than 6 hours (up to $500). Covers damage to or loss of checked baggage and contents (up to $750). Combined maximum $1,000. Note: Not available to residents of Quebec.',
    example: 'Your bags are delayed for a day — you buy basic clothes and toiletries and get reimbursed up to $500. If never returned, you get up to $750 for the lost contents.'
  }
]

const ROGERS_COVERAGES = [
  {
    key: 'travel_medical',
    label: 'Travel medical insurance',
    valueLabel: 'Up to $1,000,000 (10 days ≤64 / 3 days 65-75)',
    value: 1000000,
    expl: 'Covers emergency medical care while travelling outside your province. Must be age 75 or under with a government health plan.',
    example: 'You are hospitalized for a sudden illness during a trip — ambulance, hospital, physician, and prescription costs up to $1M are covered.'
  },
  {
    key: 'trip_cancellation',
    label: 'Trip cancellation',
    valueLabel: '$1,000 per person ($5,000 per account)',
    value: 1000,
    expl: 'Reimburses prepaid non-refundable trip costs if you cancel for covered reasons before departure.',
    example: 'You fall ill before departure and your physician recommends cancelling — prepaid flights and hotels may be reimbursed up to $1,000.'
  },
  {
    key: 'trip_interruption',
    label: 'Trip interruption',
    valueLabel: '$1,000 per person ($5,000 per account)',
    value: 1000,
    expl: 'Pays extra transportation costs and unused prepaid expenses if your trip is interrupted after departure.',
    example: 'A family emergency forces you to return home early — the cost of a last-minute flight and unused hotel nights may be covered.'
  },
  {
    key: 'flight_delay',
    label: 'Flight / trip delay',
    valueLabel: '$150/day (up to 3 days)',
    value: 450,
    expl: 'Reimburses commercial accommodation and meals if your return is delayed due to a covered reason.',
    example: 'Your return flight is delayed and you must stay overnight — meal and hotel costs up to $150/day for 3 days are covered.'
  },
  {
    key: 'baggage',
    label: 'Delayed & lost baggage',
    valueLabel: 'N/A — see Purchase Protection',
    value: 0,
    expl: 'Baggage delay/loss is not covered under the standard travel certificate. Purchase Protection covers new items for 90 days from purchase.',
    example: ''
  }
]

const COBALT_COVERAGES = [
  {
    key: 'travel_medical',
    label: 'Travel medical insurance',
    valueLabel: '15 days — $5,000,000',
    value: 5000000,
    expl: 'Covers emergency medical care while travelling for short trips.',
    example: 'If you need emergency surgery while on vacation, this helps pay the hospital bills.'
  },
  {
    key: 'trip_cancellation',
    label: 'Trip cancellation',
    valueLabel: '$0',
    value: 0,
    expl: '',
    example: ''
  },
  {
    key: 'trip_interruption',
    label: 'Trip interruption',
    valueLabel: '$0',
    value: 0,
    expl: '',
    example: ''
  },
  {
    key: 'flight_delay',
    label: 'Flight / trip delay',
    valueLabel: '$500',
    value: 500,
    expl: 'Provides small reimbursements for expenses when scheduled travel is delayed.',
    example: 'Your flight is delayed several hours and you buy meals — this can reimburse those costs.'
  },
  {
    key: 'baggage',
    label: 'Delayed & lost baggage',
    valueLabel: '$500 (after 4 hours)',
    value: 500,
    expl: 'Covers essentials or lost baggage when airline delays or loses your luggage.',
    example: 'Baggage is delayed for a day — you buy basic clothes and toiletries and get reimbursed.'
  }
]

const SIMPLY_CASH_COVERAGES = [
  {
    key: 'travel_medical',
    label: 'Travel accident insurance',
    valueLabel: '$100,000',
    value: 100000,
    expl: 'Covers loss of life or dismemberment from an accident while riding as a passenger in, boarding, or alighting from a Common Carrier Conveyance (air, land, or water vehicle operated by a licensed common carrier) on a Covered Trip charged to your card. Benefit amounts: $100,000 for loss of life, both hands/feet, sight of both eyes, or one hand/foot + one eye; $50,000 for loss of one hand/foot or sight of one eye. Loss must occur within 100 days of the accident. Provided by Chubb Life Insurance Company of Canada.',
    example: 'You are in a covered common carrier accident and suffer a covered loss — up to $100,000 is payable depending on the nature of the loss.'
  },
  {
    key: 'trip_cancellation',
    label: 'Trip cancellation',
    valueLabel: '$0',
    value: 0,
    expl: '',
    example: ''
  },
  {
    key: 'trip_interruption',
    label: 'Trip interruption',
    valueLabel: '$0',
    value: 0,
    expl: '',
    example: ''
  },
  {
    key: 'flight_delay',
    label: 'Flight / trip delay',
    valueLabel: '$0',
    value: 0,
    expl: '',
    example: ''
  },
  {
    key: 'baggage',
    label: 'Delayed & lost baggage',
    valueLabel: 'N/A — see Purchase Protection',
    value: 0,
    expl: 'Baggage delay/loss is not covered under the travel certificate. Purchase Protection (Belair Insurance Company Inc.) covers new items against theft or accidental damage for 90 days from purchase (up to $1,000 per occurrence) when at least a portion of the purchase price is charged to the card.',
    example: ''
  }
]

const SCOTIA_GOLD_AMEX_COVERAGES = [
  {
    key: 'travel_medical',
    label: 'Travel medical insurance',
    valueLabel: '$0',
    value: 0,
    expl: '',
    example: ''
  },
  {
    key: 'trip_cancellation',
    label: 'Trip cancellation',
    valueLabel: '$0',
    value: 0,
    expl: '',
    example: ''
  },
  {
    key: 'trip_interruption',
    label: 'Trip interruption',
    valueLabel: '$0',
    value: 0,
    expl: '',
    example: ''
  },
  {
    key: 'flight_delay',
    label: 'Flight / trip delay',
    valueLabel: '$0',
    value: 0,
    expl: '',
    example: ''
  },
  {
    key: 'baggage',
    label: 'Delayed & lost baggage',
    valueLabel: '$0',
    value: 0,
    expl: '',
    example: ''
  }
]

export default function CardDetail({ card, onBack }) {
  const coverageMap = { 'ws-visa-infinite': WS_COVERAGES, 'ws-visa-infinite-privilege': WS_PRIVILEGE_COVERAGES, 'rogers': ROGERS_COVERAGES, 'cobalt': COBALT_COVERAGES, 'simply-cash': SIMPLY_CASH_COVERAGES, 'scotia-gold-amex': SCOTIA_GOLD_AMEX_COVERAGES }
  const coverages = coverageMap[card.id] || ROGERS_COVERAGES
  const max = Math.max(...coverages.map(c => c.value), 1)
  const [openKey, setOpenKey] = useState(null)

  function toggle(key) {
    setOpenKey(prev => (prev === key ? null : key))
  }

  return (
    <div className="detail-page">
      <button className="back" onClick={onBack}>← Back</button>
      <header className="detail-header">
        <img src={card.asset} alt={card.name} className="detail-art" />
        <h2>{card.name}</h2>
      </header>

      <section className="coverage-list">
        {coverages.map(item => {
          const isOpen = openKey === item.key
          return (
            <div className="coverage-row" key={item.key}>
              <div className="coverage-header" onClick={() => toggle(item.key)} style={{ cursor: 'pointer' }}>
                <div className="coverage-left">
                  <div className="check-wrap">
                    <div className="check">✓</div>
                  </div>
                  <div className="coverage-label">{item.label}</div>
                </div>

                <div className={`chev ${isOpen ? 'open' : ''}`}>▾</div>
              </div>

              {isOpen && (
                <div className="coverage-body">
                  <div>
                    {item.expl && <div className="expl">{item.expl}</div>}
                    {item.example && <div className="example">Example: {item.example}</div>}
                  </div>
                  {item.valueLabel && <div className="coverage-amount">{item.valueLabel}</div>}
                </div>
              )}
            </div>
          )
        })}
      </section>
    </div>
  )
}
