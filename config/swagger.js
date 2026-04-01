const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Finance API",
      version: "1.0.0",
      description: "API for Finance Management System with AI Insights",
    },
    servers: [
      {
        url: "https://finance-backend-uazm.onrender.com",
      },
    ],
  },
  apis: ["./routes/*.js"], // where your routes are
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;