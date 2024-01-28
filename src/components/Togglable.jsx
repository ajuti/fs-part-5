import { forwardRef, useImperativeHandle, useState } from "react"
import PropTypes from "prop-types"

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisibility] = useState(false)

  const hideIfVisibleTrue = { display: visible ? "none" : "" }
  const showIfVisibleTrue = { display: visible ? "" : "none" }

  const toggleVisibility = () => {
    setVisibility(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideIfVisibleTrue}>
        <button onClick={toggleVisibility}>{props.show}</button>
      </div>
      <div style={showIfVisibleTrue}>
        {props.children}
        <button onClick={toggleVisibility}>{props.hide}</button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  show: PropTypes.string.isRequired,
  hide: PropTypes.string.isRequired
}

Togglable.displayName = "Togglable"

export default Togglable