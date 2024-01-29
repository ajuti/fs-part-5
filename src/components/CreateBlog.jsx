import { useState } from "react"
import blogService from "../services/blogs"

const CreateBlog = ({ createBlog }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleCreate = async() => {
    const res = await createBlog(title, author, url)
    if (res) {
      setTitle("")
      setAuthor("")
      setUrl("")
    }
  }

  return (
    <>
      <h2>create new blog</h2>
      <div>
        title:<input type="text" value={title} data-testid="title" onChange={({ target }) => setTitle(target.value)} /><br/>
        author:<input type="text" value={author} data-testid="author" onChange={({ target }) => setAuthor(target.value)} /><br/>
        url:<input type="text" value={url} data-testid="url" onChange={({ target }) => setUrl(target.value)} /><br/>
        <input type="submit" value="create" id="createButton" onClick={handleCreate} />
      </div>
    </>
  )
}

export default CreateBlog