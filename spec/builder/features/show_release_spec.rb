require 'features_helper'

describe 'Show release', type: :feature do

  describe 'existing release' do
    let(:release) { Fabricate.create(:release, { version: '1.0.0' }) }
    let(:release_with_tags) do
      r = Fabricate.create(:release, { version: '0.0.1' })
      t = Fabricate.create(:tag)
      Fabricate.create(:release_tag, release: r, tag: t)
      r
    end

    it 'renders release without tags' do
      get "/builder/releases/#{release.id}"

      parsed_body = JSON.parse(last_response.body)

      expect(last_response.status).to eq(200)
      expect(parsed_body['version']).to eq('1.0.0')
      expect(parsed_body['tags']).to eq([])
    end

    it 'renders release with tags' do
      get "/builder/releases/#{release_with_tags.id}"
      parsed_body = JSON.parse(last_response.body)

      expect(last_response.status).to eq(200)
      expect(parsed_body['version']).to eq('0.0.1')
      expect(parsed_body['tags'].size).to eq(1)
    end
  end

  describe 'missing release' do
    it 'not found' do
      get '/builder/releases/1'

      expect(last_response.status).to eq(404)
    end
  end
end
