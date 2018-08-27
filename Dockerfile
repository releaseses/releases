FROM node:10.9 AS frontend

ARG NODE_ENV=production
ARG BABEL_ENV=production

COPY . / ./

RUN npm --production=false install && npm run build


FROM ruby:2.5

ARG INSTALL_PL_SQL=false
ARG HANAMI_ENV=production
ENV WEBPACK_PUBLIC_PATH=/javascripts/

WORKDIR /usr/src/app
COPY . / ./
COPY --from=frontend /public/javascripts/ ./public/javascripts/

RUN bundle install
RUN if [ "x$INSTALL_PL_SQL" = "x" ] ; then echo 'Skip plsql installation' ; else apt-get -y update && apt-get install -y postgresql-client ; fi

ENTRYPOINT bundle exec hanami server