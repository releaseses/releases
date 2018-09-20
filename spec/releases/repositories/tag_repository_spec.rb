RSpec.describe TagRepository, type: :repository do
  let (:repo) { TagRepository.new }

  describe '#released_before' do
    before do
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

    it 'returns tags of published releases' do
      tags = repo.released_before(Time.parse('2018-01-01 01:01:01'))

      expect(tags.map(&:name)).to eq(['Tag 2', 'Tag 3', 'Tag 1', 'Tag 4'])
    end
  end

  describe '#find_by_slug' do
    before do
      Fabricate.create(:tag, name: 'Tag 1', slug: 'tag-1', color: '#FF0000')
      Fabricate.create(:tag, name: 'Tag 4', slug: 'tag-4', color: '#FF0000')
    end

    it 'returns tag' do
      tag = repo.find_by_slug('tag-1')

      expect(tag.name).to eq('Tag 1')
    end
  end

  describe '#all_all_ordered_by_slug' do
    before do
      Fabricate.create(:tag, { name: 'tag 3', slug: 'tag-3', color: '#FF0003' })
      Fabricate.create(:tag, { name: 'tag 1', slug: 'tag-1', color: '#FF0001' })
      Fabricate.create(:tag, { name: 'tag 2', slug: 'tag-2', color: '#FF0002' })
    end

    it 'orders by slug' do
      tags = TagRepository.new.ordered_by_slug

      expect(tags.map(&:slug)).to eq(%w(tag-1 tag-2 tag-3))
    end
  end
end
