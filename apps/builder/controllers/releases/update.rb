module Builder::Controllers::Releases
  class Update
    include Import[:release_repository]
    include Builder::Action

    params do
      required(:release).schema do
        required(:version).filled
        required(:title).filled
        required(:released_at).filled
        optional(:summary_raw).filled
        optional(:summary_html).filled
      end
    end

    expose :release, :errors

    def call(params)
      @errors = params.errors
      if params.valid?
        @release = release_repository.update(params.get(:id), params.get(:release))
        self.status = ::Rack::Utils.status_code(:ok)
      else
        self.status = ::Rack::Utils.status_code(:unprocessable_entity)
      end
    end
  end
end
