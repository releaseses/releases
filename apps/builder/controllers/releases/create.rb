module Builder::Controllers::Releases
  class Create
    include Import[:create_release_operation]
    include Builder::Action
    include Dry::Monads::Result::Mixin

    expose :release, :errors

    def call(params)
      case result = create_release_operation.call(payload: params.get(:release))
      when Success
        @release = result.value!
        self.status = ::Rack::Utils.status_code(:created)
      when Failure
        @errors = result.failure
        self.status = ::Rack::Utils.status_code(:unprocessable_entity)
      end
    end
  end
end
