FROM node:12-buster as build
RUN yarn global add gatsby-cli
WORKDIR /app
ADD . ./
RUN yarn
RUN gatsby telemetry --disable
RUN gatsby build

FROM abiosoft/caddy:1.0.3-no-stats
RUN echo 'tls off' >> /etc/Caddyfile
COPY --from=build /app/public /srv
