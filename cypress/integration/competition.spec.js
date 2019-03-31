describe("Competition", () => {
    it("works", () => {
        cy.visit("http://localhost:3333")
        cy.contains("Welcome to Art vs. Art")
        cy.contains("Vote").click()
        cy.contains("Wins!")
    })
})