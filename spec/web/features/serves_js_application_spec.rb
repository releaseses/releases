require 'features_helper'

describe 'Serves js application', type: :feature do
  it 'responds with js script' do
    get '/'

    expect(last_response.body).to match /web-xxx.js/
    expect(last_response.body).to include 'id="root"'
  end
end
