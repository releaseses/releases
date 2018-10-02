require 'features_helper'

describe 'Destroy tag', type: :feature do

  describe 'successful request' do
    before do
      header 'Accept', 'application/json'
      header 'Content-Type', 'application/json'

      tag = Fabricate(:tag)

      delete "/builder/tags/#{tag.id}"
    end

    it 'returns 204 status' do
      expect(last_response.status).to eq(204)
    end

    it 'deletes tag' do
      expect(TagRepository.new.all).to be_empty
    end
  end

  describe 'failed request' do
    before do
      header 'Accept', 'application/json'
      header 'Content-Type', 'application/json'

      delete "/builder/tags/1312"

      @parsed_body = JSON.parse(last_response.body)
    end

    it 'responds with validation errors' do
      expect(last_response.status).to eq(422)
      expect(@parsed_body['errors']).not_to be_empty
    end
  end
end
