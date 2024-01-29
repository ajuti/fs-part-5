Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", `${Cypress.env("BACKEND")}/login`, {
    username, password
  }).then(({ body }) => {
    localStorage.setItem("loggedUser", JSON.stringify(body))
    cy.visit("")
  })
})

Cypress.Commands.add("register", (user) => {
  cy.request("POST", `${Cypress.env("BACKEND")}/users`, user)
})

Cypress.Commands.add("resetDb", () => {
  cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`)
})

Cypress.Commands.add("createBlog", ({ title, author, url }) => { 
  cy.request({
    method: "POST",
    url: `${Cypress.env("BACKEND")}/blogs`,
    body: { title, author, url },
    headers: {
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("loggedUser")).token}`
    }
  })
  cy.visit("")
})