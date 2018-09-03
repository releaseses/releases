require 'bundler/setup'
require 'hanami/setup'
require 'hanami/model'
require_relative 'container'
require_relative '../lib/releases'
require_relative '../apps/admin/application'
require_relative '../apps/viewer/application'
require_relative '../apps/builder/application'
require_relative '../apps/web/application'

Hanami.configure do
  mount Admin::Application, at: '/admin'
  mount Viewer::Application, at: '/viewer'
  mount Builder::Application, at: '/builder'
  mount Web::Application, at: '/'

  model do
    ##
    # Database adapter
    #
    # Available options:
    #
    #  * SQL adapter
    #    adapter :sql, 'sqlite://db/releases_development.sqlite3'
    #    adapter :sql, 'postgresql://localhost/releases_development'
    #    adapter :sql, 'mysql://localhost/releases_development'
    #
    adapter :sql, ENV.fetch('DATABASE_URL')

    ##
    # Migrations
    #
    migrations 'db/migrations'
    schema     'db/schema.sql'
  end

  mailer do
    root 'lib/releases/mailers'

    # See http://hanamirb.org/guides/mailers/delivery
    delivery :test
  end

  environment :development do
    # See: http://hanamirb.org/guides/projects/logging
    logger level: :debug
  end

  environment :production do
    logger level: :info, formatter: :json, filter: []
  end
end
