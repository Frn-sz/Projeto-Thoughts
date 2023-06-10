const Express = require("express");
const Exphbs = require("express-handlebars");
const Session = require("express-session");
const FileStore = require("session-file-store")(Session);
const Flash = require("express-flash");

const app = Express();

const conn = require("./Database/conn");

conn
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });
