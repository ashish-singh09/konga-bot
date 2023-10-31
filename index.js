/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */

const response = require("./lib/api");

module.exports = (app) => {
  // Your code here
  app.log.info("Yay, the app was loaded!");

  app.on("issues.opened", async (context) => {

    app.log.info("issue opened");
    // app.log.info(JSON.stringify(context));
    response(context);

  });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
