import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event"
import Blog from "../components/Blog"

describe("<Blog />", () => {
  const blog = {
    title: "this is the title",
    author: "ajuti",
    url: "moi.com",
    likes: 20,
    user: {
      username: "ajuti",
      name: "aapo"
    }
  }

  let component
  const mock_handleLike = jest.fn()
  const mock_handleDelete = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog
        key={blog.id}
        blog={blog}
        handleDelete={mock_handleDelete}
        handleLike={mock_handleLike}
        user={blog.user}
      />
    )
  })

  test("blog renders the title and author, but not url and likes by default", async() => {
    const byTitleAndAuthor = screen.getByText(`${blog.title} ${blog.author}`)
    const byUrl = screen.getByText(`${blog.url}`)
    const byLikes = screen.getByText(`likes ${blog.likes}`)

    expect(byTitleAndAuthor).toBeDefined()
    expect(byTitleAndAuthor).toBeVisible()
    expect(byUrl).not.toBeVisible()
    expect(byLikes).not.toBeVisible()
  })

  test("url, likes and users name are show if 'view' is clicked", async() => {
    const byUrl = screen.getByText(`${blog.url}`)
    const byLikes = screen.getByText(`likes ${blog.likes}`)
    const byUser = screen.getByText(`${blog.user.name}`)

    expect(byUrl).not.toBeVisible()
    expect(byLikes).not.toBeVisible()
    expect(byUser).not.toBeVisible()

    const user = userEvent.setup()

    const button = screen.getByText("view")
    await user.click(button)

    expect(byUrl).toBeVisible()
    expect(byLikes).toBeVisible()
    expect(byUser).toBeVisible()
  })

  test("liking a blog results in two calls to eventHandler", async() => {
    const user = userEvent.setup()

    const viewButton = screen.getByText("view")
    await user.click(viewButton)

    const likeButton = screen.getByText("like")
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mock_handleLike.mock.calls).toHaveLength(2)
  })
})