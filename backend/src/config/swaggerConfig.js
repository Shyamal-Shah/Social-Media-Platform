const swaggerJsDoc = require("swagger-jsdoc");
const { serve } = require("swagger-ui-express");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Social Media API",
      version: "1.0.0",
      description:
        "A simple social media APIs to fetch posts, add posts, add comments, update comments, delete comments, and delete posts.",
      contact: {
        name: "Shyamal Shah",
        email: "shyamalshah.work@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/v1/*.js"],
};

const specs = swaggerJsDoc(swaggerOptions);

module.exports = specs;
