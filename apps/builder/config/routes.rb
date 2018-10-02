# Configure your routes here
# See: http://hanamirb.org/guides/routing/overview/
#
# Example:
# get '/hello', to: ->(env) { [200, {}, ['Hello from Hanami!']] }
resources :releases, only: [:create, :update, :index, :show, :destroy]
resources :tags, only: [:create, :index, :destroy]
