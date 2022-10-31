const path = require("path");
const express = require("express");
const session = require("express-session");
const routes = require("./controllers");
const exphbs = require("express-handlebars");
const helpers = require("./utils/helpers");
const hbs = exphbs.create({ helpers });
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

var ehbs = exphbs.create({});

ehbs.handlebars.registerHelper("checkUserPosts", function (userPosts, user_id) {
  if (userPosts.user_id === user_id) {
    return `
    <a href="/editpost/${userPosts.id}" class=" d-inline btn btn-primary">Click edit post</a>
    <button id="delete-btn" class=" d-inline btn btn-primary">Click to delete post</a>`;
  }
});

ehbs.handlebars.registerHelper(
  "checkUserComments",
  function (userPosts, user_id) {
    if (userPosts.user_id === user_id) {
      return `
    <a href="/editpost/${userPosts.id}" class=" d-inline btn btn-primary">Click edit comment</a>
    <button id="delete-btn" class=" d-inline btn btn-primary">Click to delete post</a>`;
    }
  }
);

const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 86400000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log("Now listening on http://localhost:3001/")
  );
});
