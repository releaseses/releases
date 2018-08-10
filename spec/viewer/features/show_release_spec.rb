require 'features_helper'

describe 'Show release', type: :feature do
  after do
    ReleaseRepository.new.clear
  end

  describe 'existing' do
    let(:now) { Time.parse('2020-01-01 01:01:01') }
    let(:release) { ReleaseRepository.new.create({ version: '1.0.0', title: 'First release',  released_at: now, summary_raw: '# Hello world!' }) }

    before do
      Container.stub(:moment, now)
    end

    it 'renders' do
      get "/viewer/releases/#{release.version}"

      parsed_body = JSON.parse(last_response.body)

      expect(last_response.status).to eq(200)
      expect(parsed_body['version']).to eq('1.0.0')
    end
  end

  describe 'missing' do
    it 'not found' do
      get '/viewer/releases/1.0.1'

      expect(last_response.status).to eq(404)
    end
  end
end
