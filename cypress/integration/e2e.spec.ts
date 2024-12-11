describe("Tour of Heroes test suite", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Main page has H1 tag", () => {
    cy.contains("Tour of Heroes");
  });

  it("Heroes page has h2 tag", () => {
    cy.get('[routerlink="/heroes"]').click();
    cy.get("app-heroes > h2").should("contain.text", "My Heroes");
  });

  it("Search on main page should work", () => {
    cy.get("#search-box").type("Bom");
    cy.get("app-hero-search li > a").should("contain.text", "Bombasto");
    cy.get("app-messages").should(
      "contain.text",
      'HeroService: found heroes matching "Bom"'
    );
  });

  it("Adding a hero on Heroes page should work", () => {
    cy.get('[routerlink="/heroes"]').click();
    cy.get("#new-hero").type("Bom");
    cy.get(".add-button").click();
    cy.get("app-heroes li:last > a").should("contain.text", "Bom");
    cy.get("app-messages").should("contain.text", "HeroService: added hero");
  });

  it("App messages should be displayed", () => {
    cy.get("app-messages").should(
      "contain.text",
      "HeroService: fetched heroes"
    );
  });

  it("Navigation from Top Heroes component should work", () => {
    cy.get('[ng-reflect-router-link="/detail/15"]').click();
    cy.url().should("satisfy", (url: any) => url.endsWith("/detail/15"));
    cy.get("app-hero-detail > :nth-child(1) > h2").should(
      "contain.text",
      "MAGNETA Details"
    );
    cy.get("app-messages").should(
      "contain.text",
      "HeroService: fetched hero id=15"
    );
  });

  it("Saving a hero should work", () => {
    cy.get('[ng-reflect-router-link="/detail/15"]').click();
    cy.url().should("satisfy", (url: any) => url.endsWith("/detail/15"));
    cy.get("app-hero-detail > :nth-child(1) > h2").should(
      "contain.text",
      "MAGNETA Details"
    );
    cy.get("#hero-name").focus().clear().type("Magneto");

    cy.get("app-hero-detail > :nth-child(1) > :nth-child(5)").click();
    cy.wait(1000);
    cy.get("app-messages").should(
      "contain.text",
      "HeroService: updated hero id=15"
    );
    cy.get('[ng-reflect-router-link="/detail/15"]').click();
    cy.get("app-hero-detail > :nth-child(1) > h2").should(
      "contain.text",
      "MAGNETO Details"
    );
  });

  it("Deleting a hero should work", () => {
    cy.visit("/heroes");
    cy.get(":nth-child(1) > .delete").click();
    cy.get(":nth-child(1) > a").should("not.contain.text", "Dr. Nice");
  });
});
