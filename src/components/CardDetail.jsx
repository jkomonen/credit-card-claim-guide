import { useState } from 'react'
import PropTypes from 'prop-types'

export default function CardDetail({ card, allCards, onBack }) {
  const [selectedId, setSelectedId] = useState(card.id)
  const current = allCards.find(c => c.id === selectedId) || card
  const coverages = current.coverages || []
  const [openKey, setOpenKey] = useState(null)

  const siblings = card.family
    ? allCards
        .filter(c => c.family === card.family)
        .sort((a, b) => (b.familyRank ?? 0) - (a.familyRank ?? 0))
    : []

  function toggle(key) {
    setOpenKey(prev => (prev === key ? null : key))
  }

  function handleVariantClick(id) {
    setSelectedId(id)
    setOpenKey(null)
  }

  function handleVariantKeyDown(id) {
    return function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleVariantClick(id)
      }
    }
  }

  function handleKeyDown(key) {
    return function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        toggle(key)
      }
    }
  }

  return (
    <div className="detail-page" tabIndex={-1}>
      <button className="back" onClick={onBack}>← Back</button>

      <header className="detail-header">
        {current.asset ? (
          <img src={current.asset} alt={current.name} className="detail-art" loading="lazy" />
        ) : (
          <div className="detail-art-placeholder">
            <span className="detail-art-initials">{current.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}</span>
          </div>
        )}
        <div className="detail-header-info">
          <h2>{current.name}</h2>
          <div className="detail-meta">
            {current.annualFee !== undefined && (
              <span className="fee-badge">{current.annualFee === 0 ? 'No annual fee' : `$${current.annualFee}/yr`}</span>
            )}
            {current.network && <span className="network-badge">{current.network}</span>}
            {current.issuer && <span className="issuer-label">{current.issuer}</span>}
          </div>
          {current.bestFor && current.bestFor.length > 0 && (
            <div className="best-for-row">
              {current.bestFor.map(tag => (
                <span key={tag} className="best-tag">{tag}</span>
              ))}
            </div>
          )}
        </div>
      </header>

      {siblings.length > 1 && (
        <div className="variant-picker" role="tablist" aria-label="Card variants">
          {siblings.map(s => (
            <button
              key={s.id}
              className={`variant-chip${s.id === selectedId ? ' active' : ''}`}
              onClick={() => handleVariantClick(s.id)}
              onKeyDown={handleVariantKeyDown(s.id)}
              role="tab"
              aria-selected={s.id === selectedId}
            >
              {s.name.replace(current.issuer ? new RegExp(`^${current.issuer}\\s*`) : '', '')}
            </button>
          ))}
        </div>
      )}

      <section className="coverage-list" aria-label="Insurance coverages">
        {coverages.map(item => {
          const isOpen = openKey === item.key
          const panelId = `coverage-panel-${item.key}`
          const headerId = `coverage-header-${item.key}`
          return (
            <div className="coverage-row" key={item.key}>
              <div
                className="coverage-header clickable"
                onClick={() => toggle(item.key)}
                onKeyDown={handleKeyDown(item.key)}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                aria-controls={panelId}
                id={headerId}
              >
                <div className="coverage-left">
                  <div className="check-wrap">
                    <div className={`check${item.value > 0 ? '' : ' check-none'}`} aria-hidden="true">✓</div>
                  </div>
                  <div className="coverage-label">{item.label}</div>
                </div>
                <div className={`chev ${isOpen ? 'open' : ''}`} aria-hidden="true">▾</div>
              </div>

              {isOpen && (
                <div className="coverage-body" id={panelId} role="region" aria-labelledby={headerId}>
                  <div>
                    {item.expl && <div className="expl">{item.expl}</div>}
                    {item.example && <div className="example">Example: {item.example}</div>}
                  </div>
                  {item.valueLabel && <div className={`coverage-amount${item.value === 0 ? ' amount-none' : ''}`}>{item.valueLabel}</div>}
                </div>
              )}
            </div>
          )
        })}
      </section>

      {coverages.length === 0 && (
        <div className="no-coverage">
          <p>No travel insurance coverage details yet for this card.</p>
        </div>
      )}

      {(current.claimsPhone || current.sourceUrl || current.lastUpdated) && (
        <div className="detail-footer">
          {current.claimsPhone && (
            <div className="claims-contact">
              <span className="claims-label">Claims: {current.claimsLabel}</span>
              <a href={`tel:${current.claimsPhone.replace(/[^0-9]/g, '')}`} className="claims-phone">{current.claimsPhone}</a>
            </div>
          )}
          <div className="footer-links">
            {current.lastUpdated && <span className="last-updated">Last updated: {current.lastUpdated}</span>}
            {current.sourceUrl && <a href={current.sourceUrl} target="_blank" rel="noopener noreferrer" className="source-link">View insurance certificate →</a>}
          </div>
        </div>
      )}
    </div>
  )
}

CardDetail.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    asset: PropTypes.string,
    annualFee: PropTypes.number,
    network: PropTypes.string,
    issuer: PropTypes.string,
    bestFor: PropTypes.arrayOf(PropTypes.string),
    family: PropTypes.string,
    familyRank: PropTypes.number,
    lastUpdated: PropTypes.string,
    sourceUrl: PropTypes.string,
    claimsPhone: PropTypes.string,
    claimsLabel: PropTypes.string,
    coverages: PropTypes.array
  }).isRequired,
  allCards: PropTypes.array.isRequired,
  onBack: PropTypes.func.isRequired
}
