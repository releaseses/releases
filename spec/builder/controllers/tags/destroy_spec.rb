RSpec.describe Builder::Controllers::Tags::Destroy, type: :action do
  let(:tag) {  Fabricate(:tag) }
  let(:action) { described_class.new }
  let(:params) { Hash[id: tag.id] }

  it 'is successful' do
    response = action.call(params)
    expect(response[0]).to eq 204
  end
end
