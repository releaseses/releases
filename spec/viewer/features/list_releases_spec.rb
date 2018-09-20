require 'features_helper'

describe 'List releases', type: :feature do
  before do
    Container.stub(:moment, now = Time.parse('2000-01-01 00:00:00'))
    Fabricate.create(:release, { version: '1.0.0', title: 'First release',  released_at: now - 3600 })
    Fabricate.create(:release, { version: '2.0.0', title: 'Second release', released_at: now })
    Fabricate.create(:release, { version: '3.0.0', title: 'Third release',  released_at: now + 3600 })
  end

  it 'lists all releases by release date' do
    get '/viewer/releases'

    parsed_body = JSON.parse(last_response.body)

    expect(parsed_body['releases']).not_to be_empty
    expect(parsed_body['releases'].map { |release| release['version'] }).to eq(%w(2.0.0 1.0.0))
  end
end
