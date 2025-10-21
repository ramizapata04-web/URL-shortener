FROM mcr.microsoft.com/devcontainers/base:ubuntu-24.04

# Install Node.js, npm, and MongoDB
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends curl ca-certificates gnupg \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get -y install --no-install-recommends nodejs \
    && curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg \
    && echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list \
    && apt-get update \
    && apt-get -y install --no-install-recommends mongodb-org \
    && mkdir -p /data/db \
    && chown -R vscode:vscode /data/db \
    && apt-get clean -y && rm -rf /var/lib/apt/lists/*
