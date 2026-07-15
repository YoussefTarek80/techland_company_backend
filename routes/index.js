
const PositionRoute = require("./positionsRoute");
const TeamRoute = require("./teamsRoute");  
const ProjectRoute = require("./projectsRoute");
const MessageRoute = require("./messgesRoute");
const AuthRoute = require("./authRoute");
const FeedbackRoute = require("./feedbacksRoute");
const AnalysisRoute = require("./analysisRoute");
const jobsRoute = require("./jobsRoute");
const jobApplicationsRoute = require("./jobApplicationsRoute");
// ================================================================
const mainRoute = (app) => {
  app.use("/api/v1/positions", PositionRoute);
  app.use("/api/v1/teams", TeamRoute);
  app.use("/api/v1/projects", ProjectRoute);
  app.use("/api/v1/messages", MessageRoute);
  app.use("/api/v1/auth", AuthRoute);
  app.use("/api/v1/feedbacks", FeedbackRoute);
  app.use("/api/v1/analysis", AnalysisRoute);
  app.use("/api/v1/jobs", jobsRoute);
  app.use("/api/v1/jobApplications", jobApplicationsRoute);

};

module.exports = mainRoute;
