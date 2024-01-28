import { forwardRef, useImperativeHandle, useState } from "react"

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

export default Togglable