import { useRef } from "react"
import Blog from "./Blog"
import CreateBlog from "./CreateBlog"
import Notification from "./Notification"
import Togglable from "./Togglable"
import blogService from "../services/blogs"

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

  const handleLike = async(blog) => {
    const blogToSend = { ...blog, user: blog.user.id, likes: blog.likes + 1 }
    const response = await blogService.likeBlog(blogToSend)
    setBlogs(blogs.map(oldBlog => oldBlog.id === blog.id ? response : oldBlog))
  }

  const handleDelete = async(blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    } else {
      console.log("remove cancelled")
    }
  }

  const createBlog = async(title, author, url) => {
    const newBlog = { title, author, url }
    try {
      const created = await blogService.create(newBlog)
      setBlogs(blogs.concat(created))
      setNotiText(`a new blog ${created.title} by ${created.author} added`)
      blogFormRef.current.toggleVisibility()
      return true
    } catch (exception) {
      console.log(exception.response)
      setError(true)
      setNotiText(`${exception.response.data.error}`)
      return false
    } finally {
      setTimeout(() => {
        setNotiText(null)
        setError(false)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification msg={notiText} error={error} />
      <p>{user.name} logged in<input type="submit" value="logout" onClick={handleLogout}/></p>
      <Togglable show="new blog" hide="cancel" ref={blogFormRef}>
        <CreateBlog createBlog={createBlog} />
      </Togglable>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} handleDelete={handleDelete} handleLike={handleLike} user={user}/>
      )}
    </div>
  )
}

export default BlogList