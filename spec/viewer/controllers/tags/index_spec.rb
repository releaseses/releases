RSpec.describe Viewer::Controllers::Tags::Index, type: :action do
  let(:action) { described_class.new }
  let(:params) { Hash[] }

  it 'is successful' do
    skip 'have feature test'
    response = action.call(params)
    expect(response[0]).to eq 200
  end
end
