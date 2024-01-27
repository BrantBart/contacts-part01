const express = require("express");
const mongodb = require("./data/database");
const contactsController = require("./controllers/contacts");

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.use("/", require("./routes"));

app.post("/contacts", contactsController.saveContact);
app.get("/contacts", contactsController.getAll);
app.get("/contacts/:id", contactsController.getSingle);
app.delete("/contacts/:id", contactsController.deleteContact);

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Running on port ${port} with database`);
    });
  }
});
