require 'features_helper'

describe 'List tags', type: :feature do
  before do
    Container.stub(:moment, Time.parse('2018-01-01 01:01:01'))

    release1 = Fabricate.create(:release, version: '1.0.0', released_at: Time.parse('2017-01-01 01:01:01'))
    Fabricate.create(:release_tag, release: release1, tag: Fabricate.create(:tag, name: 'Tag 1', slug: 'tag_1', color: '#FF0000'))
    Fabricate.create(:release_tag, release: release1, tag: Fabricate.create(:tag, name: 'Tag 4', slug: 'tag_4', color: '#FF0000'))

    release2 = Fabricate.create(:release, version: '2.0.0', released_at: Time.parse('2018-01-01 01:01:01'))
    Fabricate.create(:release_tag, release: release2, tag: Fabricate.create(:tag, name: 'Tag 2', slug: 'tag_2', color: '#FF0000'))
    Fabricate.create(:release_tag, release: release2, tag: Fabricate.create(:tag, name: 'Tag 3', slug: 'tag_3', color: '#FF0000'))

    release3 = Fabricate.create(:release, version: '3.0.0', released_at: Time.parse('2019-01-01 01:01:01'))
    Fabricate.create(:release_tag, release: release3, tag: Fabricate.create(:tag, name: 'Tag 5', slug: 'tag_5', color: '#FF0000'))
    Fabricate.create(:release_tag, release: release3, tag: Fabricate.create(:tag, name: 'Tag 6', slug: 'tag_6', color: '#FF0000'))
  end

  it 'lists all published tags' do
    get '/viewer/tags'

    parsed_body = JSON.parse(last_response.body)

    expect(parsed_body['tags']).not_to be_empty
    expect(parsed_body['tags'].map { |release| release['name'] }).to eq(['Tag 2', 'Tag 3', 'Tag 1', 'Tag 4'])
  end
end
