FROM node:20.16.0-bookworm-slim

ENV PATH="/root/.local/bin:${PATH}"
WORKDIR /app/osjs

COPY src ./src
COPY package.json .
COPY package-lock.json .
COPY webpack.config.js .
COPY entrypoint.sh .

RUN apt-get update \
&& apt-get install -y pipx \
util-linux apt-utils net-tools iputils-ping tcpdump telnet git \
nano vim \
&& pipx install ansible-core==2.12.3 \
&& rm -rf /var/lib/apt/lists/*

RUN npm i -g nodemon && \
npm i && \
npm run build && \
npm run package:discover

CMD ./entrypoint.sh