it('loads examples', () => {
  cy.visit('/');
  cy.contains('Tour of Heroes');
});
