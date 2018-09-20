require 'features_helper'

describe 'List tags', type: :feature do
  before do
    Fabricate.create(:tag, { name: 'tag 3', slug: 'tag-3', color: '#FF0003' })
    Fabricate.create(:tag, { name: 'tag 2', slug: 'tag-2', color: '#FF0002' })
    Fabricate.create(:tag, { name: 'tag 1', slug: 'tag-1', color: '#FF0001' })
  end

  it 'lists all tags by slug' do
    get '/builder/tags'

    parsed_body = JSON.parse(last_response.body)

    expect(parsed_body['tags']).not_to be_empty
    expect(parsed_body['tags'].map { |tag| tag['slug'] }).to eq(%w(tag-1 tag-2 tag-3))
  end
end
