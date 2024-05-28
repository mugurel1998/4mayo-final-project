const { faker } = require("@faker-js/faker");
const { spec } = require("pactum");

const baseUrl = "https://practice.expandtesting.com/notes/api";

const username = faker.person.fullName();
const email = faker.internet.email();
const password = "1234567";
let tokenId = "";
let noteId = "";
const noteSchema = require("../schemas/note_schema.json")

describe("Account Usage", () => {
    before('Register user', async () => {

        await spec()
            .post(`${baseUrl}/users/register`)
            .withForm({
                "name": username,
                "email": email,
                "password": password
            })
            .expectStatus(201)

    });

    it("Log In", async () => {
        await spec()
            .post(`${baseUrl}/users/login`)
            .withForm({
                "email": email,
                "password": password
            })
            .expectStatus(200)
            .expectBodyContains("Login successful")
            .returns(ctx => {
                tokenId = ctx.res.body.data.token;
            });
    });

    it("Create Notes", async () => {
        await spec()
            .post(`${baseUrl}/notes`)
            .withForm({
                "title": "Practice WebApp UI",
                "description": "Finish the development of the UI Automation Practice WebApp",
                "category": "Personal"
            })
            .withHeaders("x-auth-token", tokenId)
            .expectStatus(200)
            
    })

    it("Get all the notes", async () =>{
        await spec()
            .get(`${baseUrl}/notes`)
            .withHeaders("x-auth-token", tokenId)
            .expectJsonSchema(noteSchema)
            .expectStatus(200)
            .returns(ctx => {
                noteId = ctx.res.body.data[0].id;
            });
    })

    it("Delete notes by id", async () =>{
        await spec()
            .withHeaders("x-auth-token", tokenId)
            .delete(`${baseUrl}/notes/${noteId}`)
            .expectStatus(200)
            .expectBodyContains("Note successfully deleted")
    })
})