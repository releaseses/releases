class DestroyTag < Releases::Operation
  include Import[tags: :tag_repository]
  include Dry::Monads::Do.for(:call)

  PAYLOAD_VALIDATION = Dry::Validation.Schema do
    required(:id).filled
  end

  def call(payload:)
    input = yield PAYLOAD_VALIDATION.call(payload).to_either
    tag = yield destroy_tag(input)
    Success(tag)
  end

  private
  def destroy_tag(params)
    tag_id = params[:id]

    result = tags.delete(tag_id)

    if result
      Success(result)
    else
      Failure({ id: "Couldn't find Tag with 'id'=#{tag_id}"})
    end
  end
end
