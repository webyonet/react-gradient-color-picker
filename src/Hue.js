import React, { useRef, useState, useEffect } from 'react'
import { usePicker } from './context'
import usePaintHue from './usePaintHue'
import {
  barWrap,
  psRl,
  barWrapInner,
  cResize,
  handle,
  borderBox,
} from './style'

const Hue = () => {
  const barRef = useRef(null)
  const { handleHue, internalHue, squareSize, setInFocus, inFocus, value } = usePicker()
  const [dragging, setDragging] = useState(false)
  usePaintHue(barRef, squareSize)
  const [handleTop, setHandleTop] = useState(2)

  useEffect(() => {
    setHandleTop(barRef?.current?.offsetTop - 2)
  }, [barRef])

  const stopDragging = () => {
    setDragging(false)
  }

  const handleDown = () => {
    setInFocus('hueHandle')
    setDragging(true)
  }

  const handleMove = e => {
    if (dragging) {
      handleHue(e)
    }
  }

  const handleClick = e => {
    if (!dragging) {
      handleHue(e)
    }
  }

  // const handleKeyboard = (e) => {
  //   if (inFocus === 'hueHandle') {
  //       if (e.keyCode === 37) {
  //         let _newValue = Math.round(internalHue / 3.6) - 1;
  //         let newValue = Math.max(_newValue, 0)
  //         handleHue({ type: 'picker-keyboard', value: newValue })
  //       } else if (e.keyCode === 39) {
  //         let _newValue = Math.round(internalHue / 3.6) + 1;
  //         let newValue = Math.min(_newValue, 100)
  //         handleHue({ type: 'picker-keyboard', value: newValue })
  //       }
  //   }
  // }
  //
  // useEffect(() => {
  //   window.addEventListener('keydown', handleKeyboard);
  //
  //   return () => {
  //     window.removeEventListener('keydown', handleKeyboard);
  //   };
  // }, [internalHue, inFocus, value]);

  return (
    <div
      onMouseEnter={stopDragging}
      onMouseLeave={stopDragging}
      style={{ ...barWrap, width: squareSize + 36 }}
    >
      <div
        onMouseUp={stopDragging}
        style={{ ...psRl, ...barWrapInner, width: squareSize + 30 }}
      >
        <div
          style={{ ...psRl, ...cResize, ...borderBox }}
          onMouseMove={e => handleMove(e)}
          className="c-resize ps-rl"
        >
          <div
            style={{
              ...handle,
              left: internalHue * ((squareSize - 18) / 360),
              top: handleTop,
            }}
            onMouseDown={handleDown}
          />
          <canvas
            ref={barRef}
            width={`${squareSize}px`}
            height="14px"
            style={{ position: 'relative', borderRadius: 14 }}
            onClick={e => handleClick(e)}
          />
        </div>
      </div>
    </div>
  )
}

export default Hue
