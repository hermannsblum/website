FROM node:18-buster as build
RUN yarn global add gatsby-cli@4
WORKDIR /app
ADD . ./
RUN yarn install
RUN gatsby telemetry --disable
RUN gatsby build

FROM nginx
COPY --from=build /app/public /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
