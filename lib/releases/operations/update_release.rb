class UpdateRelease < Releases::Operation
  include Import[:tag_repository, :release_repository]
  include Dry::Monads::Do.for(:call)

  PAYLOAD_VALIDATION = Dry::Validation.Schema do
    required(:version).filled
    required(:title).filled
    optional(:summary_raw).filled
    optional(:summary_html).filled
    required(:released_at).filled
    required(:tags).each do
      schema do
        required(:name).filled(:str?)
        required(:slug).filled(:str?)
        required(:color).filled(:str?)
      end
    end
  end

  def call(id:, payload:)
    input = yield PAYLOAD_VALIDATION.call(payload).to_either
    tags = yield tags(input.fetch(:tags))
    release = yield Success(release_repository.update_with_tags(id, input, tags))
    Success(release)
  end

  private
  def tags(tags_params)
    tags = tags_params.map do |tag_params|
      tag_repository.find_by_slug(tag_params[:slug])
    end
    Success(tags.compact)
  end
end
