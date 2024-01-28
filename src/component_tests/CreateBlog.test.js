import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event"
import CreateBlog from "../components/CreateBlog"

describe("<CreateBlog />", () => {
  let component
  const mock_createBlog = jest.fn()

  beforeEach(() => {
    component = render(
      <CreateBlog createBlog={mock_createBlog} />
    )
  })

  test("createBlog is called with correct values", async() => {
    const user = userEvent.setup()

    const titleInput = screen.getByTestId("title")
    const authorInput = screen.getByTestId("author")
    const urlInput = screen.getByTestId("url")
    const createButton = screen.getByText("create")

    await user.type(titleInput, "Cool Title")
    await user.type(authorInput, "myself")
    await user.type(urlInput, "reactisfun.com")
    await user.click(createButton)

    expect(mock_createBlog.mock.calls).toHaveLength(1)
    expect(mock_createBlog.mock.calls[0]).toHaveLength(3)
    expect(mock_createBlog.mock.calls[0][0]).toBe("Cool Title")
    expect(mock_createBlog.mock.calls[0][1]).toBe("myself")
    expect(mock_createBlog.mock.calls[0][2]).toBe("reactisfun.com")
  })
})