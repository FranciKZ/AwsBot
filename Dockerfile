FROM --platform=arm64 node:15.9.0-alpine3.10

WORKDIR /app
COPY . /

RUN npm install
RUN npm run-script build

CMD ["npm", "run-script", "prod"]