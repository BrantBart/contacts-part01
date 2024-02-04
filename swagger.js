const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Users and Food API",
    description: "Users and Food Api",
  },
  host: "localhost:3000",
  schemes: ["http", "https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

//swagger.json file
swaggerAutogen(outputFile, endpointsFiles, doc);
