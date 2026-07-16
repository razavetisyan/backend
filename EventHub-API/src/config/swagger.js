const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "EventHub API",
            version: "1.0.0",
            description: "API documentation for EventHub backend",
        },

        servers: [
            {
                url: "http://localhost:3001/api",
            },
        ],

        components: {
            securitySchemes: {
                cookieAuth: {
                    type: "apiKey",
                    in: "cookie",
                    name: "accessToken",
                },
            },
        },
    },

    apis: ["./src/docs/*.swagger.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;