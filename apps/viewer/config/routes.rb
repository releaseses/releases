# Configure your routes here
# See: http://hanamirb.org/guides/routing/overview/
#
# Example:
# get '/hello', to: ->(env) { [200, {}, ['Hello from Hanami!']] }
# resources :releases, only: [:index,]
get '/releases', to: 'releases#index'
get '/releases/:version', to: 'releases#show'
