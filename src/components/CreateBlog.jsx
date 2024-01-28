import { useState } from "react"
import blogService from "../services/blogs"

const CreateBlog = ({ blogs, setBlogs, setError, setNotiText }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleCreate = async() => {
    const newBlog = { title, author, url }
    try {
      const created = await blogService.create(newBlog)
      setBlogs(blogs.concat(created))
      setTitle("")
      setAuthor("")
      setUrl("")
      setNotiText(`a new blog ${created.title} by ${created.author} added`)
    } catch (exception) {
      console.log(exception.response)
      setError(true)
      setNotiText(`${exception.response.data.error}`)
    }      
    setTimeout(() => {
      setNotiText(null)
      setError(false)
    }, 5000)
  }

  return (
    <>
      <h2>create new blog</h2>
      <div>
        title:<input type="text" value={title} onChange={({target}) => setTitle(target.value)} /><br/>
        author:<input type="text" value={author} onChange={({target}) => setAuthor(target.value)} /><br/>
        url:<input type="text" value={url} onChange={({target}) => setUrl(target.value)} /><br/>
        <input type="submit" value="create" onClick={handleCreate} />
      </div>
    </>
  )
}

export default CreateBlog