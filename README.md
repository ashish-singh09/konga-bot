# Konga

> A GitHub App built with [Probot](https://github.com/probot/probot). Konga-bot is a GitHub App designed to enhance your code review process, assist in issues created and provide dashboard for repo admin and their users. It listens for various events like, issues created, installation, deletion etc. and enables you to execute and analyze code directly from pull requests. With features like code execution, code explanations, and more, it simplifies the code review workflow and helps developers make informed decisions.

## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Environment setup
```sh
# Define env varaibles

# MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@konga.ycamnml.mongodb.net/konga?retryWrites=true&w=majority
MONGODB_URI=YOUR_MONGODB_CONNECTION_URL

APP_ID=418715
PRIVATE_KEY=YOUR_GITHUB_APP_PRIVATE_KEY
WEBHOOK_SECRET=YOUR_GITHUB_APP_WEBHOOK_SECRET
GITHUB_CLIENT_ID=YOUR_GITHUB_APP_CLIENT_ID
GITHUB_CLIENT_SECRET=YOUR_GITHUB_APP_CLIENT_SECRET

PORT=YOUR_DESIRED_PORT
```

## Connect with me

> Ashish Kumar Singh on [LinkedIN](https://www.linkedin.com/in/ashishsingh130/).

## Contributing

If you have suggestions for how Konga could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2023 Ashish Kumar Singh
