/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useRef, useState, useEffect } from 'react'
import usePaintSquare from '../hooks/usePaintSquare.js'
import throttle from 'lodash.throttle'
import { usePicker } from '../context.js'
import tinycolor from 'tinycolor2'
import { computePickerPosition, computeSquareXY } from '../utils/utils.js'
import { config } from '../constants.js'

const { crossSize } = config

const Square = () => {
  const { hc, defaultStyles, squareWidth, squareHeight, handleChange } = usePicker()
  const [dragging, setDragging] = useState(false)
  const canvas = useRef<HTMLCanvasElement>(null)
  const [x, y] = computeSquareXY(hc?.s, hc?.v * 100, squareWidth, squareHeight)
  const [dragPos, setDragPos] = useState({ x, y })

  usePaintSquare(canvas, hc?.h, squareWidth, squareHeight)

  useEffect(() => {
    if (!dragging) {
      setDragPos({ x: hc?.v === 0 ? dragPos.x : x, y })
    }
  }, [x, y])

  const handleColor = (e: any) => {
    const onMouseMove = throttle(() => {
      const [x, y] = computePickerPosition(e)
      if (x && y) {
        const x1 = Math.min(x + crossSize / 2, squareWidth - 1)
        const y1 = Math.min(y + crossSize / 2, squareHeight - 1)
        const newS = (x1 / squareWidth) * 100
        const newY = 100 - (y1 / squareHeight) * 100
        setDragPos({ x: newY === 0 ? dragPos?.x : x, y })
        const updated = tinycolor(
          `hsva(${hc?.h}, ${newS}%, ${newY}%, ${hc?.a})`
        )
        handleChange(updated.toRgbString())
      }
    }, 250)

    onMouseMove()
  }

  const stopDragging = () => {
    setDragging(false)
  }

  const handleMove = (e: any) => {
    if (dragging) {
      handleColor(e)
    }
  }

  // const handleTouchMove = (e: any) => {
  //   if (dragging && isMobile) {
  //     document.body.style.overflow = 'hidden'
  //     handleColor(e)
  //   }
  // }

  const handleClick = (e: any) => {
    if (!dragging) {
      handleColor(e)
    }
  }

  const handleMouseDown = () => {
    setDragging(true)
  }

  const handleCanvasDown = (e: any) => {
    setDragging(true)
    handleColor(e)
  }

  useEffect(() => {
    const handleUp = () => {
      stopDragging()
    }

    window.addEventListener('mouseup', handleUp)

    return () => {
      window.removeEventListener('mouseup', handleUp)
    }
  }, [])

  return (
    <div style={{ position: 'relative' }}>
      <div
        onMouseUp={stopDragging}
        onTouchEnd={stopDragging}
        onMouseDown={handleCanvasDown}
        onTouchStart={handleCanvasDown}
        onMouseMove={(e) => handleMove(e)}
        style={{ position: 'relative', cursor: 'ew-cross' }}
        // className="rbgcp-square-wrap"
      >
        <div
          style={{
            ...defaultStyles.rbgcpHandle,
            transform: `translate(${dragPos?.x ?? 0}px, ${dragPos?.y ?? 0}px)`,
            ...(dragging ? { transition: '' } : {}),
          }}
          onMouseDown={handleMouseDown}
          // className="rbgcp-handle rbgcp-handle-square"
        />
        <div
          style={{ ...defaultStyles.rbgcpCanvasWrapper, height: squareHeight }}
          // className="rbgcp-canvas-wrapper"
          onClick={(e) => handleClick(e)}
        >
          <canvas
            ref={canvas}
            className="paintSquare"
            // className="rbgcp-canvas"
            width={`${squareWidth}px`}
            height={`${squareHeight}px`}
          />
        </div>
      </div>
    </div>
  )
}

export default Square
