
const PositionRoute = require("./positionsRoute");
const TeamRoute = require("./teamsRoute");  
const ProjectRoute = require("./projectsRoute");
// ================================================================
const mainRoute = (app) => {
  app.use("/api/v1/positions", PositionRoute);
  app.use("/api/v1/teams", TeamRoute);
  app.use("/api/v1/projects", ProjectRoute);

};

module.exports = mainRoute;
