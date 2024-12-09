import React, { useState, useRef, useEffect } from 'react'
import { usePicker } from '../context.js'
import { getHandleValue } from '../utils/utils.js'
import {
  usePaintSat,
  usePaintLight,
  usePaintBright,
} from '../hooks/usePaintHue.js'
import tinycolor from 'tinycolor2'

const AdvBar = ({
  value,
  callback,
  reffy,
  openAdvanced,
  label,
}: {
  value: number
  callback: (arg0: number) => void
  reffy: any
  openAdvanced: boolean
  label: string
}) => {
  const { squareWidth, defaultStyles } = usePicker()
  const [dragging, setDragging] = useState<boolean>(false)
  const [handleTop, setHandleTop] = useState<number>(2)
  const left = value * (squareWidth - 18)

  useEffect(() => {
    setHandleTop(reffy?.current?.offsetTop - 2)
  }, [openAdvanced, reffy])

  const stopDragging = () => {
    setDragging(false)
  }

  const handleMove = (e: any) => {
    if (dragging) {
      callback(getHandleValue(e))
    }
  }

  const handleClick = (e: any) => {
    if (!dragging) {
      callback(getHandleValue(e))
    }
  }

  const handleDown = () => {
    setDragging(true)
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
    <div style={{ width: '100%', padding: '3px 0px 3px 0px' }}>
      <div
        onMouseMove={(e) => handleMove(e)}
        // className="rbgcp-advanced-bar-wrap"
        style={{ cursor: 'resize', position: 'relative' }}
      >
        <div
          style={{ left, top: handleTop, ...defaultStyles.rbgcpHandle }}
          // className="rbgcp-advanced-bar-handle"
          onMouseDown={handleDown}
          role="button"
          tabIndex={0}
        />
        <div
          style={{
            textAlign: 'center',
            color: '#fff',
            fontSize: 12,
            fontWeight: 500,
            lineHeight: 1,
            position: 'absolute',
            left: '50%',
            transform: 'translate(-50%, 0%)',
            top: handleTop + 2,
            zIndex: 10,
            textShadow: '1px 1px 1px rgba(0,0,0,.6)',
          }}
          // className="rbgcp-advanced-bar-label"
          onMouseMove={(e) => handleMove(e)}
          onClick={(e) => handleClick(e)}
          tabIndex={0}
          role="button"
          onKeyDown={() => {
            return
          }}
        >
          {label}
        </div>
        <canvas
          ref={reffy}
          // height="14px"
          // width={`${squareWidth}px`}
          onClick={(e) => handleClick(e)}
          // className="rbgcp-advanced-bar-canvas"
          style={{ position: 'relative', borderRadius: 14, width: '100%', height: 14 }}
        />
      </div>
    </div>
  )
}

const AdvancedControls = ({ openAdvanced }: { openAdvanced: boolean }) => {
  const { tinyColor, handleChange, squareWidth, hc } = usePicker()
  const { s, l } = tinyColor.toHsl()

  const satRef = useRef(null)
  const lightRef = useRef(null)
  const brightRef = useRef(null)
  usePaintSat(satRef, hc?.h, l * 100, squareWidth)
  usePaintLight(lightRef, hc?.h, s * 100, squareWidth)
  usePaintBright(brightRef, hc?.h, s * 100, squareWidth)

  const satDesat = (value: number) => {
    const { r, g, b } = tinycolor({ h: hc?.h, s: value / 100, l }).toRgb()
    handleChange(`rgba(${r},${g},${b},${hc?.a})`)
  }

  const setLight = (value: number) => {
    const { r, g, b } = tinycolor({ h: hc?.h, s, l: value / 100 }).toRgb()
    handleChange(`rgba(${r},${g},${b},${hc?.a})`)
  }

  const setBright = (value: number) => {
    const { r, g, b } = tinycolor({
      h: hc?.h,
      s: hc?.s * 100,
      v: value,
    }).toRgb()
    handleChange(`rgba(${r},${g},${b},${hc?.a})`)
  }

  return (
    <div
      style={{
        height: openAdvanced ? 98 : 0,
        width: '100%',
        transition: 'all 120ms linear',
      }}
      // className="rbgcp-advanced-controls-wrap"
    >
      <div
        style={{
          paddingTop: 11,
          display: openAdvanced ? 'flex' : 'none',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: openAdvanced ? 98 : 0,
          overflow: 'hidden',
          transition: 'height 100ms linear',
        }}
        // className="rbgcp-advanced-controls-inner"
      >
        <AdvBar
          value={s}
          reffy={satRef}
          callback={satDesat}
          openAdvanced={openAdvanced}
          label="Saturation"
        />
        <AdvBar
          value={l}
          reffy={lightRef}
          label="Lightness"
          callback={setLight}
          openAdvanced={openAdvanced}
        />
        <AdvBar
          value={hc?.v}
          reffy={brightRef}
          label="Brightness"
          callback={setBright}
          openAdvanced={openAdvanced}
        />
      </div>
    </div>
  )
}

export default AdvancedControls
