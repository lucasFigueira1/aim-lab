import React, { useEffect, useState } from 'react'
import './index.css'

function Canvas ({ width, height }) {
  const [posX, setPosX] = useState(640)
  const [posY, setPosY] = useState(360)
  const [isClicked, setIsClicked] = useState(false)

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
    } else if (isClicked) {
      resetGame()
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
    }
  }

  function drawCircle (ctx, x, y) {
    ctx.beginPath()
    ctx.arc(x, y, 35, 0, 35)
    ctx.fillStyle = '#FF3737'
    ctx.fill()
  }

  return (
    <main className='wall-container'>
      <canvas
        id='MyCanvas'
        width={width}
        height={height}
      />
      <button className='reset-btn' onClick={resetGame}>Reset game</button>
    </main>
  )
}

export default Canvas
