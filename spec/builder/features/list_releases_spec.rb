require 'features_helper'

describe 'List releases', type: :feature do
  before do
    ReleaseRepository.new.create({ version: '1.0.0', title: 'First release',  released_at: Time.now })
    ReleaseRepository.new.create({ version: '2.0.0', title: 'Second release', released_at: Time.now })
    ReleaseRepository.new.create({ version: '3.0.0', title: 'Third release',  released_at: Time.now })
  end

  it 'lists all releases by creation date' do
    get '/builder/releases'

    parsed_body = JSON.parse(last_response.body)

    expect(parsed_body['releases']).not_to be_empty
    expect(parsed_body['releases'].map { |release| release['version'] }).to eq(%w(3.0.0 2.0.0 1.0.0))
  end
end
