# Releases [![Build Status](https://travis-ci.org/releaseses/releases.svg?branch=master)](https://travis-ci.org/releaseses/releases) [![Test Coverage](https://api.codeclimate.com/v1/badges/285c881e92e0b5521786/test_coverage)](https://codeclimate.com/github/releaseses/releases/test_coverage) [![Maintainability](https://api.codeclimate.com/v1/badges/285c881e92e0b5521786/maintainability)](https://codeclimate.com/github/releaseses/releases/maintainability)

## Introduction

Releases is a web application that helps to keep track and share information about your product updates. 
Every change can be a part of the bigger story that is left untold.
So why not to start telling your audience how much passion do you put into the project and what experience do you get out of it.

## Installation

### Production

The recommended way to run project in the production mode is using the [docker-compose](https://github.com/docker/compose).
You can start the production environment by running a following command :

```bash
docker-compose up -d
```

### Development

The recommended way to run project in the development mode is using the [docker-compose](https://github.com/docker/compose).
You can start the development environment by running a following commands :

```bash
docker-compose -f docker-compose.yml -f docker-compose.development.yml up --build --no-cache -d
docker exec releases_web_1 npm install
```
