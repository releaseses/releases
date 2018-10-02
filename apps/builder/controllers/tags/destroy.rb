module Builder::Controllers::Tags
  class Destroy
    include Import[:tag_repository]
    include Builder::Action
    include Dry::Monads::Result::Mixin

    expose :tag, :errors

    def call(params)
      case result = DestroyTag.new.call(payload: {id: params.get(:id) })
      when Success
        self.status = ::Rack::Utils.status_code(:no_content)
      when Failure
        @errors = result.failure
        self.status = ::Rack::Utils.status_code(:unprocessable_entity)
      end
    end
  end
end
