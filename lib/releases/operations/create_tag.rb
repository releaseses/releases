class CreateTag < Releases::Operation
  include Import[tags: :tag_repository]
  include Dry::Monads::Do.for(:call)

  PAYLOAD_VALIDATION = Dry::Validation.Schema do
    required(:name).filled
    required(:color).filled
  end

  def call(payload:)
    input = yield PAYLOAD_VALIDATION.call(payload).to_either
    params = yield preprocess(input)
    tag = yield create_tag(params)
    Success(tag)
  end

  private
  def preprocess(input)
    params = input.tap do |p|
      p[:slug] = Hanami::Utils::String.dasherize(p[:name])
    end
    Success(params)
  end

  def create_tag(params)
    begin
      Success(tags.create(params))
    rescue Hanami::Model::UniqueConstraintViolationError
      Failure({ name: 'Tag with this name already exists' })
    end
  end
end
