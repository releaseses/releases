require 'features_helper'

describe 'Serves js application', type: :feature do
  it 'responds with js script' do
    get '/admin/'

    expect(last_response.body).to match /admin-xxx.js/
    expect(last_response.body).to include 'id="root"'
  end
end
