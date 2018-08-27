FROM node:10.9 AS frontend

ARG CI
ARG NODE_ENV=production
ARG BABEL_ENV=production

WORKDIR /releases/
COPY . / ./

RUN npm --production=false install &&\
    if [ -z "$CI" ] ; then npm run build ; \
    else npm test && npm run build ; fi


FROM ruby:2.5

ARG INSTALL_PL_SQL
ARG HANAMI_ENV=production
ENV WEBPACK_PUBLIC_PATH=/javascripts/

WORKDIR /usr/src/app
COPY . / ./
COPY --from=frontend /releases/public/javascripts/ ./public/javascripts/

RUN bundle install
#   check if prod container skips it
RUN if [ -z "$INSTALL_PL_SQL" ] ; then echo 'Skip plsql installation' ; \
    else apt-get -y update && apt-get install -y postgresql-client ; fi

ENTRYPOINT bundle exec hanami server