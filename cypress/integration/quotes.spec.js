// write tests here
describe("Qoutes App", () => {
  //sceduale smth to happen before each test
  //before each test we navigate to http://localhost:1234
  //EACH TEST NEEDS FRESH STATE
  beforeEach(() => {
    cy.visit("http://localhost:1234");
  });

  //helpers to avoid tons of repetition
  const textInput = () => cy.get('input[name="text"]');
  const authorInput = () => cy.get('input[name="author"]');
  const submitBtn = () => cy.get("button[id=submitBtn]");
  const cancelBtn = () => cy.get("#cancelBtn");

  //use the 'it' keyword for tests
  it("sanity checks", () => {
    //assertion(s)
    expect(5).to.equal(5);
    expect(1 + 2).to.equal(3);
    expect({}).to.eql({});
    expect({}).to.not.equal({});
  });

  it("the proper elements exist", () => {
    //sanity checking that the elements that should exist are there
    textInput().should("exist");
    authorInput().should("exist");
    submitBtn().should("exist");
    cancelBtn().should("exist");
  });
  describe("Filling out inputs and canceling", () => {
    it("submit button is disabled", () => {
      submitBtn().should("be.disabled");
    });
    it("can type inside the inputs", () => {
      textInput()
        .should("have.value", "")
        .type("Be nice to your CSS specialist!")
        .should("have.value", "Be nice to your CSS specialist!");

      authorInput()
        .should("have.value", "")
        .type("Aniia Hamilton")
        .should("have.value", "Aniia Hamilton");
    });
    it("the submit button enables if we type on boths inputs", () => {
      //type on input 1
      //type on input 2
      //assert submit enabled
      textInput().type("foo");
      authorInput().type("bar");
      submitBtn().should("not.be.disabled");
    });
    it("the cansel button can reset inpits and disable button", () => {
      //type
      //type some more
      //hit cancel cancelBtn().click()
      //recheeck submit button
      textInput().type("We are typing");
      authorInput().type("I have typed");
      cancelBtn().click();
      textInput().should("have.value", "");
      authorInput().should("have.value", "");
      submitBtn().should("be.disabled");
    });
  });
  describe("Adding a new quote and deleting it", () => {
    it("can submit and delete", () => {
      //assert that an element with some text isn't
      cy.contains(/have fun/).should("not.exist");
      textInput().type("have fun");
      authorInput().type("Aniia");
      submitBtn().click();
      cy.contains(/have fun/).should("exist");
      cy.contains(/have fun/)
        .next()
        .next()
        .click();
      cy.contains(/have fun/).should("not.exist");
    });
  });
});
