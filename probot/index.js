/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */

const response = require("../lib/api");

module.exports = (app) => {
  app.log.info("Yay, the app was loaded!");

  app.on(["issues.opened", "issues.edited"], async (context) => {

    app.log.info("issue opened");
    response(context);
  });

  app.on(["installation.created", "installation.deleted", "installation.suspend", "installation.unsuspend"], async (context) => {

    // Subscribe to repository events for all repositories in this installation
    // const repositories = context.payload.repositories;
    console.log(context.payload);
  });
};
