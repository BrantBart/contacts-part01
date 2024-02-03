const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Users API",
    description: "Users Api",
  },
  host: "localhost:3000",
  schemes: ["https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

//swagger.json file
swaggerAutogen(outputFile, endpointsFiles, doc);
