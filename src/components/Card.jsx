import PropTypes from 'prop-types'

export default function Card({ card, siblingCount }) {
  function handleClick() {
    window.location.hash = `/card/${card.id}`
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      window.location.hash = `/card/${card.id}`
    }
  }

  return (
    <div className="card clickable" onClick={handleClick} onKeyDown={handleKeyDown} role="button" tabIndex={0} aria-label={`View ${card.name} details`}>
      {card.asset ? (
        <img src={card.asset} alt={card.name} className="card-art" loading="lazy" />
      ) : (
        <div className="card-placeholder">
          <div className="card-placeholder-name">{card.name}</div>
          {card.bestFor && card.bestFor.length > 0 && (
            <div className="card-placeholder-tags">
              {card.bestFor.slice(0, 2).map(tag => (
                <span key={tag} className="card-placeholder-tag">{tag}</span>
              ))}
              {card.bestFor.length > 2 && <span className="card-placeholder-tag">+{card.bestFor.length - 2}</span>}
            </div>
          )}
        </div>
      )}
      {siblingCount > 0 && (
        <div className="variant-badge">{siblingCount + 1} variants</div>
      )}
    </div>
  )
}

Card.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    asset: PropTypes.string,
    bestFor: PropTypes.arrayOf(PropTypes.string),
    family: PropTypes.string,
    familyRank: PropTypes.number
  }).isRequired,
  siblingCount: PropTypes.number
}
