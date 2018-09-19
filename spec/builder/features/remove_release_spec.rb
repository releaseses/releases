require 'features_helper'

describe 'Remove release', type: :feature do
  let(:release) { ReleaseRepository.new.create({ version: '1.0.0', title: 'First release' }) }

  describe 'existing release' do
    before do
      header 'Accept', 'application/json'
      header 'Content-Type', 'application/json'
      delete "/builder/releases/#{release.id}"
    end

    it 'deletes the release' do
      expect(ReleaseRepository.new.find(release.id)).to be_nil
    end

    it 'responds with 204' do
      expect(last_response.status).to eq(204)
      expect(last_response.body).to be_empty
    end
  end

  describe 'missing release' do
    before do
      header 'Accept', 'application/json'
      header 'Content-Type', 'application/json'
      delete '/builder/releases/1'
    end

    it 'responds with 404' do
      expect(last_response.status).to eq(204)
    end
  end
end
