# Releases [![Build Status](https://travis-ci.org/releaseses/releases.svg?branch=master)](https://travis-ci.org/releaseses/releases) [![Test Coverage](https://api.codeclimate.com/v1/badges/285c881e92e0b5521786/test_coverage)](https://codeclimate.com/github/releaseses/releases/test_coverage) [![Maintainability](https://api.codeclimate.com/v1/badges/285c881e92e0b5521786/maintainability)](https://codeclimate.com/github/releaseses/releases/maintainability)

## Introduction

Releases is a web application that helps to keep track and share information about your product updates. 
Every change can be a part of the bigger story that is left untold.
So why not to start telling your audience how much passion do you put into the project and what experience do you get out of it.

## Installation

The recommended way to run project environment is using the [docker-compose](https://github.com/docker/compose).
Instructions assume that docker-compose and docker are installed and developer has a general knowledge on how to use it.
Here can be found the instructions on how to [install](https://docs.docker.com/compose/install/#install-compose) and [use it](https://docs.docker.com/compose/production/).

### Production

The production environment can be started by running a following command :

```bash
docker-compose up -d # start containers in detached mode
```

### Development

The development environment can be started by running following commands :

```bash
docker-compose -f docker-compose.yml -f docker-compose.development.yml up --build --no-cache -d # build and start containers in detached mode
docker exec releases_web_1 npm install # build assets
```

When containers are running the next commands can be useful : 

```bash
docker exec -it releases_web_1 /bin/bash # connect to the shell of the application container
docker exec -it releases_web_1 bundle exec hanami console # connect to the console of the app
``` 
