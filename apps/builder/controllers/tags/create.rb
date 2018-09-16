module Builder::Controllers::Tags
  class Create
    include Import[:tag_repository]
    include Builder::Action

    params do
      required(:tag).schema do
        required(:name).filled
        required(:color).filled
      end
    end

    expose :tag, :errors

    def call(params)
      @errors = params.errors
      if params.valid?
        @tag = tag_repository.create(tag_params_with_slug)
        self.status = ::Rack::Utils.status_code(:created)
      else
        self.status = ::Rack::Utils.status_code(:unprocessable_entity)
      end
    end

    private

    def tag_params_with_slug
      params.get(:tag).tap do |p|
        p[:slug] = Hanami::Utils::String.dasherize(params.get(:tag).fetch(:name))
      end
    end
  end
end