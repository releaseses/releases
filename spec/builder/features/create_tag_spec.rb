require 'features_helper'

describe 'Create tag', type: :feature do
  after do
    TagRepository.new.clear
  end

  describe 'successful request' do
    before do
      header 'Accept', 'application/json'
      header 'Content-Type', 'application/json'
      post '/builder/tags', JSON.generate({ tag: { name: 'Tag 1', color: '#FF0000' }})

      @parsed_body = JSON.parse(last_response.body)
    end

    it 'responds with new tag' do
      expect(last_response.status).to eq(201)
      expect(@parsed_body['tag']['name']).to eq('Tag 1')
      expect(@parsed_body['tag']['color']).to eq('#FF0000')
    end

    it 'stores the tag' do
      tag = TagRepository.new.last
      expect(tag.name).to eq('Tag 1')
      expect(tag.slug).to eq('tag-1')
      expect(tag.color).to eq('#FF0000')
    end
  end

  describe 'failed request' do
    before do
      header 'Accept', 'application/json'
      header 'Content-Type', 'application/json'
      post '/builder/tags', JSON.generate({tag: {}})

      @parsed_body = JSON.parse(last_response.body)
    end

    it 'responds with validation errors' do
      expect(last_response.status).to eq(422)
      expect(@parsed_body['errors']).not_to be_empty
    end
  end
end
