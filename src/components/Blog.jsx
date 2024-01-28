import { useState } from "react"

const Blog = ({ blog, handleDelete, handleLike, user }) => {
  const [visible, setVisibility] = useState(false)

  const showIfVisibleTrue = { display: visible ? "" : "none" }

  return (
    <div className="blog">
      <div>
        <span>{blog.title} {blog.author}</span><button onClick={() => setVisibility(!visible)}>view</button>
      </div>
      <div style={showIfVisibleTrue}>
        <a href={blog.url}>{blog.url}</a><br/>
        <span>likes {blog.likes}</span><button onClick={() => handleLike(blog)}>like</button><br/>
        <span>{blog.user.name}</span><br/>
         {
          user.username === blog.user.username &&
          <button onClick={() => handleDelete(blog)}>remove</button>
         }
      </div>
    </div>
  )
}

export default Blog