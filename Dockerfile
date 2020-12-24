FROM node:12-buster as build
RUN yarn global add gatsby-cli
WORKDIR /app
ADD . ./
RUN yarn
RUN gatsby telemetry --disable
RUN gatsby build

FROM nginx
COPY --from=build /app/public /usr/share/nginx/html
