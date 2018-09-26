RSpec.describe CreateRelease, type: :operation do

  describe '#call' do

    describe 'with valid payload' do
      before do
        tag = Fabricate.create(:tag, { name: 'Tag 1', slug: 'tag-1', color: '#FF0000' })
        @result = CreateRelease.new.call(payload: {version: '1.0.0',
                                                   title: 'First release',
                                                   released_at: '2018-01-01 10:10:10',
                                                   summary_raw: '# hello',
                                                   summary_html: '<h1>hello</h1>',
                                                   tags: [
                                                       tag.to_hash.slice(:name, :slug, :color)
                                                   ]})
      end

      it 'creates release' do
        expect(@result).to be_success
        expect(ReleaseRepository.new.all.size).to eq(1)
      end

      it 'attaches tags' do
        expect(@result).to be_success
        expect(ReleaseTagRepository.new.all.size).to eq(1)
      end
    end

    describe 'with invalid payload' do
      it 'returns validation errors' do
        result = CreateRelease.new.call(payload: {})

        expect(result).to be_failure
        expect(ReleaseRepository.new.all.size).to eq(0)
      end
    end
  end

end
