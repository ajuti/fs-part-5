import { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({ blog, setBlogs, blogs }) => {
  const [visible, setVisibility] = useState(false)

  const showIfVisibleTrue = { display: visible ? "" : "none" }

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

  return (
    <div className="blog">
      <div>
        {blog.title} {blog.author} <button onClick={() => setVisibility(!visible)}>view</button>
      </div>
      <div style={showIfVisibleTrue}>
        <a href={blog.url}>{blog.url}</a><br/>
        likes {blog.likes}<button onClick={() => handleLike(blog)}>like</button><br/>
        {blog.user.name}<br/>
        <button onClick={() => handleDelete(blog)}>remove</button>
      </div>
    </div>  
  )
}

export default Blog