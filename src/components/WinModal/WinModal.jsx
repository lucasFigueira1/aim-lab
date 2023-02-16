import React from 'react'
import './index.css'

function WinModal ({ resetGame, score, winner }) {
  if (winner === null) return null

  return (
    <div className='modal-card'>
      <div className='modal-wrapper'>
        <h2 className='modal-text'>You Won!</h2>
        <span className='modal-score'>Score: {score}</span>
        <button onClick={resetGame} className='modal-btn'>Start again</button>
      </div>
    </div>
  )
}

export default WinModal
