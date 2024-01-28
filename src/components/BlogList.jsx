import { useRef } from "react"
import Blog from "./Blog"
import CreateBlog from "./CreateBlog"
import Notification from "./Notification"
import Togglable from "./Togglable"

const BlogList = ({ blogs, user, setUser, setBlogs, error, setError, notiText, setNotiText }) => {
  const blogFormRef = useRef()

  const handleLogout = async(event) => {
    event.preventDefault()
    window.localStorage.removeItem("loggedUser")
    setUser(null)
    setNotiText("Logout successful")
    setTimeout(() => {
      setNotiText(null)
    }, 3000)
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification msg={notiText} error={error} />
      <p>{user} logged in<input type="submit" value="logout" onClick={handleLogout}/></p>
      <Togglable show="new blog" hide="cancel" ref={blogFormRef}>
        <CreateBlog blogs={blogs} setBlogs={setBlogs} setError={setError} setNotiText={setNotiText} formRef={blogFormRef} />
      </Togglable>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} blogs={blogs}/>
      )}
    </div>
  )
}

export default BlogList