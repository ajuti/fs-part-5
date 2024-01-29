describe("Blog app", () => {
  beforeEach(function() {
    cy.resetDb()
    const user = { username: "ajuti", name: "Aapo Jutila", password: "sekret" }
    cy.register(user)
    cy.visit("")
  })

  it("login form is shown", () => {
    cy.contains("log in to application")
    cy.get("#username").should("be.visible")
    cy.get("#password").should("be.visible")
    cy.get("#login").should("be.visible")
  })

  describe("logging in works", () => {
    it("user can log in", function() {
      cy.get("#username").type("ajuti")
      cy.get("#password").type("sekret")
      cy.get("#login").click()

      cy.contains("Aapo Jutila logged in")
    })

    it("log in fails with wrong password", function() {
      cy.get("#username").type("ajuti")
      cy.get("#password").type("wrongpass")
      cy.get("#login").click()

      cy.contains("wrong username or password")
      cy.contains("Aapo Jutila logged in").should("not.exist")
    })
  })

  describe("when logged in", function() {
    beforeEach(function() {
      cy.login({ username: "ajuti", password: "sekret" })
    })

    it("a blog can be created", function() {
      cy.contains("new blog").click()
      cy.get('[data-testid="title"]').type("End to End blog")
      cy.get('[data-testid="author"]').type("myself")
      cy.get('[data-testid="url"]').type("www.testing.fi")
      cy.get("#createButton").click()

      cy.contains("End to End blog").should("be.visible")
    })

    describe("and a blog is created", () => {
      beforeEach(function() {
        /* Creator if the blog is user: ajuti */
        cy.createBlog({ title: "End to End blog", author: "Aapo", url: "www.testing.fi" })
      })

      it("a blog can be liked", function() {
        cy.contains("End to End blog")
          .parent()
          .parent()
          .as("blog")
        
        cy.get("@blog")
          .contains("view")
          .click()

        cy.get("@blog")
          .contains("like")
          .click()
      })


    })
  })
})