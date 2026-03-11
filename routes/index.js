
const PositionRoute = require("./positionsRoute");
const TeamRoute = require("./teamsRoute");  
const ProjectRoute = require("./projectsRoute");
const MessageRoute = require("./messgesRoute");
const AuthRoute = require("./authRoute");
// ================================================================
const mainRoute = (app) => {
  app.use("/api/v1/positions", PositionRoute);
  app.use("/api/v1/teams", TeamRoute);
  app.use("/api/v1/projects", ProjectRoute);
  app.use("/api/v1/messages", MessageRoute);
  app.use("/api/v1/auth", AuthRoute);

};

module.exports = mainRoute;
