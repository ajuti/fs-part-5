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
        // Creator if the blog is user: ajuti 
        cy.createBlog({ title: "End to End blog", author: "Aapo", url: "www.testing.fi" })
        cy.contains("End to End blog")
          .parent()
          .parent()
          .as("blog")
      })

      it("a blog can be liked", function() {
        cy.get("@blog")
          .contains("view")
          .click()

        cy.get("@blog")
          .get("#likeButton")
          .click()
      })
      
      it("user can delete the blog", function() {
        cy.get("@blog")
          .contains("view")
          .click()
        
        cy.get("@blog")
          .contains("remove")
          .click()

        cy.contains("End to End blog").should("not.exist")
      })

      it("user cannot see remove button if he's not the author", function() {
        cy.register({ username: "cankku", name: "Can Kolho", password: "salainen" })
        cy.contains("logout").click()

        cy.login({ username: "cankku", password: "salainen" })
        cy.get("@blog")
          .contains("view")
          .click()
        
        cy.get("@blog")
          .contains("remove").should("not.exist")
      })
    })
  
    describe("when multiple blogs are created", () => {
      beforeEach(function() {
        cy.createBlog({ title: "End to End blog", author: "Aapo", url: "www.testing.fi" })
        cy.createBlog({ title: "Second Blog", author: "Aapo", url: "www.localhost.fi" })
        cy.createBlog({ title: "Final blog", author: "Aapo", url: "www.blogs.fi" })
        cy.contains("view").eq(0).click()
        cy.contains("view").eq(0).click()
        cy.contains("view").eq(0).click()
        cy.contains("End to End blog").parent().parent().as("blog1")
        cy.contains("Final blog").parent().parent().as("blog3")
      })

      it("blogs should be sorted based on the amount of likes in descending order", function() {
        cy.get("@blog3", {timeout: 1000}).find("button").eq(1).click()
        cy.get("@blog1", {timeout: 1000}).find("button").eq(1).click()
        cy.get("@blog3", {timeout: 1000}).find("button").eq(1).click()

        cy.get(".blog").eq(0).should("contain", "Final blog")
        cy.get(".blog").eq(1).should("contain", "End to End blog")
        cy.get(".blog").eq(2).should("contain", "Second Blog")
      })
    })
  })
})