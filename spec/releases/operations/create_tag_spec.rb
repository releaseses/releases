RSpec.describe CreateTag, type: :operation do

  describe '#call' do

    describe 'with filled params' do
      it 'creates tag' do
        result = CreateTag.new.call(payload: {
            name: 'hello world',
            color: '#FF0000'
        })

        expect(result).to be_success
        expect(TagRepository.new.all.size).to eq(1)
      end
    end
    
    describe 'with empty params' do
      it 'does not create tag' do
        result = CreateTag.new.call(payload: {})

        expect(result).to be_failure
        expect(TagRepository.new.all.size).to eq(0)
      end
    end
    
    describe 'with duplicated payload' do
      it 'does not create tag' do
        CreateTag.new.call(payload: {
            name: 'hello world',
            color: '#FF0000'
        })
        result = CreateTag.new.call(payload: {
            name: 'hello world',
            color: '#FF0000'
        })

        expect(result).to be_failure
        expect(TagRepository.new.all.size).to eq(1)
      end
    end

  end
end
