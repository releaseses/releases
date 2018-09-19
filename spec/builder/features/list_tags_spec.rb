require 'features_helper'

describe 'List tags', type: :feature do
  before do
    TagRepository.new.create({ name: 'tag 3', slug: 'tag-3', color: '#FF0003' })
    TagRepository.new.create({ name: 'tag 2', slug: 'tag-2', color: '#FF0002' })
    TagRepository.new.create({ name: 'tag 1', slug: 'tag-1', color: '#FF0001' })
  end

  after do
    TagRepository.new.clear
  end

  it 'lists all tags by slug' do
    get '/builder/tags'

    parsed_body = JSON.parse(last_response.body)

    expect(parsed_body['tags']).not_to be_empty
    expect(parsed_body['tags'].map { |tag| tag['slug'] }).to eq(%w(tag-1 tag-2 tag-3))
  end
end
