import { useState } from "react"
import { loginUser } from "../services/login"
import blogService from "../services/blogs"
import Notification from "./Notification"

const LoginForm = ({ setUser, error, setError, notiText, setNotiText }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async(event) => {
    event.preventDefault()
    console.log("Logging in with: ", username, password)
    try {
      const user = await loginUser(username, password)

      blogService.setToken(user.token)
      setUser(user)   
      window.localStorage.setItem("loggedUser", JSON.stringify(user))
      setUsername("")
      setPassword("")
      setNotiText("Login successful")
    } catch (exception) {
      console.log("Login failed: ", exception)
      setError(true)
      setNotiText("wrong username or password")
    }
    setTimeout(() => {
      setNotiText(null)
      setError(false)
    }, 3000)
  }

  return (
    <>
      <h2>log in to application</h2>
      <Notification msg={notiText} error={error} />
      <div>
        username <input type="text" name="user" value={username} onChange={({target}) => setUsername(target.value)} /><br/>
        password <input type="password" name="password" value={password} onChange={({target}) => setPassword(target.value)} />
      </div>
      <input type="submit" value="login" onClick={handleLogin} />
    </>
  )
}

export default LoginForm