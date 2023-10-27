# autoprtester

> A GitHub App built with [Probot](https://github.com/probot/probot) that This is a bot to auto execute the code of a pull request

## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Docker

```sh
# 1. Build container
docker build -t autoprtester .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> autoprtester
```

## Contributing

If you have suggestions for how autoprtester could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2023 Ashish Kumar Singh
