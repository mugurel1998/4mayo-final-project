import { base, faker } from '@faker-js/faker';

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const userName = faker.internet.userName();
const email = faker.internet.email();

const password = "123456";

describe("Register User Test Suite", () => {

    beforeEach(() => {
        cy.visit("/"); // Enter on the site before each test
    })

    it("Register User", () => {
        cy.get("#customer_menu_top a").click(); // Press Login button
        cy.get("#accountFrm > fieldset > button").click(); //Press Continue
        cy.get("#AccountFrm_firstname").type(firstName);
        cy.get("#AccountFrm_lastname").type(lastName);
        cy.get("#AccountFrm_email").type(email);
        cy.get("#AccountFrm_address_1").type("Soseaua 13");
        cy.get("#AccountFrm_city").type("Iasi"); //oras
        cy.get("#AccountFrm_country_id").select("Romania"); //tara
        cy.get("#AccountFrm_zone_id").select("Iasi"); //judet
        cy.get("#AccountFrm_postcode").type("123456");
        cy.get("#AccountFrm_loginname").type(userName);
        cy.get("#AccountFrm_password").type(password);
        cy.get("#AccountFrm_confirm").type(password);
        cy.get("#AccountFrm_newsletter1").click();
        cy.get("#AccountFrm_agree").click();
        cy.get("#AccountFrm > div.form-group > div > div > button").click();
        cy.contains("YOUR ACCOUNT HAS BEEN CREATED!", { matchCase: false }).should("be.visible");
    })

    it("Change the username", () => {
        cy.get("#customer_menu_top a").click();
        cy.get("#loginFrm_loginname").type(userName);
        cy.get("#loginFrm_password").type(password);
        cy.get("#loginFrm > fieldset > button").click();
        cy.get("ul.nav-dash > li:nth-child(1) > a").click();
        cy.get("#AccountFrm_firstname").clear().type(userName);
        cy.get("#AccountFrm > div.form-group > div > button > i").click();
        cy.contains("Success: Your account has been successfully updated.", { matchCase: false }).should("be.visible");
    })

    it("Log in & Log Out", () => {
        cy.get("#customer_menu_top a").click();
        cy.get("#loginFrm_loginname").type(userName);
        cy.get("#loginFrm_password").type(password);
        cy.get("#loginFrm > fieldset > button").click();
        cy.get("ul.nav-dash > li:nth-child(9) > a").click();//logoff
        cy.contains("You have been logged off your account. It is now safe to leave the computer.", { matchCase: false }).should("be.visible");
    })

    it("Place Order", () => {
        cy.get("#customer_menu_top a").click();
        cy.get("#loginFrm_loginname").type(userName);
        cy.get("#loginFrm_password").type(password);
        cy.get("#loginFrm > fieldset > button").click();
        cy.get("#categorymenu > nav > ul > li:nth-child(1) > a").click();
        cy.get("[title=\"Add to Cart\"]").first().click();
        cy.get("ul.nav.topcart.pull-left a.dropdown-toggle").click();
        cy.get("#cart_checkout1").click();
        cy.get("#checkout_btn").click();
        cy.contains("YOUR ORDER HAS BEEN PROCESSED!", { matchCase: false }).should("be.visible");
    })
})