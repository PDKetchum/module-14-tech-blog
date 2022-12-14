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

// Helper that checks if the logged in user is the owner of the post. If so add additional options to page
ehbs.handlebars.registerHelper(
  "checkUserPosts",
  function (userPosts, logged_user_id) {
    if (userPosts.user_id === logged_user_id) {
      return `
    <a href="/editpost/${userPosts.id}" class=" d-inline btn btn-primary">Click edit post</a>
    <button id="delete-btn" class=" d-inline btn btn-primary">Click to delete post</a>`;
    }
  }
);

// Helper that checks if the logged in user is the owner of the comment. If so add additional options to page
ehbs.handlebars.registerHelper(
  "checkUserComments",
  function (comment_id, user_id, logged_user_id) {
    if (user_id === logged_user_id) {
      return `
    <a href="/editcomment/${comment_id}" class=" d-inline btn btn-primary">Click to edit or delete comment</a>
    `;
    }
  }
);

const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 86400000, //one day
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
