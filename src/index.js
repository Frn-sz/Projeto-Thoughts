const Express = require("express");
const Exphbs = require("express-handlebars");
const Session = require("express-session");
const FileStore = require("session-file-store")(Session);
const Flash = require("express-flash");
const path = require("path");
const os = require("os");
const app = Express();

const conn = require("./Database/conn");

//Models

const Tought = require("./Models/Tought");
const User = require("./Models/User")

app.engine("handlebars", Exphbs.engine());
app.set("View engine", "handlebars");

app.use(Express.urlencoded({ extended: true }));

app.use(Express.json());

app.use(
  Session({
    name: "Session",
    secret: "nosso_secret",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () { },
      path: path.join(os.tmpdir(), "Sessions"),
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now() + 360000),
      httpOnly: true
    },
  })
);

app.use(Flash());

app.use(Express.static('Public'));

app.use((req, res, next) => {

  if (req.session.userId) {
    res.locals.session = req.session;
  }

  next();
})
conn
  .sync({ force: true })
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });
