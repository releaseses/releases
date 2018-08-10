module Builder::Controllers::Releases
  class Create
    include Import[:release_repository]
    include Builder::Action

    params do
      required(:release).schema do
        required(:version).filled
        required(:title).filled
        optional(:summary_raw).filled
        optional(:summary_html).filled
        required(:released_at).filled
      end
    end

    expose :release, :errors

    def call(params)
      @errors = params.errors
      if params.valid?
        @release = release_repository.create(params.get(:release))
        self.status = ::Rack::Utils.status_code(:created)
      else
        self.status = ::Rack::Utils.status_code(:unprocessable_entity)
      end
    end
  end
end
