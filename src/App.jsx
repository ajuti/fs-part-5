import { useState, useEffect } from "react"
import blogService from "./services/blogs"
import LoginForm from "./components/LoginForm"
import BlogList from "./components/BlogList"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [error, setError] = useState(false)
  const [notiText, setNotiText] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  return (
    <>
      { !user && <LoginForm
        setUser={setUser}
        error={error}
        setError={setError}
        notiText={notiText}
        setNotiText={setNotiText} /> }

      { user && <BlogList
        blogs={blogs}
        user={user}
        setUser={setUser}
        setBlogs={setBlogs}
        error={error}
        setError={setError}
        notiText={notiText}
        setNotiText={setNotiText}/>
      }
    </>
  )
}

export default App