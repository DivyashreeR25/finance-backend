const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Finance API",
      version: "1.0.0",
      description: "API for Finance Management System with AI Insights",
    },
    tags: [
      { name: "Users" },
      { name: "Auth" },
      { name: "Records" },
      { name: "Budget" },
      { name: "Dashboard" },
      { name: "AI" }
    ],
    servers: [
      {
        url: "https://finance-backend-uazm.onrender.com",
      },
    ],
  },
  apis: ["./routes/*.js"],
};