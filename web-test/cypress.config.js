const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://automationteststore.com",
    defaultCommandTimeout: 20000,
    requestTimeout: 20000,
    pageLoadTimeout: 20000,
    setupNodeEvents(on, config) {
      
    },
  },
});
