module Builder::Controllers::Tags
  class Create
    include Import[operation: :create_tag_operation]
    include Builder::Action
    include Dry::Monads::Result::Mixin

    expose :tag, :errors

    def call(params)
      case result = operation.call(payload: params.get(:tag))
      when Success
        @tag = result.value!
        self.status = ::Rack::Utils.status_code(:created)
      when Failure
        @errors = result.failure
        self.status = ::Rack::Utils.status_code(:unprocessable_entity)
      end
    end
  end
end