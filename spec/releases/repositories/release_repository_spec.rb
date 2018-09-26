RSpec.describe ReleaseRepository, type: :repository do
  let (:repo) { ReleaseRepository.new }

  describe '#find_by_version' do
    let(:yesterday) { Time.parse('1999-12-31 00:00:00') }
    let(:today) { Time.parse('2000-01-01 00:00:00') }

    before do
      repo.create(version: '1.0.0', released_at: today)
    end

    it 'returns found release' do
      release = repo.find_released_with_version(today, '1.0.0')

      expect(release.id).not_to be_nil
    end

    it 'returns nil when release not found' do
      release = repo.find_released_with_version(today, '1.0.1')

      expect(release).to be_nil
    end

    it 'returns nil when release date is in future' do
      release = repo.find_released_with_version(yesterday,'1.0.1')

      expect(release).to be_nil
    end
  end

  describe '#ordered_by_release' do
    before do
      repo.create(version: '2.0.0', released_at: Time.now - 2)
      repo.create(version: '1.0.0', released_at: Time.now - 3)
      repo.create(version: '3.0.0', released_at: Time.now - 1)
    end

    it 'returns ordered releases' do
      releases = repo.ordered_by_release

      expect(releases.map(&:version)).to eq(%w(3.0.0 2.0.0 1.0.0))
    end
  end

  describe '#ordered_by_creation_date' do
    before do
      repo.create(version: '2.0.0', released_at: Time.now - 2)
      repo.create(version: '1.0.0', released_at: Time.now - 3)
      repo.create(version: '3.0.0', released_at: Time.now - 1)
    end

    it 'returns ordered releases' do
      releases = repo.ordered_by_creation_date

      expect(releases.map(&:version)).to eq(%w(3.0.0 1.0.0 2.0.0))
    end
  end

  describe '#released_before' do
    before do
      repo.create(version: '1.0.0', released_at: Time.parse('2017-01-01 01:01:01'))
      repo.create(version: '2.0.0', released_at: Time.parse('2018-01-01 01:01:01'))
      repo.create(version: '3.0.0', released_at: Time.parse('2019-01-01 01:01:01'))
    end

    it 'returns ordered releases' do
      releases = repo.released_before(Time.parse('2018-01-01 01:01:01'))

      expect(releases.map(&:version)).to eq(%w(2.0.0 1.0.0))
    end
  end

  describe '#create_with_tags' do
    let(:tags) do
      Fabricate.times(2, :tag) do
        slug { sequence(:slug) { |i| "slug-#{i}" } }
        name { sequence(:name) { |i| "name #{i}" } }
      end
    end

    it 'returns releases with tags' do
      release = repo.create_with_tags(Fabricate.attributes_for(:release), tags)

      expect(release.id).not_to be_nil
      expect(release.tags.size).to eq(2)
    end
  end

  describe '#udpate_with_tags' do
    let(:tags) do
      Fabricate.times(2, :tag) do
        slug { sequence(:slug) { |i| "slug-#{i}" } }
        name { sequence(:name) { |i| "name #{i}" } }
      end
    end
    let(:release) do
      release = Fabricate.create(:release)
      Fabricate.create(:release_tag, release_id: release.id, tag_id: tags.first.id)
      Fabricate.create(:release_tag, release_id: release.id, tag_id: tags.last.id)
      release
    end

    it 'returns releases with tags' do
      r = repo.update_with_tags(release.id, Fabricate.attributes_for(:release), [tags.first])

      expect(r.id).not_to be_nil
      expect(r.tags.size).to eq(1)
    end
  end
end
