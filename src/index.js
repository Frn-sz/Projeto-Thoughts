const Express = require("express");
const Exphbs = require("express-handlebars");
const Session = require("express-session");
const FileStore = require("session-file-store")(Session);
const Flash = require("express-flash");
const path = require("path");
const os = require("os");
const app = Express();
const conn = require("./database/conn");

//Models

const Thought = require("./models/Thought");
const User = require("./models/User");

//Controllers
const ThoughtController = require("./controller/ThoughtController");

//Routers
const thoughtsRoutes = require('./routes/thoughtsRoutes');
const authRoutes = require('./routes/authRoutes')

app.use(Express.static(__dirname + '/public'));

app.engine("handlebars", Exphbs.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

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
app.use((req, res, next) => {

  if (req.session.userId) {
    res.locals.session = req.session;
  }

  next();
})
app.use('/thoughts', thoughtsRoutes);
app.use('/', authRoutes)
app.get('/', ThoughtController.showThoughts);


conn
  .sync({ force: false })
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });
