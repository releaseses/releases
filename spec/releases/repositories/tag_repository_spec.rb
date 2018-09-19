RSpec.describe TagRepository, type: :repository do
  let (:repo) { TagRepository.new }

  before do
    ReleaseRepository.new.clear
    TagRepository.new.clear
    ReleaseTagRepository.new.clear
  end

  after do
    ReleaseRepository.new.clear
    TagRepository.new.clear
    ReleaseTagRepository.new.clear
  end

  describe '#released_before' do
    before do
      release1 = ReleaseRepository.new.create(version: '1.0.0', released_at: Time.parse('2017-01-01 01:01:01'))
      tag1 = TagRepository.new.create(name: 'Tag 1', slug: 'tag_1', color: '#FF0000')
      tag4 = TagRepository.new.create(name: 'Tag 4', slug: 'tag_4', color: '#FF0000')
      ReleaseTagRepository.new.create(release_id: release1.id, tag_id: tag1.id)
      ReleaseTagRepository.new.create(release_id: release1.id, tag_id: tag4.id)

      release2 = ReleaseRepository.new.create(version: '2.0.0', released_at: Time.parse('2018-01-01 01:01:01'))
      tag2 = TagRepository.new.create(name: 'Tag 2', slug: 'tag_2', color: '#FF0000')
      tag3 = TagRepository.new.create(name: 'Tag 3', slug: 'tag_3', color: '#FF0000')
      ReleaseTagRepository.new.create(release_id: release2.id, tag_id: tag2.id)
      ReleaseTagRepository.new.create(release_id: release2.id, tag_id: tag3.id)

      release3 = ReleaseRepository.new.create(version: '3.0.0', released_at: Time.parse('2019-01-01 01:01:01'))
      tag5 = TagRepository.new.create(name: 'Tag 5', slug: 'tag_5', color: '#FF0000')
      tag6 = TagRepository.new.create(name: 'Tag 6', slug: 'tag_6', color: '#FF0000')
      ReleaseTagRepository.new.create(release_id: release3.id, tag_id: tag5.id)
      ReleaseTagRepository.new.create(release_id: release3.id, tag_id: tag6.id)
    end

    it 'returns tags of published releases' do
      tags = repo.released_before(Time.parse('2018-01-01 01:01:01'))

      expect(tags.map(&:name)).to eq(['Tag 2', 'Tag 3', 'Tag 1', 'Tag 4'])
    end
  end

  describe '#find_by_slug' do
    before do
      TagRepository.new.create(name: 'Tag 1', slug: 'tag-1', color: '#FF0000')
      TagRepository.new.create(name: 'Tag 4', slug: 'tag-4', color: '#FF0000')
    end

    it 'returns tag' do
      tag = repo.find_by_slug('tag-1')

      expect(tag.name).to eq('Tag 1')
    end
  end

  describe '#all_all_ordered_by_slug' do
    before do
      TagRepository.new.create({ name: 'tag 3', slug: 'tag-3', color: '#FF0003' })
      TagRepository.new.create({ name: 'tag 1', slug: 'tag-1', color: '#FF0001' })
      TagRepository.new.create({ name: 'tag 2', slug: 'tag-2', color: '#FF0002' })
    end

    it 'orders by slug' do
      tags = TagRepository.new.ordered_by_slug

      expect(tags.map(&:slug)).to eq(%w(tag-1 tag-2 tag-3))
    end
  end
end
