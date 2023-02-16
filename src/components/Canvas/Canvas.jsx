import React, { useEffect, useState } from 'react'
import './index.css'
import LoserModal from '../LoserModal/LoserModal'
import WinModal from '../WinModal/WinModal'
import confetti from 'canvas-confetti'

function Canvas ({ width, height }) {
  const [posX, setPosX] = useState(640)
  const [posY, setPosY] = useState(360)
  const [isClicked, setIsClicked] = useState(false)
  const [isGameOver, setIsGameOver] = useState(null)
  const [winner, setWinner] = useState(null)
  const [score, setScore] = useState(0)

  useEffect(() => {
    const canvas = document.getElementById('MyCanvas')
    const ctx = canvas.getContext('2d')
    drawCircle(ctx, posX, posY)

    canvas.addEventListener('click', handleClick)

    // Remove the event listener when the component unmounts
    return () => {
      canvas.removeEventListener('click', handleClick)
    }
  }, [posX, posY, isClicked])

  function handleClick (event) {
    const canvas = document.getElementById('MyCanvas')
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    // Calculate the distance from the click to the center of the circle
    const distance = Math.sqrt((x - posX) ** 2 + (y - posY) ** 2)

    if (distance <= 35) {
      setIsClicked(true)
      const newPosX = Math.floor(Math.random() * (width - 70)) + 35
      const newPosY = Math.floor(Math.random() * (height - 70)) + 35
      ctx.clearRect(posX - 35, posY - 35, 70, 70) // Clear the clicked circle
      setPosX(newPosX)
      setPosY(newPosY)
      setScore(score + 1)
    } else if (isClicked) {
      setIsGameOver(true)
    }
  }

  function resetGame () {
    if (isClicked === true) {
      const canvas = document.getElementById('MyCanvas')
      const ctx = canvas.getContext('2d')
      ctx.clearRect(posX - 35, posY - 35, 70, 70)
      setIsClicked(false)
      setPosX(640)
      setPosY(360)
      setScore(0)
    }
    setIsGameOver(null)
    setWinner(null)
  }

  const WINNER_CONDITION = () => {
    if (score === 25) {
      setWinner(true)
      confetti()
    }
  }
  useEffect(() => {
    WINNER_CONDITION()
  }, [score])

  function drawCircle (ctx, x, y) {
    ctx.beginPath()
    ctx.arc(x, y, 35, 0, 35)
    ctx.fillStyle = '#FF3737'
    ctx.fill()
  }

  return (
    <main className='wall-container'>
      <div className='score-container'>
        <h2 className='score-text'>Score: {score}</h2>
        <h2 className='win-conditional-text'>Score 25 to win</h2>
      </div>

      <canvas
        id='MyCanvas'
        width={width}
        height={height}
      />
      <button className='reset-btn' onClick={resetGame}>Reset game</button>

      <div>
        <LoserModal resetGame={resetGame} isGameOver={isGameOver} score={score} />
        <WinModal resetGame={resetGame} winner={winner} score={score} />
      </div>
    </main>
  )
}

export default Canvas
