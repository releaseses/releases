source 'https://rubygems.org'

ruby '~> 2.5.0'

gem 'rake'
gem 'hanami',       '~> 1.2'
gem 'hanami-model', '~> 1.2'

gem 'pg'

gem 'tilt-jbuilder', github: 'vladfaust/hanami-jbuilder'
gem 'hanami-webpack', github: 'samuelsimoes/hanami-webpack'

group :development do
  # Code reloading
  # See: http://hanamirb.org/guides/projects/code-reloading
  gem 'shotgun', platforms: :ruby
  gem 'hanami-webconsole'
end

group :test, :development do
  gem 'dotenv', '~> 2.0'
  gem 'byebug'
  gem 'simplecov', require: false
end

group :test do
  gem 'rspec'
  gem 'capybara'
  gem 'database_cleaner'
  gem 'hanami-fabrication'
end

group :production do
  gem 'puma'
end

gem 'dry-container'
gem 'dry-auto_inject'
gem 'dry-monads'
gem 'dry-validation'
