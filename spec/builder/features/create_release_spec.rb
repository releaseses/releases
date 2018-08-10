require 'features_helper'

describe 'Create release', type: :feature do
  after do
    ReleaseRepository.new.clear
  end

  describe 'successful request' do
    before do
      header 'Accept', 'application/json'
      header 'Content-Type', 'application/json'
      post '/builder/releases', JSON.generate({release: { version: '1.0.0', title: 'First release', released_at: '2018-01-01 10:10:10', summary_raw: '# hello', summary_html: '<h1>hello</h1>' }})

      @parsed_body = JSON.parse(last_response.body)
    end

    it 'responds with new release' do
      expect(last_response.status).to eq(201)
      expect(@parsed_body['release']['id']).not_to be_nil
      expect(@parsed_body['release']['version']).to eq('1.0.0')
    end

    it 'stores the release' do
      release = ReleaseRepository.new.find(@parsed_body['release']['id'])
      expect(release.version).to eq('1.0.0')
      expect(release.summary_raw).to eq('# hello')
      expect(release.summary_html).to eq('<h1>hello</h1>')
    end
  end

  describe 'failed request' do
    before do
      header 'Accept', 'application/json'
      header 'Content-Type', 'application/json'
      post '/builder/releases', JSON.generate({release: {}})

      @parsed_body = JSON.parse(last_response.body)
    end

    it 'responds with validation errors' do
      expect(last_response.status).to eq(422)
      expect(@parsed_body['errors']).not_to be_empty
    end
  end
end
