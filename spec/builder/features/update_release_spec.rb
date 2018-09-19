require 'features_helper'

describe 'Update release', type: :feature do

  let(:release) { ReleaseRepository.new.create({ version: '1.0.0', title: 'First release' }) }

  describe 'successful request' do
    before do
      header 'Accept', 'application/json'
      header 'Content-Type', 'application/json'
      patch "/builder/releases/#{release.id}", JSON.generate({release: { version: '2.0.0', title: 'Second release', released_at: '2019-01-01 10:10:10' }})

      @parsed_body = JSON.parse(last_response.body)
    end

    it 'updates the release' do
      updated_release = ReleaseRepository.new.find(release.id)
      expect(updated_release.version).to eq('2.0.0')
    end

    it 'responds with updated release' do
      expect(last_response.status).to eq(200)
      expect(@parsed_body['release']['version']).to eq('2.0.0')
      expect(@parsed_body['release']['title']).to eq('Second release')
    end
  end

  describe 'failed request' do
    before do
      header 'Accept', 'application/json'
      header 'Content-Type', 'application/json'
      patch "/builder/releases/#{release.id}", JSON.generate({release: {}})

      @parsed_body = JSON.parse(last_response.body)
    end

    it 'does not touch existing record' do
      updated_release = ReleaseRepository.new.find(release.id)
      expect(release).to eq(updated_release)
    end

    it 'responds with validation errors' do
      expect(last_response.status).to eq(422)
      expect(@parsed_body['errors']).not_to be_empty
    end
  end
end
