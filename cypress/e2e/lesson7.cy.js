describe('SQL Injection Testing', () => {
  beforeEach(() => {
    cy.visit(' https://juice-shop.herokuapp.com');
});

  it('should test SQL injection in the username and password fields', () => {
        const sqlPayloads = [
          "' OR 1=1 --",
          "' OR 'a'='a",
          "' OR '1'='1' --",
          "' OR '1'='1' #",
          "' AND 1=CONVERT(int, @@version) --",
          "' UNION SELECT null, username, password FROM users --",
   ];

    sqlPayloads.forEach(payload => {
      cy.get('input[name="username"]').clear().type(payload);
      cy.get('input[name="password"]').clear().type(payload);
      cy.get('button[type="submit"]').click();
      cy.get('body').should('not.contain', 'Invalid username or password');
      cy.get('body').should('not.contain', 'Database error');
    });
  });
});



describe('SQL Injection Testing', () => {
  beforeEach(() => {
    cy.visit(' https://juice-shop.herokuapp.com');
});

  it('should test SQL injection in the search field', () => {
        const sqlPayloads = [
          "' OR 1=1 --",
          "' OR 'a'='a",
          "' OR '1'='1' --",
          "' OR '1'='1' #",
          "' AND 1=CONVERT(int, @@version) --",
          "' UNION SELECT null, username, password FROM users --",
   ];

    sqlPayloads.forEach(payload => {
      cy.get('body').should('not.contain', 'SQL error');
      cy.get('body').should('not.contain', 'Database error');
      cy.get('body').should('not.contain', 'Warning');
    });
  });
});

describe('SQL Injection Testing', () => {
  beforeEach(() => {
    cy.visit(' https://juice-shop.herokuapp.com');
});

  it('should test SQL injection to access another user\'s basket', () => {
        const sqlPayloads = [
          "' OR 1=1 --",
          "' OR 'a'='a",
          "' OR '1'='1' --",
          "' OR '1'='1' #",
          "' AND UNION SELECT basket_id, item_name, quantity FROM user_baskets WHERE user_id = 1 --",
          "' UNION SELECT basket_id, item_name, quantity FROM user_baskets WHERE '1'='1' --",
   ];

    sqlPayloads.forEach(payload => {
      cy.get('input[name="search"]').clear().type(payload);
      cy.get('button[type="submit"]').click();
      cy.get('body').should('not.contain', 'Access Denied');
      cy.get('body').should('not.contain', 'You do not have permission to view this basket');
    });
  });
});



