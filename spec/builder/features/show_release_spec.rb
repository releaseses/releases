require 'features_helper'

describe 'Show release', type: :feature do
  after do
    ReleaseRepository.new.clear
  end

  describe 'existing release' do
    let(:release) { ReleaseRepository.new.create({ version: '1.0.0', title: 'First release',  released_at: Time.parse('2020-01-01 01:01:01'), summary_raw: '# Hello world!' }) }

    it 'renders' do
      get "/builder/releases/#{release.id}"

      parsed_body = JSON.parse(last_response.body)

      expect(last_response.status).to eq(200)
      expect(parsed_body['version']).to eq('1.0.0')
    end
  end

  describe 'missing release' do
    it 'not found' do
      get '/builder/releases/1'

      expect(last_response.status).to eq(404)
    end
  end
end
