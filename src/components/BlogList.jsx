import { useState } from "react"
import Blog from "./Blog"
import CreateBlog from "./CreateBlog"
import Notification from "./Notification"

const BlogList = ({blogs, user, setUser, setBlogs, error, setError, notiText, setNotiText}) => {

  const handleLogout = async(event) => {
    event.preventDefault()
    window.localStorage.removeItem("loggedUser")
    setUser(null)
    /* setError(false)
    setNotiText("Logout successful")
    setTimeout(() => {
      setNotiText(null)
      setError(false)
    }, 3000) */
  }
  console.log(error)
  return (
    <div>
      <h2>blogs</h2>
      <Notification msg={notiText} error={error} />
      <p>{user} logged in<input type="submit" value="logout" onClick={handleLogout}/></p>
      <CreateBlog blogs={blogs} setBlogs={setBlogs} setError={setError} setNotiText={setNotiText} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default BlogList