import React from 'react'
import { usePicker } from '../context.js'
import { formatInputValues, low, high } from '../utils/formatters.js'
import { controlBtnStyles } from '../styles/styles.js'
import TrashIcon, {
  LinearIcon,
  RadialIcon,
  DegreesIcon,
  StopIcon,
} from './icon.js'

const GradientType = () => {
  const { gradientType, onChange, value, defaultStyles } = usePicker()
  const isLinear = gradientType === 'linear-gradient'
  const isRadial = gradientType === 'radial-gradient'

  const handleLinear = () => {
    const remaining = value.split(/,(.+)/)[1]
    onChange(`linear-gradient(90deg, ${remaining}`)
  }

  const handleRadial = () => {
    const remaining = value.split(/,(.+)/)[1]
    onChange(`radial-gradient(circle, ${remaining}`)
  }

  return (
    <div style={defaultStyles.rbgcpControlBtnWrapper}>
      <div
        onClick={handleLinear}
        className="rbgcp-linear-btn"
        // className="rbgcp-control-icon-btn rbgcp-linear-btn"
        style={{
          ...defaultStyles.rbgcpControlBtn,
          ...(isLinear && defaultStyles.rbgcpControlBtnSelected),
        }}
        tabIndex={0}
        role="button"
        onKeyDown={() => {
          return
        }}
      >
        <LinearIcon color={isLinear ? '#568CF5' : ''} />
      </div>
      <div
        onClick={handleRadial}
        className="rbgcp-radial-btn"
        // className="rbgcp-control-icon-btn rbgcp-radial-btn"
        style={{
          ...defaultStyles.rbgcpControlBtn,
          ...(isRadial && defaultStyles.rbgcpControlBtnSelected),
        }}
        tabIndex={0}
        role="button"
        onKeyDown={() => {
          return
        }}
      >
        <RadialIcon color={isRadial ? '#568CF5' : ''} />
      </div>
    </div>
  )
}

const StopPicker = () => {
  const { currentLeft, handleGradient, currentColor, defaultStyles } = usePicker()

  const handleMove = (newVal: string) => {
    handleGradient(currentColor, formatInputValues(parseInt(newVal), 0, 100))
  }

  return (
    <div
      // className="rbgcp-stop-input-wrap"
      style={{
        ...defaultStyles.rbgcpControlBtnWrapper,
        ...defaultStyles.rbgcpControlInputWrap,
        ...defaultStyles.rbgcpStopInputWrap,
        paddingLeft: 8,
      }}
    >
      <StopIcon />
      <input
        value={currentLeft}
        className="rbgcp-stop-input"
        onChange={(e) => handleMove(e.target.value)}
        style={{
          ...defaultStyles.rbgcpControlInput,
          ...defaultStyles.rbgcpStopInput,
        }}
        // className="rbgcp-control-input rbgcp-stop-input"
      />
    </div>
  )
}

const DegreePicker = () => {
  const { degrees, onChange, value, defaultStyles } = usePicker()

  const handleDegrees = (e: any) => {
    const newValue = formatInputValues(e.target.value, 0, 360)
    const remaining = value.split(/,(.+)/)[1]
    onChange(`linear-gradient(${newValue || 0}deg, ${remaining}`)
  }

  return (
    <div
      // className="rbgcp-degree-input-wrap"
      style={{
        ...defaultStyles.rbgcpControlBtnWrapper,
        ...defaultStyles.rbgcpControlInputWrap,
        ...defaultStyles.rbgcpDegreeInputWrap,
      }}
    >
      <DegreesIcon />
      <input
        value={degrees}
        className="rbgcp-degree-input"
        onChange={(e) => handleDegrees(e)}
        // className="rbgcp-control-input rbgcp-degree-input"
        style={{
          ...defaultStyles.rbgcpControlInput,
          ...defaultStyles.rbgcpDegreeInput,
        }}
      />
      <div
        // className="rbgcp-degree-circle-icon"
        style={{
          ...defaultStyles.rbgcpDegreeIcon,
          position: 'absolute',
          right: degrees > 99 ? 0 : degrees < 10 ? 7 : 3,
          top: 1,
          fontWeight: 400,
          fontSize: 13,
        }}
      >
        °
      </div>
    </div>
  )
}

const DeleteBtn = () => {
  const { colors, selectedColor, createGradientStr, defaultStyles } = usePicker()

  const deletePoint = () => {
    if (colors?.length > 2) {
      const formatted = colors?.map((fc: any, i: number) => ({
        ...fc,
        value: i === selectedColor - 1 ? high(fc) : low(fc),
      }))
      const remaining = formatted?.filter(
        (_: any, i: number) => i !== selectedColor
      )
      createGradientStr(remaining)
    }
  }

  return (
    <div
      onClick={deletePoint}
      style={{ ...controlBtnStyles(false, defaultStyles), width: 28 }}
      className="rbgcp-point-delete-btn"
      // className="rbgcp-control-btn rbgcp-point-delete-btn"
      tabIndex={0}
      role="button"
      onKeyDown={() => {
        return
      }}
    >
      <TrashIcon />
    </div>
  )
}

const GradientControls = ({
  hideGradientType,
  hideGradientAngle,
  hideGradientStop,
}: {
  hideGradientType?: boolean
  hideGradientAngle?: boolean
  hideGradientStop?: boolean
}) => {
  const { gradientType, defaultStyles } = usePicker()
  return (
    <div
      style={{
        ...defaultStyles.rbgcpControlBtnWrapper,
        marginTop: 12,
        marginBottom: -4,
        justifyContent: 'space-between',
        paddingLeft: hideGradientType ? 4 : 0,
      }}
      className="rbgcp-gradient-controls-wrap"
      // className="rbgcp-gradient-controls-wrap"
    >
      {!hideGradientType && <GradientType />}
      <div style={{ width: 53 }}>
        {!hideGradientAngle && gradientType === 'linear-gradient' && (
          <DegreePicker />
        )}
      </div>
      {!hideGradientStop && <StopPicker />}
      <DeleteBtn />
    </div>
  )
}

export default GradientControls
