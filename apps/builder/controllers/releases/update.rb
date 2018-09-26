module Builder::Controllers::Releases
  class Update
    include Import[:update_release_operation]
    include Builder::Action
    include Dry::Monads::Result::Mixin

    expose :release, :errors

    def call(params)
      case result = update_release_operation.call(id: params.get(:id), payload: params.get(:release))
      when Success
        @release = result.value!
        self.status = ::Rack::Utils.status_code(:ok)
      when Failure
        @errors = result.failure
        self.status = ::Rack::Utils.status_code(:unprocessable_entity)
      end
    end
  end
end
