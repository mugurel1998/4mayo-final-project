//This file contains the registration tests
const { faker } = require("@faker-js/faker");
const { spec } = require("pactum");

const baseUrl = "https://practice.expandtesting.com";

describe("Register User Test Suite", () => {
    
    it("Valid User Registration", async () => {
        const randomName = faker.person.fullName();
        const randomEmail = faker.internet.email();

        await spec()
            .post(`${baseUrl}/notes/api/users/register`)
            .withForm({
                "name": randomName,
                "email": randomEmail,
                "password": "1234567"
            })
            .expectStatus(201)
            .expectBodyContains("User account created successfully")//Check the message to be sure
    });

    it("Invalid Name User Registration", async () => {
        await spec()
            .post(`${baseUrl}/notes/api/users/register`)
            .withForm({
                "name": "Ion",
                "email": "ion@gmail.com",
                "password": "1234567"
            })
            .expectStatus(400)
            .expectBodyContains("User name must be between 4 and 30 characters")//Check the message to be sure
    });
      
    it("Invalid Password User Registration", async () => {
        await spec()
            .post(`${baseUrl}/notes/api/users/register`)
            .withForm({
                "name": "Mugurel",
                "email": "mugurel@gmail.com",
                "password": "123"
            })
            .expectStatus(400)
            .expectBodyContains("Password must be between 6 and 30 characters")//Check the message to be sure
    });
})
