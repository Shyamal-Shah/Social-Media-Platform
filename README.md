# Social-Media-Platform

## Table of Contents

- [Local Development Setup Instructions](#local-development-setup-instructions)
- [Usage](#usage)

## Local Development Setup Instructions:

1. Clone the repository

```bash
git clone https://github.com/Shyamal-Shah/Social-Media-Platform
```

2. Install the necessary Frontend and backend project dependencies

```bash
cd Social-Media-Setup/frontend
npm install
cd Social-Media-Setup/backend
npm install
```

3. Setup MongoDB locally

- Install MongoDB (refer to your OS-specific instructions).
- Start the MongoDB service

```bash
mongod
```

- Test Connection: Use a GUI tool like MongoDB Compass or mongo CLI to verify the connection to the social_media database.

4. Setup Redis Locally

- Install Redis
- Start Redis:

```bash
redis-server
```

- Test Connection

```bash
redis-cli ping
```

5. Create an .env file in the backend folder with all the environment variables for MongoDB, Redis, AWS S3, JWT secret, etc.
